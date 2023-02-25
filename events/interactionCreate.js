const { Events } = require('discord.js');
const { createRecordForm } = require('../helpers/recordForm');

const buttonInteraction = (interaction) => {
  if (!interaction.isButton()) return;
  createRecordForm(interaction);
};

const chatInputCommandInteraction = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  }
  catch (error) {
    console.log(`Error executing ${interaction.commandName}`);
    console.log(error);
  }
};

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    buttonInteraction(interaction);
    chatInputCommandInteraction(interaction);
  },
};
