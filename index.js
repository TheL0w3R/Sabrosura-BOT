var Discord = require('discord.js');
var bot = new Discord.Client();
var isReady = true;
const fs = require('fs');

bot.on('debug', console.log)

bot.on('message', message => {
    if (isReady && message.content === 'sabrosura') {
        isReady = false;
        var voiceChannel = message.member.voice.channel;
        if (voiceChannel !== null && voiceChannel !== undefined) {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.play(fs.createReadStream('./media/sabrosura_short.opus'), { type: 'ogg/opus' });
                dispatcher.on("finish", () => {
                    voiceChannel.leave();
                });
            }).catch(err => console.log(err));
        }
        isReady = true;
    }
});


bot.login(process.env.SABROSURA_TOKEN);