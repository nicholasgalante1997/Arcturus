import { CardElementBuilder } from '../Components/Card.js';
import { info } from '../../log/index.js';
import Store from '../../store/index.js';
import Renderer from '../Renderer/index.js';

export const runSubscribeToAndRenderPostCardUpdatesKey = 'subscribe.render.home-page.post-cards';

export function runSubscribeToAndRenderPostCardUpdates() {
  // const mountElement = document.getElementById('posts');

  // const { subscribe, useStore } = Store;

  // function removeCards() {
  //   mountElement.innerHTML = '';
  // }

  // function renderCards() {
  //   removeCards();
  //   const { posts = [] } = useStore();
  //   for (const [id, post] of posts) {
  //     if (id && post && post?.metadata) {
  //       info({ postIs: post, id  })
  //       const card = new CardElementBuilder();
  //       card
  //         .setAuthor(post?.metadata?.author)
  //         .setDescription(post?.metadata?.description)
  //         .setLabels(post?.metadata?.genres || post?.metadata?.motifs || [])
  //         .setLink(post?.metadata?.slug)
  //         .setPublishingDate(post?.metadata?.releaseDate)
  //         .setReadingTime(post?.metadata?.estimatedReadingTime)
  //         .setTitle(post?.metadata?.title);

  //       Renderer.mount(mountElement, card.toElement());
  //     }
  //   }
  // }

  // const _unsubscribe = subscribe(renderCards);
  // renderCards();
}
