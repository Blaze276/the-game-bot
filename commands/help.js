const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, MessageFlags } = require('discord.js');  // Use EmbedBuilder instead of MessageEmbed
const icon1 = 'https://cdn.discordapp.com/avatars/1145327542723686451/c81cd4803640b61f39028766df13e433.png?size=4096';
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
          { name: '?demote', value: 'Demotes a user from their rank' },
          { name: '?denoble', value: 'Demotes a user from Nobles' },
          { name: '?authorize', value: 'gets the authorization link for a bot' },
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
          { name: '?system_integrity_check', value: '(disabled)' },
          { name: '?system_runtime_check', value: '(disabled)' },
          { name: '?playlist', value: 'Listen to the official playlist' },
          { name: '?patreon', value: 'Support us on Patreon!' },
          { name: '?kofi', value: 'Support us on Ko-fi!' },
          { name: '?massprune', value: 'Prunes users from the server (disabled)' },
          { name: '?pack-god', value: 'Ai' },
          { name: '?welcome', value: 'Sets up the welcome system' },
          { name: 'Coming Soon!', value: 'More commands will be added soon. Keep an eye out!' }
        )
        .setThumbnail(icon1)
        .setAuthor({ name: 'Pacific National NR Class', iconURL: icon1 })
        .setTimestamp();

        await interaction.reply({ 
            embeds: [embed], 
            flags: MessageFlags.Ephemeral // Use flags instead of ephemeral
        });
    },
};
