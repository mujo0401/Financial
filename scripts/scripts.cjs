const chokidar = require('chokidar');
const { exec } = require('child_process');

// Initialize file watcher
const watcher = chokidar.watch('path/to/your/files', { persistent: true });

// Define the restart function
function restartServers() {
  console.log('Changes detected. Restarting servers...');

  // Restart the frontend server
  exec('cmd /c frontend.bat', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }
    console.log(`Frontend Server Output: ${stdout}`);
  });

  // Restart the MongoDB server
  exec('cmd /c Start_MongoDB_Server.bat', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${err}`);
      return;
    }
    console.log(`MongoDB Server Output: ${stdout}`);
  });
}

// Add event listeners
watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => {
    console.log(`File ${path} has been changed`);
    restartServers();
  })
  .on('unlink', path => console.log(`File ${path} has been removed`));

console.log('Watching for file changes...');
