import path from 'path';
import fs from 'fs';
import frontmatter from 'front-matter';

const version = Date.now();

(async function () {
  let didError = false;
  let error;
  let blob = {
    version,
    metadata: []
  };

  try {
    const seasonContents = fs.readdirSync(path.resolve(process.cwd(), 'writ', 'Season_1'), { encoding: 'utf-8', recursive: true, withFileTypes: true });
    for (const story of seasonContents) {
      const loadedFile = fs.readFileSync(path.resolve(process.cwd(), 'writ', 'Season_1', story.name), {
        encoding: 'utf-8'
      });
      const parsedFrontmatter = frontmatter(loadedFile);
      if (!parsedFrontmatter.attributes) {
        throw new Error('Could not parse frontmatter.');
      }
      const key = `season_1_episode_${parsedFrontmatter.attributes.episodeKey}`;
      blob.metadata.push(Object.assign({}, { longKey: key, ...parsedFrontmatter.attributes }));
    }
    const autoGenFilePath = path.resolve(process.cwd(), 'src', 'contexts', 'data', 'writ.json');
    if (fs.existsSync(autoGenFilePath)) {
      fs.rmSync(autoGenFilePath);
    }
    fs.writeFileSync(autoGenFilePath, JSON.stringify(blob), { encoding: 'utf-8' });
  } catch (e) {
    didError = true;
    error = e;
  } finally {
    if (didError) {
      console.error(error);
      process.exit(1);
    }
    console.log('Process exited successfully.');
  }
})();
