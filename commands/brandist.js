const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
const randomImages = [
  "./cdn/brandist_art.jpg",
  "./cdn/brandist_hoodie_black.jpg",
  "./cdn/brandist_hoodie_blue.jpg",
  "./cdn/brandist_hoodie_pink.jpg",
  "./cdn/brandist_jumpers_all.jpg",
  "./cdn/brandist_mixer_light_blue_and_pink.jpg"
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("brandist")
    .setDescription("The Game Bot's Proud Sponsor"),
  async execute(interaction) {
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    const attachment = new MessageAttachment(randomImage);
    await interaction.reply({
      content: `**You know the type.\nBrandist.** \n[Check out Brandist!](https://www.instagram.com/_brandist_/)`,
      files: [attachment] 
    });
  }
};
