export const shelfBannerId = 'lp_shelf_banner_eluid' as const;

export function shelfBannerOnEnter(
  entries: IntersectionObserverEntryInit[],
  observer: IntersectionObserver
): void {
  const isolatedEl = entries.length ? entries[0] : null;
  if (isolatedEl) {
    const { isIntersecting } = isolatedEl;
    if (isIntersecting) {
      /** add entry animations here */
      isolatedEl.target.classList.add('fade-in-up');
    }
  }
}
