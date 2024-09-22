import type storyJson from '@/contexts/data/writ.json';

export type StoryMetadata = (typeof storyJson.metadata)[number];
