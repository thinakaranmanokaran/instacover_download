import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { validateInstagramUrl, fetchCoverImage, CoverResult } from "@/lib/instagram";
import { trackEvent } from "@/lib/analytics";

interface URLInputProps {
  onResult: (result: CoverResult) => void;
}

const URLInput = ({ onResult }: URLInputProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = validateInstagramUrl(url);
    if (!validation.valid) {
      setError("Invalid Instagram link. Please enter a valid Reel or Post URL.");
      return;
    }

    trackEvent('link_pasted', { type: validation.type || 'unknown' });
    setLoading(true);

    try {
      const result = await fetchCoverImage(url.trim());
      onResult(result);
    } catch (err: any) {
      setError(err.message || "This post is private or cannot be accessed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 gradient-instagram rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
        <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-card group-focus-within:shadow-glow transition-shadow duration-300 overflow-hidden">
          <input
            type="url"
            value={url}
            onChange={(e) => { setUrl(e.target.value); setError(""); }}
            placeholder="Paste Instagram Reel or Post URL..."
            className="flex-1 px-5 py-4 text-sm bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="m-2 px-5 py-2.5 rounded-xl font-semibold text-sm gradient-instagram text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            {loading ? "Extracting..." : "Extract"}
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-3 text-sm text-destructive text-center animate-fade-in-up">{error}</p>
      )}
    </form>
  );
};

export default URLInput;
