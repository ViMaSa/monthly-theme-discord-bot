const { SlashCommandBuilder } = require('discord.js');

// TODO: snapshot not complete, just tesing how to get member information for later
module.exports = {
  data: new SlashCommandBuilder()
    .setName('snapshot')
    .setDescription('Select a member and return information')
    .addUserOption(option =>
      option
        .setName('member')
        .setDescription('The member to get information')),

  async execute(interaction) {
    const user = interaction.options.getMember('member');

    await interaction.reply(`${user.displayName} \n ${user.displayAvatarURL()} `);
  },
};
