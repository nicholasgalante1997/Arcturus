const DEFAULT_PORT = 4040;

export function normalizePort(port) {
    if (typeof port === 'string') {
        const numericPort = parseInt(port, 10);
        if (isNaN(numericPort)) {
            return DEFAULT_PORT;
        } else {
            return numericPort
        }
    } else if (typeof port === 'number') {
        return port;
    }

    throw new Error('NonNumericPortException')
}

