import React from 'react';
import { type Meta, type StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { AlertsCtxProvider, useAlertsCtx } from './AlertsCtx';
import { Button } from '../Button';

const meta: Meta<typeof Alert> = {
  title: 'Alert',
  component: Alert
};

export default meta;

export const Info: StoryObj<typeof Alert> = {
  args: {
    dismissable: false,
    severity: 'info',
    message: {
      heading: 'Join our Discord!',
      body: 'Visit the link attached here to join our discord community. You can receive access to early release tech merchandise.'
    }
  },
  render: (args) => <Alert {...args} />
};

export const Warning: StoryObj<typeof Alert> = {
  args: {
    dismissable: false,
    severity: 'warning',
    message: {
      heading: 'Warning! Beta Feature',
      body: 'This feature is experimental and subject to change with further updates.'
    }
  },
  render: (args) => <Alert {...args} />
};

export const Error: StoryObj<typeof Alert> = {
  args: {
    dismissable: false,
    severity: 'error',
    message: {
      heading: 'Unable To Sign Up',
      body: 'A user with this email address already exists.'
    }
  },
  render: (args) => <Alert {...args} />
};

export const Success: StoryObj<typeof Alert> = {
  args: {
    dismissable: false,
    severity: 'success',
    message: {
      heading: 'Nice! Story Submitted',
      body: 'Check your email for a confirmation that we have received your submission.'
    }
  },
  render: (args) => <Alert {...args} />
};

// Alerts Context Example

function AlertsCtxExample() {
  return (
    <AlertsCtxProvider>
      <AlertsCtxButton />
    </AlertsCtxProvider>
  );
}

function AlertsCtxButton() {
  const { dispatchAlert } = useAlertsCtx();
  function onClick() {
    dispatchAlert({
      message: {
        heading: 'Critical Error',
        body: `You have ${Math.ceil(Math.random() * 60)} seconds to disengage.`
      },
      severity: 'error',
      ttd: 300000,
      dismissable: true
    });
  }
  return (
    <Button style={{ position: 'absolute', bottom: 24 }} onClick={onClick}>
      Dispatch New Alert
    </Button>
  );
}

export const AlertsCtxMain: StoryObj = {
  render: () => <AlertsCtxExample />
};
