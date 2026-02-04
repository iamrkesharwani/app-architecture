import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`
      Server Initialization!
      Port: ${PORT}
      Environment: ${app.get('env')}
      Time: ${new Date().toLocaleString()}
    `);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Error: Port ${PORT} already in use`);
    process.exit(1);
  } else {
    console.error('Server error:', error);
  }
});

const shutdown = (signal) => {
  console.log(`Received ${signal}. Starting graceful shutdown.`);
  server.close(() => {
    console.log('Server closed. No longer accepting requests.');
    console.log('Resources cleaned up.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Forced shutdown initiated.');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
