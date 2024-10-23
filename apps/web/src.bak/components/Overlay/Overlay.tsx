import React, { memo, useState, useRef } from 'react';
import { Input, Link } from '@project-arcturus/components';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function Overlay() {
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const overlayRef = useRef<HTMLElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: overlayRef });

  const onMouseLeave = contextSafe(() => {
    gsap.to('.series-description-container', { opacity: 0, duration: 0.5 });
    setActiveSeries(null);
  });

  const onMouseEnter: React.MouseEventHandler<HTMLAnchorElement> = contextSafe((event) => {
    gsap.to('.series-description-container', { opacity: 1, duration: 0.5 });
    setActiveSeries(event.currentTarget.dataset?.series || null);
  });

  return (
    <section className="overlay" ref={overlayRef}>
      <div className="overlay-actions">
        <div className="search-container">
          <Input placeholder="Browse Stories..." className="fira-sans-light" />
        </div>
      </div>
      <div className="series-container">
        <h1 className="fira-sans-semibold">The <b><i>Babel</i></b> Series</h1>
        <div className="series-root-container">
          <div className="series-links-container">
            <Link
              data-series="canon"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              href="/canon"
              target="_self"
              className="fira-sans-medium">
              Canon <i>From Under The Couch Series</i>
            </Link>
            <Link
              data-series="babel"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              href="/babel"
              target="_self"
              className="fira-sans-medium">
              The Babel Series
            </Link>
            <Link
              data-series="blackberry-octane"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              href="/blackberry-octane"
              target="_self"
              className="fira-sans-medium">
              The Blackberry Octane Series
            </Link>
            <Link
              data-series="colored-glass-vantage"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              href="/"
              target="_self"
              className="fira-sans-medium">
              The Colored Glass Vantage Series
            </Link>
          </div>

          <div ref={descriptionRef} className="series-description-container">
            <p className="fira-sans-medium">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Sit tristique integer sem et
              accumsan nullam potenti iaculis cras. Finibus facilisi arcu dapibus urna sapien. Ipsum
              facilisi orci ante laoreet rutrum magna, mi molestie. Bibendum hac fames; aenean
              praesent at scelerisque. Suspendisse sociosqu dolor suspendisse sagittis a. Integer
              habitant ut egestas ut mauris interdum pulvinar feugiat. Accumsan semper venenatis
              scelerisque lectus morbi torquent. Vehicula aptent blandit conubia volutpat maximus
              semper lobortis senectus. Felis velit aliquet eget massa elit ut habitasse lorem
              integer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Overlay);
