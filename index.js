const Discord = require("discord.js");
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "MESSAGE_CONTENT"],
    partials: ["CHANNEL", "MESSAGE"]
});

const token = "MTE0NTMyNzU0MjcyMzY4NjQ1MQ.GKFKTi.bZJkdaFyBCKHThMAzUS1xLAQeC0SOfDdy6PYmY";
const prefix = "?";

const statusMessages = [
    'The Minecraft OST',
    'The Roblox OST',
    'The COD OST',
    'The Terraria OST',
    'The Geometry Dash OST',
    'The BTD6 OST',
    'The Fortnite OST',
    'The Hitman III OST',

];

client.on('ready', async () => {
    console.log(`Received HELLO. Running ${client.user.username}`);

    const randomIndex = Math.floor(Math.random() * statusMessages.length);
    const status = statusMessages[randomIndex];

    client.user.setPresence({
        status: 'online',
        activities: [{
            name: status,
            type: 'LISTENING'
        }]
    });
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ip') {
        message.channel.send("The IP is **purpursmp.my.pebble.host** \nversion **1.17.1**");

    } else if (command === 'help') {
    
        const embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('The Game Bot commands')
          .setDescription('a list of commands included with The Game Bot')
          .addFields(
            { name: '?ip', value: 'Gets The Minecraft Server IP address'},
            { name: '?help', value: 'Shows this menu'},
            { name: 'Coming Soon!', value: 'More commands will be added soon. Keep an eye out!'}
          )
          .setThumbnail('https://cdn.discordapp.com/avatars/1145327542723686451/b7d10e6d9a87ab39e1e2f2ca6a8bc663.png?size=4096')
          .setAuthor({ name: 'The Game Bot', iconURL: 'https://cdn.discordapp.com/avatars/1145327542723686451/b7d10e6d9a87ab39e1e2f2ca6a8bc663.png?size=4096'})
          .setTimestamp()
    
        message.channel.send({ embeds: [embed] });

    }
});

client.login(token);
