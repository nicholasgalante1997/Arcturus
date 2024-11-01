import { info } from '../lib/log/index.js';

/** @type {import('express').Handler} */
export default function requestLogger(req, res, next) {
  const { method, path, baseUrl, hostname, ip, headers } = req;
  const userAgent = headers['user-agent'];
  const logline = `METHOD=${method},REQUEST_URL=${baseUrl + path},REQUEST_HOSTNAME=${hostname},REQUEST_IP=${ip},USER_AGENT=${userAgent}`;
  info(logline);
  next();
}
