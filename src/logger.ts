// src/logger.js
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);

export const logInfo = (message: string) => {
  diag.info(message);
};

export const logError = (message: string) => {
  diag.error(message);
};
