const im = require("gm").subClass({ imageMagick: true });
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const meme = im("meme.jpg");

const memeify = async (text, channel) =>
  new Promise((resolve) => {
    meme
      .font("./impact.ttf")
      .out("-background", "none")
      .out("-fill", "black")
      .out("-interline-spacing", "-2")
      .out("-size", "300x180", `caption: ${text}`)
      .out("-geometry", "+80+310")
      .out("-composite")
      .write("meme-out.jpg", (err) => {
        err
          ? console.log(err)
          : channel
              .send("", { files: ["./meme-out.jpg"] })
              .catch((err) => console.log("something broke", err));
        resolve();
      });
  });

const debouncedMeme = async (text, channel) => {
  let timeoutId;

  return () => {
    if (timeoutId) {
      channel.send(
        "Woah! Chill out. Please wait at least 30 seconds since the last swannining."
      );
    } else {
      timeoutId = setTimeout(async () => {
        await memeify(text, channel);
        clearTimeout(timeoutId);
      }, 30 * 1000);
    }
  };
};

bot.on("message", (message) => {
  const prefix = "!";
  const command = message.content.split(" ");
  const [cmd, ...text] = command;
  const imageText = text.join(" ").toUpperCase();

  if (cmd === `${prefix}swan`) {
    debouncedMeme(imageText, message.channel);
  } else if (cmd === `swan${prefix}`) {
    message.channel.send("Did you mean to use `!swan`?");
  }
});

bot.login(TOKEN);
