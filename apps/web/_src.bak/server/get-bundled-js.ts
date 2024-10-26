import fs from 'fs';
import path from 'path';

let cache = new Set<string>();

export function getBundledJs(asset: string) {
  if (cache.size === 0) {
    let dist = path.resolve(process.cwd(), 'dist');
    let dirents = fs.readdirSync(dist, { encoding: 'utf8', withFileTypes: true });
    let js = dirents.filter((dirent) => dirent.isFile() && dirent.name.endsWith('.js'));
    for (const file of js) cache.add(file.name);
  }

  for (const file of cache) {
    if (file.startsWith(asset)) return file;
  }

  return null;
}
