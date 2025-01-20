import $debug from 'debug';
import * as emoji from 'node-emoji';

const LOGGER_PREFIX = 'project-arcturus:web:express:server';
const NODE_PROCESS_LOG_LEVEL_KEY = '__ARCTURUS_NODE_LOG_LEVEL__';
const LOG_TO_INT_MAP = new Map([
  ['info', 1],
  ['warn', 2],
  ['error', 3],
  ['debug', 1]
]);

const _info = $debug(LOGGER_PREFIX + ':info');
const _debug = $debug(LOGGER_PREFIX + ':debug');
const _warn = $debug(LOGGER_PREFIX + ':warn');
const _error = $debug(LOGGER_PREFIX + ':error');

function shouldLog(level) {
  const LOG_LEVEL = process.env[NODE_PROCESS_LOG_LEVEL_KEY] || 'error';
  const processLevel = LOG_LEVEL;
  const processLevelInt = LOG_TO_INT_MAP.get(processLevel);
  const levelInt = LOG_TO_INT_MAP.get(level);
  if (processLevelInt >= levelInt) return true;
  return false;
}

const getTrapHandler = (level) => ({
  apply(target, thisArg, argArray) {
    if (shouldLog(level)) {
      if (Array.isArray(argArray) && argArray.length === 1) {
        if (argArray.at(0) instanceof Error) {
          return handleErrorLogEvent(...argArray);
        }
      }

      const argArrayTransformed = argArray.map((arg) => {
        if (typeof arg === 'string') {
          return emoji.emojify(arg);
        }

        return arg;
      });

      return target(...argArrayTransformed);
    }
  }
});

const info = new Proxy(_info, getTrapHandler('info'));
const warn = new Proxy(_warn, getTrapHandler('warn'));
const debug = new Proxy(_debug, getTrapHandler('debug'));
const error = new Proxy(_error, getTrapHandler('error'));

function handleErrorLogEvent(msg) {
  error('An error was thrown');
  error('(ERROR Name): ' + msg?.name);
  error('(ERROR message): ' + msg?.message);
  error('(ERROR cause): ' + msg?.cause);
  error('(ERROR stack): ' + msg?.stack);
}

export { info, warn, error, debug };
