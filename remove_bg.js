const jimpPackage = require('jimp');
const Jimp = jimpPackage.Jimp || jimpPackage;

async function removeBackground() {
  try {
    const imagePath = process.argv[2];
    console.log("Processing image:", imagePath);
    const image = await Jimp.read(imagePath);
    
    // We want a smooth transition for pixels near white
    const threshold = 220;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      const avg = (red + green + blue) / 3;
      
      if (avg >= threshold) {
        if (avg >= 245) {
            this.bitmap.data[idx + 3] = 0;
        } else {
            const alpha = Math.floor(255 * (245 - avg) / (245 - threshold));
            this.bitmap.data[idx + 3] = alpha;
        }
      }
    });

    image.write(imagePath, () => {
      console.log("Background removed successfully!");
    });
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

removeBackground();
