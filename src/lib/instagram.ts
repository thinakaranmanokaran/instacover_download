export const INSTAGRAM_URL_REGEX = /^https?:\/\/(www\.)?instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)\/?/;

export function validateInstagramUrl(url: string): { valid: boolean; type?: 'reel' | 'post'; id?: string } {
  const match = url.trim().match(INSTAGRAM_URL_REGEX);
  if (!match) return { valid: false };
  return {
    valid: true,
    type: match[2] === 'reel' ? 'reel' : 'post',
    id: match[3],
  };
}

export interface CoverResult {
  imageUrl: string;
  thumbnailUrl?: string;
  title?: string;
  resolution?: string;
}

/**
 * Fetches cover image using Instagram's oEmbed API.
 * Note: This returns a lower-res thumbnail. For high-res extraction,
 * a backend proxy (e.g., Lovable Cloud edge function) is needed.
 */
export async function fetchCoverImage(url: string): Promise<CoverResult> {
  const oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(url)}&access_token=&omitscript=true`;
  
  // Try oEmbed first (may fail without token)
  // Fallback: use a noembed proxy
  const proxyUrl = `https://noembed.com/embed?url=${encodeURIComponent(url)}`;
  
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    throw new Error('This post is private or cannot be accessed.');
  }
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error('This post is private or cannot be accessed.');
  }

  if (!data.thumbnail_url) {
    throw new Error('This post is private or cannot be accessed.');
  }

  return {
    imageUrl: data.thumbnail_url,
    title: data.title || data.author_name || 'Instagram Cover',
    resolution: data.thumbnail_width && data.thumbnail_height 
      ? `${data.thumbnail_width} × ${data.thumbnail_height}` 
      : undefined,
  };
}

export async function downloadImage(imageUrl: string, filename: string = 'instacover.jpg') {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    // Fallback: open in new tab
    window.open(imageUrl, '_blank');
  }
}
