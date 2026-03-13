const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function compress() {
  const files = await glob('**/*.{jpg,jpeg,JPG,JPEG,png,PNG}', {
    ignore: ['node_modules/**']
  });
  for (const file of files) {
    const stat = fs.statSync(file);
    const sizeBefore = (stat.size / 1024).toFixed(0);
    if (stat.size < 200 * 1024) {
      console.log(`SKIP  ${file} (${sizeBefore}KB — already small)`);
      continue;
    }
    const ext = path.extname(file).toLowerCase();
    const tmp = file + '.tmp';
    try {
      if (ext === '.png') {
        await sharp(file).png({ quality: 80 }).toFile(tmp);
      } else {
        await sharp(file).jpeg({ quality: 80, mozjpeg: true }).toFile(tmp);
      }
      const sizeAfter = (fs.statSync(tmp).size / 1024).toFixed(0);
      fs.renameSync(tmp, file);
      console.log(`OK    ${file}  ${sizeBefore}KB → ${sizeAfter}KB`);
    } catch (e) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      console.error(`FAIL  ${file}: ${e.message}`);
    }
  }
}
compress();
