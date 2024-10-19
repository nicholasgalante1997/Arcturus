import lottie from 'lottie-web';

export default class LottieAnimationRunner {
  static runAnimation(
    animationFile,
    container,
    renderer = 'svg',
    loop = true,
    autoplay = true,
    className = ''
  ) {
    return lottie.loadAnimation({
      path: animationFile,
      container,
      renderer,
      loop,
      autoplay,
      rendererSettings: {
        className
      }
    });
  }
}
