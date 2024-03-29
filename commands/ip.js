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
            await interaction.reply('The Bedrock IP is **192.99.83.136** \nport **8188**');
        } else {
            await interaction.reply('The Java IP is **purpursmp.my.pebble.host** \nversion **1.17.1**');
        }
    }
};

module.exports = ipCommand;