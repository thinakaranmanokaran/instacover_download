const INSTALL_KEY = 'install_token';
const DISMISS_TIME_KEY = 'install_dismiss_time';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function shouldShowInstallPopup(): boolean {
  const token = localStorage.getItem(INSTALL_KEY);
  if (token === 'true') return false;
  if (token === 'false') {
    const dismissTime = localStorage.getItem(DISMISS_TIME_KEY);
    if (dismissTime && Date.now() - Number(dismissTime) < ONE_DAY_MS) {
      return false;
    }
  }
  return true;
}

export function markInstalled() {
  localStorage.setItem(INSTALL_KEY, 'true');
}

export function markDismissed() {
  localStorage.setItem(INSTALL_KEY, 'false');
  localStorage.setItem(DISMISS_TIME_KEY, String(Date.now()));
}
