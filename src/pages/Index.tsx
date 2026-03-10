import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import URLInput from "@/components/URLInput";
import ImagePreview from "@/components/ImagePreview";
import SuggestedTools from "@/components/SuggestedTools";
import AdPlaceholder from "@/components/AdPlaceholder";
import InstallPopup from "@/components/InstallPopup";
import { CoverResult } from "@/lib/instagram";

const Index = () => {
  const [result, setResult] = useState<CoverResult | null>(null);
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const url =
      params.get("url") ||
      params.get("text");

    if (url) {
      console.log("Shared Instagram link:", url);
      setSharedUrl(url);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Ad */}
      {/* <AdPlaceholder label="Ad Space — Top Banner" /> */}

      <main className="flex-1 flex flex-col items-center px-4 pt-12 pb-8">
        {/* Hero */}
        <div className="text-center mb-10 max-w-2xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-instagram flex items-center justify-center">
              <Download className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">InstaCover</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
            Download Instagram
            <br />
            <span className="gradient-instagram-text">Reel & Post Covers</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            Paste a link, get the cover image. Fast, free, no login required.
          </p>
        </div>

        {/* Input or Result */}
        {result ? (
          <ImagePreview result={result} onReset={() => setResult(null)} />
        ) : (
          <URLInput onResult={setResult} initialUrl={sharedUrl} />
        )}

        {/* Result Ad */}
        {/* {result && (
          <div className="mt-8 w-full">
            <AdPlaceholder label="Ad Space — Results Section" />
          </div>
        )} */}

        {/* Suggested Tools */}
        <SuggestedTools />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        {/* <AdPlaceholder label="Ad Space — Footer" /> */}
        <p className="text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()} InstaCover. Free Instagram cover image downloader.
        </p>
      </footer>

      <InstallPopup />
    </div>
  );
};

export default Index;
