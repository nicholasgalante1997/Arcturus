import { pico } from '@supra-dev/pico';

console.log('Running theme/bootstrap.js');

const { init } = pico({ theme: 'jade' });

init();

console.log('Finished theme/bootstrap.js');
