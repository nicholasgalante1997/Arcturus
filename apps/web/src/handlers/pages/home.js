import WebDependencyManager from '../../lib/dependencies/index.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {void}
 */
export default async function homePageHandler(req, res) {
  await WebDependencyManager.setupImportMap();

  res.status(200).render('index', {
    title: 'Project Arcturus',
    description: 'A content microengine, maintained by the team at Arcturus',
    imports: [
      {
        name: WebDependencyManager.getDependency('front-matter')?.dependency,
        url: WebDependencyManager.getDependency('front-matter')?.cdn?.links?.at(0)
      },
      {
        name: WebDependencyManager.getDependency('lottie-web')?.dependency,
        url: WebDependencyManager.getDependency('lottie-web')?.cdn?.links?.at(0)
      },
      {
        name: WebDependencyManager.getDependency('web-vitals')?.dependency,
        url: WebDependencyManager.getDependency('web-vitals')?.cdn?.links?.at(0)
      },
      {
        name: WebDependencyManager.getDependency('sleepydogs')?.dependency,
        url: WebDependencyManager.getDependency('sleepydogs')?.cdn?.links?.at(0)
      }
    ]
  });
}
