import React, { memo } from 'react';

import { UilBooks, UilInfoCircle, UilEstate } from '@iconscout/react-unicons';

import { combine } from '@/hocs';
import { to } from '@/utils';

import { AsideClassnames } from './classnames';

function AsideComponent(): React.JSX.Element {
  return (
    <div className={AsideClassnames.Container}>
      <div className={AsideClassnames.SeasonContainer}>
        <span
          onClick={() => {
            to('/');
          }}
          className="pointer scale-on-hover"
          role="button"
          tabIndex={1}
        >
          <UilEstate fill="#fff" size="24" />
        </span>
        <span
          className={AsideClassnames.Badge}
          role="button"
          onClick={() => {
            to('/browse.html');
          }}
        >
          <UilBooks fill="#fff" size="24" />
        </span>
        <span
          className={AsideClassnames.Badge}
          role="button"
          onClick={() => {
            to('/about.html');
          }}
        >
          <UilInfoCircle fill="#fff" size="24" />
        </span>
      </div>
    </div>
  );
}

export const Aside = combine<{}>([], memo(AsideComponent), 'Couch-Aside-Component');
Aside.displayName = 'Couch__AsideComponent';
