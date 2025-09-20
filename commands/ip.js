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

       if (bedrock) { // The Bedrock IP is **soxthesigma.my.pebble.host** \nport **8135**\n there is also the \'le server method\'
            await interaction.reply('**This subcommand is disabled**');
       } else { // The IP is **soxthesigma.my.pebble.host** \nversion **1.16.5** or above
            await interaction.reply('**You should like ask if u want another server (im not paying for it tho)**');
        }
    }
};

module.exports = ipCommand;
