import os from 'node:os';
import path from 'node:path';

/**
 * 
 * @param {string} assetLocalPath 
 * @returns {string}
 */
export function getAbsPathToStaticAsset(assetLocalPath) {
    const delimiter = os.platform() === 'win32' ? '\\' : '/';
    const subpaths = assetLocalPath.split(delimiter);
    return path.resolve(process.cwd(), 'www', ...subpaths);
} 