
const resizeRule = (width, height, size) => {
    let resizedWidth = 800;
    let resizedHeight = 800;
    if ((width / height) > 1) {
        // landscape rule
        const widthScale = width / 800;
        resizedWidth = height / widthScale;
    } else {
        // portrait rule
        const heightScale = height / 800;
        resizedHeight = width / heightScale;
    }
    return {
        x: resizedHeight - 367,
        y: resizedWidth - 89
    };
};

module.exports = resizeRule;
