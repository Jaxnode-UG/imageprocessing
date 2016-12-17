/*
 * This script just composits the dice image onto the lenna image.
 * Apache-2.0 License
 * Copyright 2017, David Fekke <david@fekke.com>
 */

const Jimp = require('jimp');

var lenna = new Jimp("lenna.png", function (err) {
    var dice = new Jimp("dice.png", function (err) {
        const x = lenna.bitmap.width - ((dice.bitmap.width / 2) + 10);
        const y = lenna.bitmap.height - ((dice.bitmap.height / 2) + 10);
        lenna.clone().composite(dice.clone().scale(0.5), x, y)
            .write("./lenna-composite.png");
    });
});
