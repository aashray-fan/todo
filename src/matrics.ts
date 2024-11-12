// src/metrics.js
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { Resource } from '@opentelemetry/resources';

// Set up the exporter for Grafana (make sure the URL matches your OTEL collector config)
const metricExporter = new OTLPMetricExporter({
  url: 'http://localhost:4318/v1/metrics', // Update this if your OTEL collector is running on a different URL
});

// Set up the MeterProvider with periodic exporting
const meterProvider = new MeterProvider({
  resource: new Resource({
    'service.name': 'todo-app', // Name your service
  }),
});

// Add a reader to export metrics every 60 seconds
const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 60000, // Set export interval in milliseconds
});

meterProvider.addMetricReader(metricReader);

// Export a meter instance for the app to use
export const meter = meterProvider.getMeter('todo-app-meter');
