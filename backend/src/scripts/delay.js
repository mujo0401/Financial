const delay = time => new Promise(resolve => setTimeout(resolve, time));

delay(3000).then(() => process.exit(0)); // Delay for 3000 milliseconds (3 seconds)
