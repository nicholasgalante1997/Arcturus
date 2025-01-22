import path from "path";
import { exists, readdir } from "fs/promises";

import Markdown from '../Markdown/index.js';

class PostsLoader {
  static #pathToPosts = path.resolve(process.cwd(), "posts");
  async loadFromFs() {
    if (!(await exists(PostsLoader.#pathToPosts))) {
      throw new Error("Posts directory does not exist, searched path %s", PostsLoader.#pathToPosts);
    }
    
    const dirents = await readdir(PostsLoader.#pathToPosts, {
      withFileTypes: true,
      encoding: "utf8",
    });

    const files = dirents.filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"));
    const posts = [];
    
    for (const file of files) {
      const bfile = Bun.file(
        path.resolve(path.join(file.parentPath || file.path, file.name))
      );
      const fileContents = await bfile.text();
      const markdown = new Markdown(fileContents);
      posts.push(markdown);
    }

    return posts;
  }
}

export default PostsLoader;