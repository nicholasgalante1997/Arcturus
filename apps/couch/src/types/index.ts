import { type toStatic } from 'react-sleepy';

export * from './style';
export * from './pages';
export * from './locale';

export type SleepyPageConf = Parameters<typeof toStatic>[0];
