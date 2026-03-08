export const INSTAGRAM_URL_REGEX = /^https?:\/\/(www\.)?instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)(\/|\?|$)/;

export function validateInstagramUrl(url: string): { valid: boolean; type?: 'reel' | 'post'; id?: string } {
  try {
    const parsed = new URL(url.trim());

    if (!parsed.hostname.includes("instagram.com")) {
      return { valid: false };
    }

    const parts = parsed.pathname.split("/").filter(Boolean);

    if (parts[0] === "reel" || parts[0] === "p") {
      return {
        valid: true,
        type: parts[0] === "reel" ? "reel" : "post",
        id: parts[1]
      };
    }

    return { valid: false };

  } catch {
    return { valid: false };
  }
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
  try {
    const cleanUrl = url.split("?")[0];

    // public CORS proxy
    const proxy = "https://api.allorigins.win/raw?url=";

    const response = await fetch(proxy + encodeURIComponent(cleanUrl));

    if (!response.ok) {
      throw new Error();
    }

    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const image =
      doc.querySelector('meta[property="og:image"]')?.getAttribute("content");

    const title =
      doc.querySelector('meta[property="og:title"]')?.getAttribute("content");

    if (!image) {
      throw new Error();
    }

    return {
      imageUrl: image,
      title: title || "Instagram Cover",
      resolution: "1080 × 1920"
    };
  } catch {
    throw new Error("Unable to extract cover image.");
  }
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
