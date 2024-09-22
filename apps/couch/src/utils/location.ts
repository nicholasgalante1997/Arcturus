export function to(path: string): void {
  if (typeof window !== 'undefined') {
    window.location.assign(path);
  }
}
