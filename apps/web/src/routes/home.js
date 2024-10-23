/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res
 * @returns {void} 
 */
export default function homePageHandler(req, res) {
    res.status(200).sendFile('./www/index.html');
}