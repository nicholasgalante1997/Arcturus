import React from 'react';
import { mount } from '@/utils/mount';
import { type StoryProps } from '@/components';
import { StoryPage } from '@/pages';

const props = (window as any)?.__sleepy_props__?._data;
mount<StoryProps & { key?: string }>(StoryPage, props);
