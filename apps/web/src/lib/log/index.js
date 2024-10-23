const LOGGER_NAME = 'project-arcturus-srerver-logger';
const NODE_PROCESS_LOG_LEVEL_KEY = '__ARCTURUS_NODE_LOG_LEVEL__';
const LOG_TO_INT_MAP = new Map([
  ['info', 1],
  ['warn', 2],
  ['error', 3],
  ['debug', 1]
]);

function shouldLog(level) {
  const LOG_LEVEL = process.env[NODE_PROCESS_LOG_LEVEL_KEY] || 'debug';
  const processLevel = LOG_LEVEL;
  const processLevelInt = LOG_TO_INT_MAP.get(processLevel);
  const levelInt = LOG_TO_INT_MAP.get(level);
  if (processLevelInt >= levelInt) return true;
  return false;
}

const formatJson = (msg, level) => ({ name: LOGGER_NAME, timestamp: Date.now(), level, data: msg });
const formatPretty = (msg, level) => `[${new Date().toISOString()}] ${level.toUpperCase()} (${LOGGER_NAME}): ${typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg}`;

function handleErrorLogEvent(msg) {
  console.error('An error was thrown');
  console.error('(ERROR Name): ' + msg?.name);
  console.error('(ERROR message): ' + msg?.message);
  console.error('(ERROR cause): ' + msg?.cause);
  console.error('(ERROR stack): ' + msg?.stack);
}

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
  if (msg instanceof Error) {
    handleErrorLogEvent(msg);
    return
  };

  handleLogEvent(msg, level, format);
};

const debug = (msg, format = 'json') => {
  const level = 'debug';
  handleLogEvent(msg, level, format);
};

export { info, warn, error, debug };
