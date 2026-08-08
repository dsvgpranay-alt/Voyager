// Enhanced clipboard utility with multiple fallback methods
export const copyTextToClipboard = async (text: string): Promise<{ success: boolean; method: string; error?: string }> => {
  // Method 1: Modern Clipboard API (preferred)
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return { success: true, method: 'clipboard-api' };
    } catch (err) {
      console.warn('Clipboard API failed:', err);
    }
  }

  // Method 2: execCommand fallback
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    textArea.style.zIndex = '-1';
    
    // Make it uneditable
    textArea.setAttribute('readonly', '');
    textArea.setAttribute('aria-hidden', 'true');
    textArea.setAttribute('tabindex', '-1');
    
    document.body.appendChild(textArea);
    
    // Focus and select the text
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, text.length);
    
    // Try to copy
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (successful) {
      return { success: true, method: 'execCommand' };
    }
  } catch (err) {
    console.warn('execCommand failed:', err);
  }

  // Method 3: Modern Selection API
  try {
    const range = document.createRange();
    const selection = window.getSelection();
    const tempDiv = document.createElement('div');
    
    tempDiv.style.position = 'fixed';
    tempDiv.style.left = '-999999px';
    tempDiv.style.top = '-999999px';
    tempDiv.textContent = text;
    
    document.body.appendChild(tempDiv);
    range.selectNodeContents(tempDiv);
    
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      
      const successful = document.execCommand('copy');
      selection.removeAllRanges();
      document.body.removeChild(tempDiv);
      
      if (successful) {
        return { success: true, method: 'selection-api' };
      }
    }
    
    document.body.removeChild(tempDiv);
  } catch (err) {
    console.warn('Selection API failed:', err);
  }

  // Method 4: Show modal for manual copy (last resort)
  try {
    const userCopied = window.confirm(
      'Automatic copying failed. Click OK to see the text in a popup window where you can manually copy it.'
    );
    
    if (userCopied) {
      // Create a new window with the text
      const popup = window.open('', '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
      if (popup) {
        popup.document.write(`
          <html>
            <head>
              <title>Copy Trip Details</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  margin: 20px; 
                  background: #f5f5f5; 
                }
                .container { 
                  background: white; 
                  padding: 20px; 
                  border-radius: 8px; 
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
                }
                textarea { 
                  width: 100%; 
                  height: 300px; 
                  border: 2px solid #e1e5e9; 
                  border-radius: 4px; 
                  padding: 12px; 
                  font-family: monospace; 
                  font-size: 14px;
                  resize: vertical;
                }
                .header { 
                  color: #333; 
                  margin-bottom: 16px; 
                }
                .instructions {
                  background: #e8f4f8;
                  padding: 12px;
                  border-radius: 4px;
                  margin-bottom: 16px;
                  font-size: 14px;
                  color: #2c5aa0;
                }
                button {
                  background: #007bff;
                  color: white;
                  border: none;
                  padding: 8px 16px;
                  border-radius: 4px;
                  cursor: pointer;
                  margin-top: 10px;
                }
                button:hover {
                  background: #0056b3;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2 class="header">🛫 Your Kerala Trip Details</h2>
                <div class="instructions">
                  <strong>Instructions:</strong> Select all text below (Ctrl+A or Cmd+A) and copy it (Ctrl+C or Cmd+C)
                </div>
                <textarea readonly onclick="this.select()" onfocus="this.select()">${text.replace(/</g, '<').replace(/>/g, '>')}</textarea>
                <br>
                <button onclick="document.querySelector('textarea').select(); document.execCommand('copy'); alert('Text copied!');">
                  📋 Copy to Clipboard
                </button>
                <button onclick="window.close();" style="margin-left: 10px;">
                  ✕ Close
                </button>
              </div>
            </body>
          </html>
        `);
        popup.document.close();
        return { success: true, method: 'manual-popup' };
      }
    }
  } catch (err) {
    console.warn('Manual copy popup failed:', err);
  }

  return { 
    success: false, 
    method: 'none', 
    error: 'All clipboard methods failed. This may be due to browser security restrictions.' 
  };
};

// Utility to check if clipboard is available
export const isClipboardAvailable = (): boolean => {
  return !!(navigator.clipboard && window.isSecureContext) || 
         document.queryCommandSupported?.('copy') === true;
};

// Utility to get user-friendly clipboard status
export const getClipboardInfo = (): {
  available: boolean;
  method: string;
  secure: boolean;
} => {
  const hasClipboardAPI = !!(navigator.clipboard && window.isSecureContext);
  const hasExecCommand = document.queryCommandSupported?.('copy') === true;
  
  return {
    available: hasClipboardAPI || hasExecCommand,
    method: hasClipboardAPI ? 'modern' : hasExecCommand ? 'legacy' : 'none',
    secure: window.isSecureContext
  };
};