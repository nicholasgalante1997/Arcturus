export function runAttachPostCardEventListeners() {
  for (const element of document.querySelectorAll('article.post-card__root button')) {
    if (element.tagName === 'BUTTON') {
      const href = element.dataset.href;
      if (href) {
        element.addEventListener('click', () => {
          /**
           * TODO event emission + observability
           */
          window.location.assign(href);
        });
      }
    }
  }
}

export const runAttachPostCardEventListenersKey = 'home-page.post-cards.attach-button-on-click-job';
