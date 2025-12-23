/**
 * Copy text to clipboard using fallback method
 * Works without Clipboard API permissions
 */
export const copyToClipboard = (text: string): boolean => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  
  try {
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    document.body.removeChild(textarea);
    return false;
  }
};
