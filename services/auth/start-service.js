// services/auth/start-service.js
import { fileURLToPath } from 'url';
import path from 'path';
import cluster from 'cluster';
import os from 'os';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the service name from the directory name
const serviceName = path.basename(__dirname);

// Use all available CPUs in production, 1 in development
const numCPUs = process.env.NODE_ENV === 'production' ? os.cpus().length : 1;

if (cluster.isPrimary) {
  console.log(`🚀 Starting ${serviceName} service (${numCPUs} workers)`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Worker process
  try {
    // Import the main service file using the correct path
    const servicePath = new URL('./src/index.js', import.meta.url).pathname;
    const { default: startService } = await import(servicePath);
    
    if (typeof startService === 'function') {
      await startService();
    } else {
      console.error(`❌ ${serviceName} service must export a default function`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Failed to start ${serviceName}:`, error);
    process.exit(1);
  }
}