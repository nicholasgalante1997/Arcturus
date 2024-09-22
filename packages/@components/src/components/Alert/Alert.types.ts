export interface AlertProps {
  severity: Severity;
  message: {
    heading: string;
    body: string;
  };
  dismissable?: boolean;
  onDismiss?: () => void;
  className?: string;
  id?: string;
  role?: string;
  [x: string]: any;
}

type Severity = 'info' | 'warning' | 'error' | 'success';
