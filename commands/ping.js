const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the game bot's ping!"),
  async execute(interaction) {
    try {
      const ping = Date.now() - interaction.createdTimestamp;
      await interaction.reply(`Bot's ping is **${ping}ms**`);
    } catch (error) {
      console.error("Error replying to ping command:", error); // Log any errors
    }
  }
};

