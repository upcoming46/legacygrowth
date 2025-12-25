// Centralized WhatsApp configuration
export const WHATSAPP_NUMBER = "13023295673";

export const getWhatsAppLink = (message?: string) => {
  const encodedMessage = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${WHATSAPP_NUMBER}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
};
