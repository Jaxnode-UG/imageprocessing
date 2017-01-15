const fs = require('fs');

// See if the output folder exists
fs.stat('../output/', (err, results) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('No Output folder to delete.')
        } else {
            console.error(err);
        }
    } else {
        removeFolderContentsAsync('../output/')
            .then((d) => folderContentsDeleted(d))
            .catch(e => console.error(e));
    }
});

// Delete contents of folder and return a promise once done.
function removeFolderContentsAsync(folder) {
    return new Promise(function(resolve, reject) {
        fs.readdir(folder, (err, files) => {
            files.forEach((f, index, array) => {
                fs.unlink(folder + f, (err, result) => {
                    if (err !== null) return reject(err);
                    resolve(folder);
                });
            });
        });
    });
}

// Delete folder after contents removed
function folderContentsDeleted(folder) {
    fs.rmdir(folder, (err, result) => {
        if (err) console.error(err);
        console.log(`${folder} folder was deleted successfully!`);
    });
}

// Delete individual files
fs.readdir('./', (err, files) => {
    const list = files.filter(f => f.substr(-4) === '.png' || f.substr(-4) === '.jpg');
    const exludedList = list.filter(f => f !== 'lenna.png' && f !== 'dice.png');
    exludedList.forEach(i => {
        fs.unlink(i, (err) => {
            if (err) console.error(err);
        });
    });
});