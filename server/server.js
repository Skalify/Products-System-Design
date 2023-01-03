const cluster = require('node:cluster');
const http = require('node:http');
const { cpus } = require('node:os');
const process = require('node:process');

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} running`);

  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const app = require('./index.js');
  app.listen(app.get('port'), () => {
    console.log(`Worker ${process.pid} running on http://localhost:${app.get('port')}`);
  });
}