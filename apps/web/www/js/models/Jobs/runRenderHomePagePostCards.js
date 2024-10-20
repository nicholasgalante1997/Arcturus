import { CardElementBuilder } from '../Components/Card.js'
import Renderer from '../Renderer/index.js';

export const runRenderHomePagePostCardsJobKey = 'render.home-page.post-cards';

export function runRenderHomePagePostCards() {
    const mockPosts = [,,,,,,,,,,,,,,,,,,,];
    for (const _ of mockPosts) {
        const card = new CardElementBuilder();
        
        card
          .setAuthor('Washington Irving')
          .setDescription('Lorem ipsum odor amet, consectetuer adipiscing elit. Libero pharetra felis in sit himenaeos. Convallis id turpis ornare sollicitudin dui parturient finibus mollis. Lobortis iaculis torquent aliquam malesuada libero hac vivamus? Maximus lacinia semper ante montes donec posuere potenti? Lectus habitasse porta potenti; est orci arcu magna.')
          .setLabels(['FANTASY-FOOTBALL'])
          .setLink('/some-url.html')
          .setPublishingDate('15 October 2024')
          .setReadingTime('3 mins')
          .setTitle('Why Travis Etienne will prove to be the 2024 bust of the year based on ADP.');

        Renderer.mount(document.getElementById('posts'), card.toElement());
    }
}