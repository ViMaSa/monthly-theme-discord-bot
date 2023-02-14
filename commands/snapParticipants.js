const { SlashCommandBuilder } = require('discord.js');
// const { adminValidation } = require('../validators/roleValidator');
const { createRecordsThemeThread } = require('../helpers/threadCreator');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('snapall')
    .setDescription('Snapshot of all participants'),

  async execute(interaction) {
    await createRecordsThemeThread(interaction.guild);
  },
};
