import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentSubmission {
  id: string;
  full_name: string;
  email: string;
  whatsapp?: string;
  amount: string;
  package_type?: string;
  receipt_url?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { submissionId }: { submissionId: string } = await req.json();
    
    console.log("Processing payment email for submission:", submissionId);

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

    const submissionData = submission as PaymentSubmission;
    const confirmUrl = `${supabaseUrl.replace('.supabase.co', '')}/functions/v1/confirm-payment?id=${submissionId}`;

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: "Payment Notifications <onboarding@resend.dev>",
      to: ["harperharvey834@gmail.com"],
      subject: `New Payment Receipt – ${submissionData.full_name} – ${submissionData.package_type || 'Package'} – ${submissionData.amount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">New Payment Receipt Submitted</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${submissionData.full_name}</p>
            <p><strong>Email:</strong> ${submissionData.email}</p>
            <p><strong>WhatsApp:</strong> ${submissionData.whatsapp || 'Not provided'}</p>
            <p><strong>Amount:</strong> ${submissionData.amount}</p>
            <p><strong>Package:</strong> ${submissionData.package_type || 'Not specified'}</p>
          </div>

          ${submissionData.receipt_url ? `<p><strong>Receipt:</strong> <a href="${submissionData.receipt_url}">View Receipt</a></p>` : ''}
          
          <div style="margin: 30px 0;">
            <a href="${confirmUrl}" 
               style="background: #10b981; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              ✓ Confirm Payment
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Click the button above to confirm this payment and notify the customer.
          </p>
        </div>
      `,
    });

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: "Team Harper <onboarding@resend.dev>",
      to: [submissionData.email],
      subject: "Payment Received – Verifying",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Thanks, ${submissionData.full_name}!</h2>
          
          <p>We've received your payment receipt and are currently verifying your transfer for:</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Package:</strong> ${submissionData.package_type || 'Your selected package'}</p>
            <p><strong>Amount:</strong> ${submissionData.amount}</p>
          </div>
          
          <p>You'll receive a "Payment Confirmed" email shortly once we verify everything.</p>
          
          <p style="margin-top: 30px;">Best regards,<br>Team Harper</p>
        </div>
      `,
    });

    console.log("Admin email sent:", adminEmail);
    console.log("User email sent:", userEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail, 
        userEmail 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-payment-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
