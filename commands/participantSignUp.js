const { SlashCommandBuilder } = require('discord.js');
const { acknowledgeCommand, sendSignUpMessage } = require('../helpers/standardMessages');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('participant-sign-up')
    .setDescription(
      'Send message to allow users to sign up to be a Monthly Theme Participant by reacting',
    ),

  async execute(interaction) {
    await acknowledgeCommand(interaction);
    await sendSignUpMessage(interaction);
  },
};
