import Store from '../../store/index.js';

export function runAttachPostCardEventListeners() {
    for (const element of document.querySelectorAll('span[data-component-id="CategoryChip"]')) {
      element.addEventListener('click', () => {
        const { dispatch, subscribe, useStore } = Store;
        
      });
    }
  }
  
  export const runAttachPostCardEventListenersKey = 'home-page.post-cards.attach-button-on-click-job';
  