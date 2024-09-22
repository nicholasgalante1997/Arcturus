import React, { memo, useEffect } from 'react';
import { combine } from '@/hocs';
import { FourZeroOneComponentClassNames } from './classnames';
import { logger } from '@/utils/logger';

interface ErrorCodeProps {
  code: number;
  error?: string;
  id?: string;
}

function ErrorCodeComponent({ code, id, error }: ErrorCodeProps): React.JSX.Element | React.ReactNode {
  useEffect(() => {
    /** Set the window hash to indicate an error has occurred */
    window.location.hash = 'UnauthorizedAttemptToViewContent';
    logger.warn(`${id ?? 'AnonymousComponent'} redirected to an ErrorCode route.`);
    if (error) {
      logger.warn(error);
    }

    return () => {
      window.location.hash = '';
    };
  }, []);
  return (
    <div className={FourZeroOneComponentClassNames.Wrapper}>
      <div className={FourZeroOneComponentClassNames.ContentBox}>
        <span className={FourZeroOneComponentClassNames.ErrorCode}>{code}</span>
        <div className={FourZeroOneComponentClassNames.VerticalLine} />
        <span className={FourZeroOneComponentClassNames.ScriptedText}>
          {"We hope you find what you're looking for, but it likely won't be here."}
        </span>
      </div>
    </div>
  );
}

export const ErrorCode = combine<ErrorCodeProps>(
  [],
  memo(ErrorCodeComponent),
  '401-unauthorized-exception-component'
);
ErrorCode.displayName = 'Couch__ErrorCodeComponent';
