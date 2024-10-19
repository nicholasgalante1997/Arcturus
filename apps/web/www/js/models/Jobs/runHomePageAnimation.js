import LottieAnimationRunner from "../Lottie/index.js";

export const runHomePageAnimationJobKey = 'lottie.home-page.run-animation';

export function runHomePageAnimation() {
    LottieAnimationRunner.runAnimation(
        '/assets/rubiks.json',
        document.querySelector('div[data-intent="project-image"]'),
        'svg',
        true,
        true,
        'rubiks-animation'
    );
}