export const mainContentId = 'lp_contribute_banner_main_content_eluid' as const;

export function mainContentOnEnter(
  entries: IntersectionObserverEntryInit[],
  observer: IntersectionObserver
): void {
  const isolatedEl = entries.length ? entries[0] : null;
  if (isolatedEl) {
    const { isIntersecting } = isolatedEl;
    if (isIntersecting) {
      /** add entry animations here */
      isolatedEl.target.classList.add('fade-in-up', 'delay-0');
    }
  }
}

export const imageContainerId = 'lp_contribute_banner_image_content_eluid' as const;

export function imageContainerOnEnter(
  entries: IntersectionObserverEntryInit[],
  observer: IntersectionObserver
): void {
  const isolatedEl = entries.length ? entries[0] : null;
  if (isolatedEl) {
    const { isIntersecting } = isolatedEl;
    if (isIntersecting) {
      /** add entry animations here */
      isolatedEl.target.classList.add('fade-in-from-right', 'delay-0');
    }
  }
}
