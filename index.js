const im = require('gm').subClass({ imageMagick: true });
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();

const meme = im('meme.jpg');
const memeoutput = './meme-out.jpg'

bot.on('message', message => {
  var prefix = '!'
  var msg = message.content;
  var command = msg.split(' ');
  var cmd = command[0];
  var text = command.splice(1);
  var text = text.join(' ');
  var text = text.toUpperCase();

  if (cmd === prefix + 'swan') {
    meme
      .font('./impact.ttf')
      .out('-background', 'none')
      .out('-fill', 'black')
      .out('-interline-spacing', '-2')
      .out('-size', '300x180', `caption: ${text}`)
      .out('-geometry', '+80+310')
      .out('-composite')
      .write('meme-out.jpg', (err) => {
        err ? console.log(err) : message.channel.send('', { files: [ "./meme-out.jpg" ]}).catch(err => console.log('something broke', err));
      });
  }

});

bot.login(TOKEN);