const { SlashCommandBuilder } = require('discord.js');
const { sendRecordForm } = require('../helpers/records');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('snapshot-form')
    .setDescription(
      'Send message for users to submit their snapshot for the month',
    ),

  async execute(interaction) {
    await sendRecordForm(interaction);
  },
};
