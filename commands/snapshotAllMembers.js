const { SlashCommandBuilder } = require('discord.js');
const { createRecordsThemeThread } = require('../helpers/recordsThread');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('snapshot-all-members')
    .setDescription('Snapshot of all participants'),

  async execute(interaction) {
    await createRecordsThemeThread(interaction);
  },
};
