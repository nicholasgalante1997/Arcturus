import { readFile, readdir } from 'fs/promises';
import path from 'path';
import toml from 'toml';

export async function getImports() {
  const dirents = await readdir(path.resolve(process.cwd(), 'public', '.import'), {
    recursive: true,
    encoding: 'utf8',
    withFileTypes: true
  });
  const files = dirents.filter((dirent) => dirent.isFile() && dirent.name.endsWith('.toml'));
  const dtos = [];
  for (const file of files) {
    const fileContents = await readFile(path.resolve(file.parentPath, file.name), {
      encoding: 'utf8'
    });
    const dto = toml.parse(fileContents);
    dtos.push(dto);
  }
  return dtos;
}

class WebDependencyManager {
  #importCache = new Map();

  async setupImportMap() {
    if (this.#importCache.size > 0) return;

    const imports = await getImports();
    for (const $import of imports) {
      this.#importCache.set($import.dependency, $import);
    }
  }

  getDependency(name) {
    return this.#importCache.get(name);
  }
}

export default new WebDependencyManager();
