
/**
 * Creates a share URL for the specified platform
 */
export const createShareUrl = (platform: string, url: string, title: string): string => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    case 'whatsapp':
      return `https://wa.me/?text=${encodedTitle} ${encodedUrl}`;
    default:
      return '';
  }
};

/**
 * Opens a share dialog in a new window
 */
export const openShareDialog = (shareUrl: string): void => {
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=450');
  }
};
