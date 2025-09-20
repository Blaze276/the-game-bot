const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageFlags } = require('discord.js');  // Use EmbedBuilder instead of MessageEmbed
const icon1 = 'https://cdn.discordapp.com/avatars/1145327542723686451/f672cf67c0c14674c0596f4e30315519.png?size=4096';
const accentColour1 = 0x478c4e;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a menu of commands'),
    async execute(interaction) {
        const embed = new EmbedBuilder()  // Use EmbedBuilder instead of MessageEmbed
        .setColor(accentColour1)
        .setTitle('The Game Bot commands')
        .setDescription('a list of commands included with The Game Bot')
        .addFields(
          { name: '?ip', value: 'Gets The Minecraft Server IP address (use /ip for better results)' },
          { name: '?savearguement', value: 'Saves the last 200 msgs, a truly legendary OG command.(**We love you bobot!!!**)'},
          { name: '?promote', value: 'Promotes a user to the knights' },
          { name: '?nobility', value: 'same as promote but for Nobles' },
          { name: '?say', value: 'Makes the bot say something' },
          { name: '?kick', value: 'Kicks a user from the server' },
          { name: '?ban', value: 'Bans a user from the server' },
          { name: '?unban', value: 'Unbans a user from the server' },
          { name: '?purge', value: 'Deletes a certain amount of messages from the channel' },
          { name: '?sigma', value: 'secret command (hint: september 9th)' },
          { name: '?credits', value: 'Shows the credits for the bot' },
          { name: '?gdps', value: 'Gets the GDPS Download link and info' },
          { name: '?warn', value: 'Warns a user' },
          { name: '?delwarn', value: 'Deletes warnings from a user' },
          { name: '?warnings', value: 'Shows the warnings of a user' },
          { name: '?mute', value: 'Mutes a user' },
          { name: '?unmute', value: 'Unmutes a user' },
          { name: '?lock', value: 'Locks a channel' },
          { name: '?unlock', value: 'Unlocks a channel' },
          { name: '?rizz', value: 'secret' },
          { name: '?placholder', value: '// do things' },
          { name: '?bottles', value: 'insert description here' },
          { name: 'Coming Soon!', value: 'More commands will be added soon. Keep an eye out!' }
        )
        .setThumbnail(icon1)
        .setAuthor({ name: 'The Game Bot', iconURL: icon1 })
        .setTimestamp();

        await interaction.reply({ 
            embeds: [embed], 
            flags: MessageFlags.Ephemeral // Use flags instead of ephemeral
        });
    },
};
