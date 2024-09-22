import fs from "fs";
import path from "path";
import postcss from "postcss";
import cssnano from "cssnano";
import { glob } from "glob";
import pino from "pino";

void (async () => {
  const logger = pino({
    name: "minifier-logger",
    base: undefined,
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  });

  const { data: cssFiles, error } = await attemptAsync(
    async () =>
      await glob("src/components/*.css", {
        ignore: "node_modules",
      }),
  );

  if (error || !cssFiles) {
    logger.fatal(error);
    process.exit(1);
  }

  for (const file of cssFiles) {
    const filePath = path.resolve(process.cwd(), file);
    const fileNameSplit = file.split("/");
    const filenameRaw = fileNameSplit.at(fileNameSplit.length - 1);
    const filename = [filenameRaw.split(".").at(0).toLowerCase(), "min", "css"].join(".");
    const outFilePath = path.resolve(process.cwd(), "build", "css", filename);
    const { data: css, error: cssFileReadError } = attempt(
      fs.readFileSync.bind(this, filePath, { encoding: "utf-8" }),
    );
    if (cssFileReadError || !css) {
      logger.fatal(cssFileReadError || new Error('POSTCSS:::CSS_FILE_READ_ERROR'));
      process.exit(1);
    }
    await attemptAsync(
      async () =>
        await postcss([cssnano])
          .process(css, { from: filePath, to: outFilePath })
          .then((result) => {
            const { error: writeFileError } = attempt(() =>
              fs.writeFileSync(outFilePath, result.css, { encoding: "utf-8" }),
            );
            if (writeFileError) {
              logger.fatal(writeFileError);
              process.exit(1);
            }
          }),
    );
  }

  function attempt(callback) {
    let data = null;
    let error = null;
    try {
      data = callback();
    } catch (e) {
      data = null;
      error = e;
    } finally {
      return {
        data,
        error,
      };
    }
  }

  async function attemptAsync(callback) {
    let data = null;
    let error = null;
    try {
      data = await callback();
    } catch (e) {
      data = null;
      error = e;
    } finally {
      return {
        data,
        error,
      };
    }
  }

})();
