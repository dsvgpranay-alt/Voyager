import { TripExportData, formatCurrency } from './tripExport';
import { copyTextToClipboard } from './clipboard';
import { format } from 'date-fns';

export const generateShareText = (data: TripExportData, platform: 'whatsapp' | 'email' | 'generic' = 'generic'): string => {
  const { travelData, travelerData, totalBudget } = data;
  
  const baseText = `🛫 My Kerala Trip Plan 🛫

📍 ${travelData.source} → ${travelData.destination}
📅 ${travelData.duration} days (${travelData.startDate ? format(new Date(travelData.startDate), 'MMM dd') : 'TBD'} - ${travelData.endDate ? format(new Date(travelData.endDate), 'MMM dd') : 'TBD'})
👥 ${travelerData.travelers.length} travelers
💰 Estimated Budget: ${formatCurrency(totalBudget)}

✨ Ready to explore God's Own Country! Kerala awaits with its backwaters, hill stations, and rich culture.

#Kerala #Travel #GodsOwnCountry #TravelPlanning`;

  switch (platform) {
    case 'whatsapp':
      return `${baseText}

🌴 Planned with VOYAGER - Kerala Travel Planner`;
    
    case 'email':
      return `Subject: My Kerala Trip to ${travelData.destination}

${baseText}

This itinerary was planned using VOYAGER - Kerala Travel Planner.

Best regards!`;
    
    default:
      return baseText;
  }
};

export const shareViaWhatsApp = (data: TripExportData) => {
  const text = generateShareText(data, 'whatsapp');
  const encodedText = encodeURIComponent(text);
  const whatsappUrl = `https://wa.me/?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
};

export const shareViaEmail = (data: TripExportData) => {
  const emailContent = generateShareText(data, 'email');
  const lines = emailContent.split('\n');
  const subject = lines[0].replace('Subject: ', '');
  const body = lines.slice(1).join('\n');
  
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl, '_blank');
};

export const shareViaTelegram = (data: TripExportData) => {
  const text = generateShareText(data, 'generic');
  const encodedText = encodeURIComponent(text);
  const telegramUrl = `https://t.me/share/url?text=${encodedText}`;
  window.open(telegramUrl, '_blank');
};

export const shareViaTwitter = (data: TripExportData) => {
  const { travelData, totalBudget } = data;
  const text = `🛫 Planning my Kerala adventure to ${travelData.destination}! ${travelData.duration} days of exploring God's Own Country 🌴 Budget: ${formatCurrency(totalBudget)} #Kerala #Travel #GodsOwnCountry`;
  const encodedText = encodeURIComponent(text);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
  window.open(twitterUrl, '_blank');
};

export const shareViaFacebook = (data: TripExportData) => {
  const text = generateShareText(data, 'generic');
  const encodedText = encodeURIComponent(text);
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}`;
  window.open(facebookUrl, '_blank');
};

export const shareViaLinkedIn = (data: TripExportData) => {
  const { travelData } = data;
  const title = `Kerala Trip to ${travelData.destination}`;
  const summary = generateShareText(data, 'generic');
  const encodedTitle = encodeURIComponent(title);
  const encodedSummary = encodeURIComponent(summary);
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?summary=${encodedSummary}&title=${encodedTitle}`;
  window.open(linkedinUrl, '_blank');
};

export const copyToClipboard = async (data: TripExportData): Promise<{ success: boolean; method?: string; error?: string }> => {
  const text = generateShareText(data, 'generic');
  const result = await copyTextToClipboard(text);
  
  return {
    success: result.success,
    method: result.method,
    error: result.error
  };
};

// Native Web Share API (for mobile devices)
export const shareViaNativeAPI = async (data: TripExportData): Promise<boolean> => {
  if (!navigator.share) {
    return false;
  }

  const { travelData } = data;
  const text = generateShareText(data, 'generic');

  try {
    await navigator.share({
      title: `My Kerala Trip to ${travelData.destination}`,
      text: text,
    });
    return true;
  } catch (err) {
    console.error('Error sharing:', err);
    return false;
  }
};