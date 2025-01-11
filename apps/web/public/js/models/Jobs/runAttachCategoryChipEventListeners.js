import Store from '../../store/index.js';

const { dispatch, subscribe, useStore } = Store;

export function runAttachCategoryChipEventListeners() {

  /** 
   * Subscribe to changes in the store
   */
  const unsubscribe = subscribe((state) => {
    const { ui: { home: { categories: { active } } } } = state;
    
  });


    for (const element of document.querySelectorAll('span[data-component-id="CategoryChip"]')) {
      element.addEventListener('click', () => {
        
        
      });
    }
  }
  
  export const runAttachCategoryChipEventListenersKey = 'home-page.post-cards.attach-button-on-click-job';
  