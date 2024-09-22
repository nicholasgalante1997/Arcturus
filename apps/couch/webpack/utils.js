import { readdirSync } from 'fs';
import { resolve } from 'path';

function trim(file) {
  return file.split('.')[0];
}

function getEntryObject() {
  /** Load pages from /hydrate-mounts directory */
  const dirContents = readdirSync(resolve(process.cwd(), 'src', 'browser'), { encoding: 'utf-8' });
  if (dirContents.length < 1) {
    throw new Error('Could not read "browser" directory.');
  }
  /** Map files to entry objects */
  let entryObject = {};
  for (const file of dirContents) {
    entryObject[trim(file)] = resolve(process.cwd(), 'src', 'browser', file);
  }
  return entryObject;
}

export { trim, getEntryObject };
