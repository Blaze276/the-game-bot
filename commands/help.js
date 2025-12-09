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
                    { name: 'General', value: '?ip — Get the server IP\n?saveargument — Save the last 200 messages\n?say — Make the bot say something\n?rizz — secret\n?bottles — fun/random command' },
                    { name: 'Roles', value: '?promote — Give Knight role\n?demote — Remove Knight role\n?nobility — Give Noble role\n?denoble — Remove Noble role\n?welcome — Assign Peasant role' },
                    { name: 'Moderation', value: '?kick, ?ban, ?unban, ?purge, ?warn, ?delwarn, ?warnings, ?mute, ?unmute, ?lock, ?unlock' },
                    { name: 'Utilities', value: '?authorize — Get bot OAuth link\n?credits — Show credits\n?gdps — GDPS info\n?playlist — Official playlist\n?pack-god — Misc' },
                    { name: 'Support', value: '?patreon — Support on Patreon\n?kofi — Support on Ko-fi' },
                    { name: 'Admin (disabled)', value: '?system_integrity_check, ?system_runtime_check, ?massprune' },
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
