import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { shouldShowInstallPopup, markInstalled, markDismissed } from "@/lib/install";
import { trackEvent } from "@/lib/analytics";

const InstallPopup = () => {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (shouldShowInstallPopup()) {
        setTimeout(() => setShow(true), 3000);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        markInstalled();
        trackEvent('install_app');
      }
    }
    setShow(false);
  };

  const handleDismiss = () => {
    markDismissed();
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-[380px] z-50 animate-fade-in-up">
      <div className="bg-card border border-border rounded-2xl shadow-card-hover p-5 relative">
        <button onClick={handleDismiss} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl gradient-instagram flex items-center justify-center flex-shrink-0">
            <Download className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Install InstaCover</p>
            <p className="text-xs text-muted-foreground mb-3">For faster downloads and instant access.</p>
            <div className="flex gap-2">
              <button onClick={handleInstall} className="px-4 py-1.5 rounded-lg text-xs font-semibold gradient-instagram text-primary-foreground hover:opacity-90 transition-opacity">
                Install App
              </button>
              <button onClick={handleDismiss} className="px-4 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPopup;
