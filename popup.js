// Consolidate button click handling
const buttonConfig = {
  'getResume': {
    type: 'SEND_PAGE_DETAILS',
    needsHtml: true
  },
  'getCoverLetter': {
    type: 'SEND_URL_ONLY',
    needsHtml: false
  },
  'getJustCoverLetter': {
    type: 'SEND_JUST_COVER_LETTER',
    needsHtml: true
  }
};

function showStatus(message, isError = false) {
  const statusElement = document.getElementById('statusMessage');
  statusElement.textContent = message;
  statusElement.className = `status-message ${isError ? 'error' : 'success'}`;
  setTimeout(() => {
    statusElement.className = 'status-message';
    statusElement.textContent = '';
  }, 5000);
}

Object.entries(buttonConfig).forEach(([buttonId, config]) => {
  const button = document.getElementById(buttonId);
  
  if (!button) {
    console.error(`Button with id ${buttonId} not found`);
    return;
  }

  button.addEventListener('click', async () => {
    try {
      button.disabled = true;
      button.classList.add('loading');
      showStatus('Processing your request...');

      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tabs || !tabs[0]?.id) {
        throw new Error('No active tab found');
      }

      await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: (config) => {
          try {
            const payload = {
              pageUrl: window.location.href
            };
            
            if (config.needsHtml) {
              payload.htmlBody = document.documentElement.outerHTML;
            }

            chrome.runtime.sendMessage({
              type: config.type,
              payload
            }, (response) => {
              if (chrome.runtime.lastError) {
                throw new Error(chrome.runtime.lastError.message);
              }
            });
          } catch (error) {
            throw new Error(`Content script error: ${error.message}`);
          }
        },
        args: [config]
      });

      showStatus('Request processed successfully!', false);
    } catch (error) {
      showStatus(`Error: ${error.message}`, true);
      console.error(`Error processing ${buttonId}:`, error);
    } finally {
      button.disabled = false;
      button.classList.remove('loading');
    }
  });
});