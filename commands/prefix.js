const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Gets the bots prefix'),
    async execute(interaction) {
        await interaction.reply('The prefix for this bot is **?**. Use this prefix to run commands.');
    },
};
