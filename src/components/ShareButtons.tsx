import { Copy, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

const ShareButtons = () => {
  const url = window.location.href;
  const text = "Check out InstaCover – Download Instagram Reel & Post cover images instantly!";

  const share = (platform: string, shareUrl: string) => {
    trackEvent('share_clicked', { platform });
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied!");
    trackEvent('share_clicked', { platform: 'copy' });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button
        onClick={() => share('whatsapp', `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
      </button>
      <button
        onClick={() => share('twitter', `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        𝕏 Twitter
      </button>
      <button
        onClick={() => share('telegram', `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <Send className="w-3.5 h-3.5" /> Telegram
      </button>
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <Copy className="w-3.5 h-3.5" /> Copy Link
      </button>
    </div>
  );
};

export default ShareButtons;
