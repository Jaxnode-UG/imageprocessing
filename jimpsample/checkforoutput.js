// This script checks for an output folder.
const fs = require('fs');

const checkForOutputFolder = () => {
    if (!fs.existsSync('../output')) {
        fs.mkdirSync('../output');
    }
};

module.exports = checkForOutputFolder;
