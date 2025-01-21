import { Command } from 'commander';

import { seed } from '../src';

const program = new Command();

program
    .name('scripts')
    .description('Project Arcturus scripts\nJust like lil shit to make our lives easier.')
    .version('0.0.0-alpha.22');


program
    .command('seed:pg')
    .description('Seed the pg database')
    .action(seed);

