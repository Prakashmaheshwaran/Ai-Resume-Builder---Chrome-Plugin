async function sendToWebhook(webhookUrl, data) {
  try {
    if (!webhookUrl || !data) {
      throw new Error('Invalid webhook URL or data');
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, message: ${response.statusText}`);
    }

    const blob = await response.blob();
    if (!blob || blob.size === 0) {
      throw new Error('Received empty PDF blob');
    }

    return blob;
  } catch (error) {
    console.error("Webhook communication error:", error);
    throw error;
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received:", message);
  
  const WEBHOOK_URLS = {
    SEND_PAGE_DETAILS: process.env.FULL_RESUME_WEBHOOK,
    SEND_URL_ONLY: process.env.COVER_LETTER_RESUME_WEBHOOK,
    SEND_JUST_COVER_LETTER: process.env.STANDALONE_COVER_LETTER_WEBHOOK
  };

  const FILE_PREFIXES = {
    SEND_PAGE_DETAILS: "Taylored_Resume_",
    SEND_URL_ONLY: "Cover_Letter_",
    SEND_JUST_COVER_LETTER: "Just_Cover_Letter_"
  };

  if (!message.type || !WEBHOOK_URLS[message.type]) {
    console.error('Invalid message type received:', message.type);
    return true;
  }

  if (!message.payload) {
    console.error('No payload received');
    return true;
  }

  sendToWebhook(WEBHOOK_URLS[message.type], message.payload)
    .then(pdfBlob => {
      try {
        const filename = `${FILE_PREFIXES[message.type]}${generateRandomString(6)}.pdf`;
        savePdf(pdfBlob, filename);
      } catch (error) {
        console.error('Error saving PDF:', error);
      }
    })
    .catch(error => {
      console.error(`Error processing ${message.type}:`, error);
      // You could implement retry logic here if needed
    });

  return true;
});