import { Download, RotateCcw } from "lucide-react";
import { CoverResult, downloadImage } from "@/lib/instagram";
import { trackEvent } from "@/lib/analytics";
import ShareButtons from "./ShareButtons";

interface ImagePreviewProps {
  result: CoverResult;
  onReset: () => void;
}

const ImagePreview = ({ result, onReset }: ImagePreviewProps) => {
  const handleDownload = () => {
    trackEvent('download_clicked');
    downloadImage(result.imageUrl, `instacover-${Date.now()}.jpg`);
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in-up">
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="aspect-square relative bg-muted">
          <img
            src={result.imageUrl}
            alt={result.title || "Instagram cover image"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-5 space-y-4">
          {result.title && (
            <p className="text-sm font-medium text-foreground truncate">{result.title}</p>
          )}
          {result.resolution && (
            <p className="text-xs text-muted-foreground">{result.resolution}</p>
          )}
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm gradient-instagram text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            Download Cover Image
          </button>
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Another Link
          </button>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Share this tool</p>
            <ShareButtons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
