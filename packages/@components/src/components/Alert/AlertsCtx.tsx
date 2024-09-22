import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import isEqual from 'lodash.isequal';
import { Alert } from './Alert';
import { type AlertProps } from './Alert.types';

type AggregateAlertProps = { ttd?: number } & AlertProps;

interface AlertsCtxType {
  dispatchAlert: (alertConfiguration: AggregateAlertProps) => void;
}

const alertsContextDefaultState: AlertsCtxType = {
  dispatchAlert(alertConfiguration) {
    /** null implementation */
  }
};

const AlertsContext = createContext<AlertsCtxType>(alertsContextDefaultState);
const useAlertsCtx = () => useContext(AlertsContext);

interface AlertsCtxProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const alertsContextClassNames = {
  root: 'h-alerts-context-provider-root-mount'
} as const;

function AlertsCtxProvider({ children }: AlertsCtxProviderProps) {
  const [alerts, setAlerts] = useState<AggregateAlertProps[]>([]);

  useEffect(
    function () {
      if (alerts.length > 0) {
        const alert = alerts[0];
        const ttd = alert?.ttd || 7000;
        const timeout = setTimeout(function () {
          removeAlert(alert);
        }, ttd);
        return () => {
          clearTimeout(timeout);
        };
      }
    },
    [alerts]
  );

  const dispatchAlert = useCallback(
    (alertProps: AggregateAlertProps) => {
      let alertExists = false;
      for (const alertConfig of alerts) {
        if (isEqual(alertConfig, alertProps)) alertExists = true;
      }
      if (!alertExists) setAlerts((current) => [...current, alertProps]);
    },
    [alerts, setAlerts]
  );

  const removeAlert = useCallback(
    (alertConfig: AggregateAlertProps) => {
      const alert = alerts.find((existingAlertConfig) => isEqual(existingAlertConfig, alertConfig));
      if (alert) {
        setAlerts((existingAlerts) =>
          existingAlerts.filter((existingAlertConfig) => !isEqual(existingAlertConfig, alert))
        );
      }
    },
    [alerts, setAlerts]
  );

  const sortAlertProps = (alertConfig: AggregateAlertProps) => {
    const { message, severity, className, dismissable, id, onDismiss, role } = alertConfig;
    const props = {};
    Object.assign(props, {
      message,
      severity,
      className,
      id,
      dismissable,
      role
    });
    if (dismissable) {
      function aggregateOnDismiss() {
        removeAlert(alertConfig);
        if (typeof onDismiss !== 'undefined') {
          onDismiss();
        }
      }
      Object.assign(props, { onDismiss: aggregateOnDismiss });
    }
    return props as AlertProps;
  };

  return (
    <AlertsContext.Provider value={{ dispatchAlert }}>
      <span className={alertsContextClassNames.root}>
        {alerts.map((alertConfig) => (
          <Alert {...sortAlertProps(alertConfig)} />
        ))}
      </span>
      {children}
    </AlertsContext.Provider>
  );
}

export { AlertsCtxProvider, useAlertsCtx };
