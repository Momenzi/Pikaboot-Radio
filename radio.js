/*
═══════════════════════════════════════════════════════════════════════════════════════
                      ____  _ _         _                 _
                    |  _ \(_) | ____ _| |__   ___   ___ | |_ 
                    | |_) | | |/ / _` | '_ \ / _ \ / _ \| __|
                    |  __/| |   < (_| | |_) | (_) | (_) | |_  
                    |_|   |_|_|\_\__,_|_.__/ \___/ \___/ \__| 
═══════════════════════════════════════════════════════════════════════════════════════
*/
const Discord = require("discord.js");
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const config = require("./config.json")

client.on("ready", () => {
    reloadradiobot(client);
    client.user.setActivity("🎶 Cool Radio 🎶", { type: "PLAYING" });
    console.log(`${client.user.username} ready!`);
});

client.on(`message`, async (message) => {
    const voiceChannel = client.guilds.cache.get(config.guildid).channels.cache.get(config.voicechannel);
    if(message.member.hasPermission("ADMINISTRATOR")){
    if(message.content.startsWith(`++naxiradio`)) // Naxi radio
    {
        try{
            await voiceChannel.leave();
            await delay(300);
        }catch{
    }
       
        var connection = await voiceChannel.join();
        await connection.voice.setSelfDeaf(true); await connection.voice.setDeaf(true);
        const dispatcher = connection.play('http://naxi128.streaming.rs:9150'); // pa bebo ti radis o.o
        client.user.setActivity("🎶 Naxi Radio 🎶", { type: "PLAYING" });
        dispatcher.on("end", end => { reloadradiobot() });
    }
    if(message.content.startsWith(`++coolradio`)) // Cool radio
    {
        try{
            await voiceChannel.leave();
            await delay(300);
        }catch{
       }
       
        var connection = await voiceChannel.join();
        await connection.voice.setSelfDeaf(true); await connection.voice.setDeaf(true);
        const dispatcher = connection.play('https://live.coolradio.rs/cool128'); // pa i ti bebo radis o.o
        client.user.setActivity("🎶 Cool Radio 🎶", { type: "PLAYING" });
        dispatcher.on("end", end => { reloadradiobot() });
    }
    if(message.content.startsWith(`++bnradio`)) // BN radio
    {
        try{
            await voiceChannel.leave();
            await delay(300);
        }catch{
       }
       
        var connection = await voiceChannel.join();
        await connection.voice.setSelfDeaf(true); await connection.voice.setDeaf(true);
        const dispatcher = connection.play('http://stream.rtvbn.com:8522'); // pa i ti bebo radis o.o
        client.user.setActivity("🎶 BN Radio 🎶", { type: "PLAYING" });
        dispatcher.on("end", end => { reloadradiobot() });
    }
    }
});
client.on('voiceStateUpdate', async (oldState, newState) => {
    try {
        if (newState.channel.id === config.voicechannel) {
            if (newState.channel.members.size > 2) return;
            if (newState.member.id === client.user.id) return;
            if (newState.member.user.bot) return
            reloadradiobot();
        }
    }
    catch {
    }
});
// Pika pika ?!
client.login(config.token);

// Default
async function reloadradiobot() {
    const voiceChannel = client.guilds.cache.get(config.guildid).channels.cache.get(config.voicechannel);
   try{
        await voiceChannel.leave();
        await delay(300);
   }catch{
   }
   
    var connection = await voiceChannel.join();
    await connection.voice.setSelfDeaf(true); await connection.voice.setDeaf(true);
    const dispatcher = connection.play('https://live.coolradio.rs/cool128'); // pa bebo ti radis o.o
    dispatcher.on("end", end => { reloadradiobot() }); // mislis ?
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

