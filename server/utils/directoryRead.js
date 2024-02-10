const path = require('path');
const fs = require('fs');

async function readDirectory(dir) {
    const directoryPath = path.join(__dirname, dir);
    const fileArray = [];

    console.log('directoryPath', directoryPath);

    return new Promise((resolve, reject) => {
        try {
            fs.readdir(directoryPath, (err, files) => {
                if (err) {
                    console.error(err);
                    return;
                }

                files.forEach((file) => {
                    fileArray.push(file);
                });

                resolve(fileArray.join(','));
            });
        } catch (err) {
            console.error('Error reading directory', err);
            reject(err);
        }
    });
}

module.exports = readDirectory;
