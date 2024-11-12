import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'; // Use sdk-trace-base here
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

// Initialize tracer provider
const tracerProvider = new WebTracerProvider();

// Exporter to send traces to Grafana Tempo
const exporter = new OTLPTraceExporter({ url: 'http://localhost:3200/v1/traces' });
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(exporter));
tracerProvider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

tracerProvider.register();

// Export tracer instance
export const tracer = tracerProvider.getTracer('todo-app');
