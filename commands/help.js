const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a menu of commands'),
    async execute(interaction) {
        const embed = new MessageEmbed()
        .setColor('#095de3')
        .setTitle('The Game Bot commands')
        .setDescription('a list of commands included with The Game Bot')
        .addFields(
          { name: '?ip', value: 'Gets The Minecraft Server IP address'},
          { name: '?help', value: 'Shows this menu'},
          { name: '?promote', value: 'Promotes a user to the moderators'},
          { name: '?adminify', value: 'same as promote but administrator role'},
          { name: '?say', value: 'Makes the bot say something'},
          { name: '?kick', value: 'Kicks a user from the server'},
          { name: '?ban', value: 'Bans a user from the server'},
          { name: '?unban', value: 'Unbans a user from the server'},
          { name: '?purge', value: 'Deletes a certain amount of messages from the channel'},
          { name: '?sigma', value: 'secret command (hint: september 9th)'},
          { name: '?kofi', value: 'Support us on Ko-fi!'},
          { name: '?patreon', value: 'Support us on Patreon!'},
          { name: '?credits', value: 'Shows the credits for the bot'},
          { name: '?gdps', value: 'Gets the PowershotGDPS Download link and info'},
          { name: '?warn', value: 'Warns a user'},
          { name: '?delwarn', value: 'Deletes warnings from a user'},
          { name: '?warnings', value: 'Shows the warnings of a user'},
          { name: '?mute', value: 'Mutes a user'},
          { name: '?unmute', value: 'Unmutes a user'},
          { name: '?lock', value: 'Locks a channel'},
          { name: '?unlock', value: 'Unlocks a channel'},
          { name: 'Coming Soon!', value: 'More commands will be added soon. Keep an eye out!'}
        )
        .setThumbnail('https://cdn.discordapp.com/avatars/1145327542723686451/e4c781dee18a7f1146e53c45f0c3350c.png?size=4096')
        .setAuthor({ name: 'The Game Bot', iconURL: 'https://cdn.discordapp.com/avatars/1145327542723686451/e4c781dee18a7f1146e53c45f0c3350c.png?size=4096'})
        .setTimestamp()

        await interaction.reply({ embeds: [embed] });
    },
};
