import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const submissionId = url.searchParams.get('id');

    if (!submissionId) {
      throw new Error("Submission ID is required");
    }

    console.log("Confirming payment for submission:", submissionId);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch submission details
    const { data: submission, error: fetchError } = await supabase
      .from('payment_submissions')
      .select('*')
      .eq('id', submissionId)
      .single();

    if (fetchError || !submission) {
      console.error("Error fetching submission:", fetchError);
      throw new Error("Submission not found");
    }

    // Update status to confirmed
    const { error: updateError } = await supabase
      .from('payment_submissions')
      .update({ status: 'confirmed' })
      .eq('id', submissionId);

    if (updateError) {
      console.error("Error updating submission:", updateError);
      throw new Error("Failed to update submission status");
    }

    // Send confirmation email to user
    const confirmationEmail = await resend.emails.send({
      from: "Team Harper <onboarding@resend.dev>",
      to: [submission.email],
      subject: "Payment Confirmed ✓",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">✓ Payment Confirmed!</h2>
          </div>
          
          <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
            <p>Hi ${submission.full_name},</p>
            
            <p>Great news! Your payment for <strong>${submission.package_type || 'your package'}</strong> (${submission.amount}) has been confirmed.</p>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981;">
              <p style="margin: 0;"><strong>What's next?</strong></p>
              <p style="margin: 10px 0 0 0;">We're starting your setup now. Your personal manager will reach out on WhatsApp at <strong>${submission.whatsapp || 'the number you provided'}</strong> shortly.</p>
            </div>
            
            <p>Thank you for choosing Team Harper!</p>
            
            <p style="margin-top: 30px;">Best regards,<br>Team Harper</p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmail);

    // Return success HTML page
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Confirmed</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              text-align: center;
              max-width: 500px;
            }
            .checkmark {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              background: #10b981;
              color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 48px;
              margin: 0 auto 20px;
            }
            h1 {
              color: #1a1a1a;
              margin-bottom: 10px;
            }
            p {
              color: #666;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="checkmark">✓</div>
            <h1>Payment Confirmed!</h1>
            <p>The payment has been confirmed and the customer has been notified via email.</p>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">
              You can close this window now.
            </p>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in confirm-payment function:", error);
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
            }
            h1 {
              color: #ef4444;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Error</h1>
            <p>${error.message}</p>
          </div>
        </body>
      </html>
      `,
      {
        status: 500,
        headers: {
          "Content-Type": "text/html",
          ...corsHeaders,
        },
      }
    );
  }
};

serve(handler);
