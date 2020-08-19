var args = process.argv.slice(2);
const text = args[0].toUpperCase();
const im = require('gm').subClass({ imageMagick: true });

const meme = im('meme.jpg');

meme
  .font('./impact.ttf')
  .fontSize(26)
  .out('-background', 'none')
  .out('-fill', 'black')
  .out('-interline-spacing', '-2')
  .out('-size', '300x', `caption: ${text}`)
  .out('-geometry', '+80+310')
  .out('-composite')
  .write('meme-out.jpg', (err) => {
    if (err) {
      console.log(err);
    }
  });
