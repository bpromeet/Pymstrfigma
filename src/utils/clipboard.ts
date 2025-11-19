import { toast } from 'sonner@2.0.3';

/**
 * Copy text to clipboard utility using fallback method
 * 
 * This method doesn't require Clipboard API permissions and works across all browsers.
 * It creates a temporary textarea, copies the text, and removes the textarea.
 * 
 * @param text - The text to copy to clipboard
 * @param onSuccess - Optional callback to execute on successful copy (for UI state updates)
 * @param successMessage - Optional custom success message (defaults to "Copied to clipboard!")
 * @returns boolean - true if copy was successful, false otherwise
 * 
 * @example
 * ```tsx
 * const [copied, setCopied] = useState(false);
 * 
 * copyToClipboard(
 *   "text to copy",
 *   () => {
 *     setCopied(true);
 *     setTimeout(() => setCopied(false), 2000);
 *   }
 * );
 * ```
 */
export const copyToClipboard = (
  text: string,
  onSuccess?: () => void,
  successMessage: string = 'Copied to clipboard!'
): boolean => {
  // Create temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    // Execute copy command
    const successful = document.execCommand('copy');
    
    if (successful) {
      // Show success toast
      toast.success(successMessage);
      
      // Execute optional callback
      if (onSuccess) {
        onSuccess();
      }
    } else {
      toast.error('Failed to copy to clipboard');
    }
    
    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    toast.error('Failed to copy to clipboard');
    return false;
  } finally {
    // Clean up: remove the textarea
    document.body.removeChild(textarea);
  }
};

/**
 * Copy text to clipboard with state tracking for UI feedback
 * 
 * This is a wrapper around copyToClipboard that handles the common pattern
 * of showing a checkmark icon for 2 seconds after copying.
 * 
 * @param text - The text to copy to clipboard
 * @param setCopied - State setter function to update copied state
 * @param successMessage - Optional custom success message
 * 
 * @example
 * ```tsx
 * const [copiedItem, setCopiedItem] = useState<string | null>(null);
 * 
 * <Button onClick={() => copyWithFeedback(apiKey, () => setCopiedItem(apiKey))}>
 *   {copiedItem === apiKey ? (
 *     <Check className="w-4 h-4 text-green-600" />
 *   ) : (
 *     <Copy className="w-4 h-4" />
 *   )}
 * </Button>
 * ```
 */
export const copyWithFeedback = (
  text: string,
  setCopied: (value: boolean | string | null) => void,
  successMessage?: string
): void => {
  copyToClipboard(
    text,
    () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
    successMessage
  );
};
