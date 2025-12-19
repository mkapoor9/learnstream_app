// services/start-all.js
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const services = [
  { name: 'Auth', path: 'auth', port: 4001 },
  { name: 'User', path: 'user', port: 4002 },
  { name: 'Course', path: 'course', port: 4003 },
  { name: 'Content', path: 'content', port: 4004 },
  { name: 'Activity', path: 'activity', port: 4005 },
  { name: 'Notification', path: 'notification', port: 4006 },
  { name: 'Gateway', path: 'gateway', port: 4000 }
];

async function startService(service) {
  const servicePath = path.join(__dirname, service.path);
  console.log(`Starting ${service.name} service...`);
  console.log('Service path:', servicePath);

  try {
    // For Windows, use the /d flag to change drive if needed
    const command = `cd /d "${servicePath}" && npm start`;
    console.log('Executing command:', command);

    const child = exec(command, {
      shell: true,
      env: {
        ...process.env,
        PORT: service.port,
        NODE_ENV: 'development',
        FORCE_COLOR: '1'  // Force colors in the output
      },
      windowsHide: true
    });

    // Log stdout and stderr in real-time
    child.stdout.on('data', (data) => {
      console.log(`[${service.name} stdout] ${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`[${service.name} stderr] ${data}`);
    });

    // Return a promise that resolves when the process exits
    return new Promise((resolve) => {
      child.on('exit', (code) => {
        if (code === 0) {
          console.log(`${service.name} service started successfully`);
          resolve();
        } else {
          console.error(`${service.name} service failed with code ${code}`);
          resolve(); // Resolve anyway to continue with other services
        }
      });
    });
  } catch (error) {
    console.error(`Failed to start ${service.name}:`, error.message);
  }
}

async function startAllServices() {
  console.log('🚀 Starting all LearnStream services...\n');
  console.log('Current working directory:', process.cwd());
  
  try {
    // Start services sequentially to avoid port conflicts
    for (const service of services) {
      console.log(`\n--- Starting ${service.name} ---`);
      await startService(service);
      // Add a small delay between starting services
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n✨ All services started!');
    console.log('🌐 Gateway: http://localhost:4000');
    console.log('📊 Service Status:');
    services.forEach(service => {
      console.log(`   ${service.name.padEnd(15)} http://localhost:${service.port}/health`);
    });
  } catch (error) {
    console.error('Error in startAllServices:', error);
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping all services...');
  process.exit(0);
});

startAllServices().catch(console.error);