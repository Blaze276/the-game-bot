const { SlashCommandBuilder } = require('@discordjs/builders');

const ipCommand = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Get server IP address')
        .addStringOption(option =>
            option
                .setName('bedrock')
                .setDescription('Gets the bedrock server IP address (add any value to the option!)')
                .setRequired(false)
        ),
    async execute(interaction) {
        const bedrock = interaction.options.getString('bedrock');

       if (bedrock) {
            await interaction.reply('The Bedrock IP is **soxthesigma.my.pebble.host** \nport **8135**\n there is also the \'le server method\'');
       } else {
            await interaction.reply('The IP is **soxthesigma.my.pebble.host** \nversion **1.16.5** or above');
        }
    
};

module.exports = ipCommand;
