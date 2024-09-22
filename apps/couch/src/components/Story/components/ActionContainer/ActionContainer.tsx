import React, { memo } from 'react';

import { UilFileDownloadAlt, UilFileShareAlt } from '@iconscout/react-unicons';

import { useTranslation } from '@/contexts';
import { download } from '@/utils';

import { StoryClassNames } from '../../classnames';
import { type StoryProps } from '../../types';

const staticDownloadHref =
  'https://d1lrpeoasv2hi6.cloudfront.net/fe3a2415-3cf4-43db-9c96-7d09c0fbd4d7_CouchGag_Test.pdf';

function StoryActionContainer({}: Partial<StoryProps>): React.JSX.Element {
  const { t } = useTranslation();
  function handleDownload() {
    download(staticDownloadHref, 'CouchGag-Test.pdf');
  }
  return (
    <div className={StoryClassNames.ActionContainer}>
      <span role="button" className="story__icon-btn">
        <UilFileShareAlt fill="#FFF" size="24" />
      </span>
      <span role="button" className="story__icon-btn" data-color="green" onClick={handleDownload}>
        <UilFileDownloadAlt fill="#FFF" size="24" />
      </span>
    </div>
  );
}

export default memo(StoryActionContainer);
