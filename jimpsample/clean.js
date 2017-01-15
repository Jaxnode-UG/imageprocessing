const fs = require('fs');

var filesProcessed = 0;

fs.stat('../output/', (err, results) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log(err.error);
        } else {
            console.log('Second error condition');
        }
    } else {
        removeOutput();
    }
});

function removeOutput() {
    fs.readdir('../output/', (err, files) => {
        console.log(files);
        files.forEach((f, index, array) => {
            fs.unlink('../output/' + f, (err, result) => {
                if (err) console.error(err);
                filesProcessed++;
                if (filesProcessed === array.length) {
                    setTimeout(folderContentsDeleted, 100);
                }
            });
        });
    });
}


function folderContentsDeleted() {
    fs.rmdir('../output', (err, result) => {
        if (err) console.error(err);
        //console.log(result);
    });
}

fs.readdir('./', (err, files) => {
    const list = files.filter(f => f.substr(-4) === '.png' || f.substr(-4) === '.jpg');
    const exludedList = list.filter(f => f !== 'lenna.png' && f !== 'dice.png');
    exludedList.forEach(i => {
        fs.unlink(i, (err) => {
            console.error(err);
        });
    });
});