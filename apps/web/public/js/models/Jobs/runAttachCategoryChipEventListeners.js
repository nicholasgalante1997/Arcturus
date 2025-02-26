import Store from '../../store/index.js';

const { dispatch, subscribe, useStore } = Store;

const chipsTag = 'span[data-component-id="CategoryChip"]';
const cardsTag = 'article.post-card__root';

export function runAttachCategoryChipEventListeners() {
  /**
   * Subscribe to changes in the store
   */
  const unsubscribe = subscribe((state) => {
    const {
      ui: {
        home: {
          categories: { active }
        }
      },
      posts,
      categories
    } = state;

    const chips = document.querySelectorAll(chipsTag);
    const postsCards = document.querySelectorAll(cardsTag);

    for (const chip of chips) {
      const chipLabel = chip.dataset.chipLabel;
      const isActive = active.includes(chipLabel);
      chip.dataset.currentSelection = isActive.toString();
    }

    for (const postCard of postsCards) {
      const postId = postCard.id;
      if (postId) {
        const post = posts.find((post) => post.id === postId);
        const postGenres = post.genres;
        const visbility = !!postGenres.find((genre) => active.includes(genre)) ? `visible` : `hidden`;
        postCard.dataset.visibility = visbility;
      }
    }
  });

  for (const element of document.querySelectorAll(chipsTag)) {
    element.addEventListener('click', () => {
      const label = element.dataset.chipLabel;
      const isActive = element.dataset.currentSelection === 'true';

      if (!isActive) {
        const state = useStore();
        const currentActiveLabels = state.ui.home.categories.active || [];
        currentActiveLabels.push(label);
        const ui = state.ui;
        ui.home.categories.active = currentActiveLabels;
        dispatch({
          type: 'set',
          data: {
            ui
          }
        });
      } else {
        const state = useStore();
        const currentActiveLabels = state.ui.home.categories.active || [];
        const index = currentActiveLabels.indexOf(label);
        currentActiveLabels.splice(index, 1);
        const ui = state.ui;
        ui.home.categories.active = currentActiveLabels;
        dispatch({
          type: 'set',
          data: {
            ui
          }
        });
      }
    });
  }
}

export const runAttachCategoryChipEventListenersKey =
  'home-page.post-cards.attach-button-on-click-job';
