import { type StoryMetadata } from '@/types/story/metadata';

export type ContentWidgetComponentProps = {
  shadingDirection: 'r' | 'l';
  backgroundColor: string;
  foregroundColor: string;
  supportingTheme: 'light' | 'dark';
  likes?: number;
} & StoryMetadata;
