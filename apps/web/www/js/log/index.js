const LOGGER_NAME = 'project-arcturus-browser-logger';
const WINDOW_LOG_LEVEL_KEY = '__ARCTURUS_WINDOW_LOG_LEVEL__';
const LOG_TO_INT_MAP = new Map([
  ['info', 1],
  ['warn', 2],
  ['error', 3],
  ['debug', 1]
]);

function shouldLog(level) {
  const LOG_LEVEL = window[WINDOW_LOG_LEVEL_KEY];
  const windowLevel = LOG_LEVEL;
  const windowLevelInt = LOG_TO_INT_MAP.get(windowLevel);
  const levelInt = LOG_TO_INT_MAP.get(level);

  console.log({ levelInt, windowLevelInt });
  
  if (windowLevelInt >= levelInt) return true;
  return false;
}

const formatJson = (msg, level) => ({ name: LOGGER_NAME, timestamp: Date.now(), level, data: msg });
const formatPretty = (msg, level) => `[${new Date().toISOString()}] ${level.toUpperCase()} (${LOGGER_NAME}): ${typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg}`;

function handleLogEvent(msg, level, format) {
  if (shouldLog(level)) {
    const write = console[level];
    if (write && typeof write === 'function') {
      if (format === 'json') write(formatJson(msg, level));
      else if (format === 'pretty') write(formatPretty(msg, level));
    }
  }
}

const info = (msg, format = 'json') => {
  const level = 'info';
  handleLogEvent(msg, level, format);
};

const warn = (msg, format = 'json') => {
  const level = 'warn';
  handleLogEvent(msg, level, format);
};
const error = (msg, format = 'json') => {
  const level = 'error';
  handleLogEvent(msg, level, format);
};
const debug = (msg, format = 'json') => {
  const level = 'debug';
  handleLogEvent(msg, level, format);
};

/**
 *
 * @param {'*' | 'info' | 'debug' | 'error' | 'warn'} level
 */
export function setupWindowLogLevel(level) {
  Object.defineProperty(window, WINDOW_LOG_LEVEL_KEY, {
    value: level === '*' ? 'error' : level,
    writable: true
  });
}

export { info, warn, error, debug };
