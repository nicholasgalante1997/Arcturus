function download(src: string, filename: string) {
  /**
   * This won't work because of "Same-Origin" policy on downloads in modern browsers,
   * so we can port pdfs from cloudfront to our local build directory (meh)
   * or we can drive traffic off-site where we can't track any of their interactions (MEH)
   * Rock, Hard Place.
   * */
  const knownSources = new RegExp(/(https:\/\/d1lrpeoasv2hi6\.cloudfront\.net\/.+\.pdf)/);
  if (knownSources.test(src)) {
    if (typeof window !== 'undefined') {
      const anchor = window.document.createElement('a');
      anchor.href = src;
      anchor.download = filename;
      anchor.click();
      anchor.remove();
    }
  }
}

export { download };
