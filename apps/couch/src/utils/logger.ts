import pino from 'pino';

function logLevel(): pino.Level {
  if (process.env.NODE_ENV === 'production') {
    return 'info'; /** TODO: before launching change this to silent */
  }
  return 'info';
}

export const logger = pino({
  name: 'evergreen-terrace',
  level: logLevel(),
  browser: {
    asObject: true
  }
});
