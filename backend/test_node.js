const fs = require('fs');
fs.writeFileSync('test_out.txt', 'Script started\n');
try {
    console.log('Logging to console');
    fs.appendFileSync('test_out.txt', 'Console log attempted\n');
} catch (e) {
    fs.appendFileSync('test_out.txt', 'Error: ' + e.message + '\n');
}
process.exit(0);
