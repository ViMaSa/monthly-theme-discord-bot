const { Events } = require('discord.js');
const {
  textChannels,
  categoryChannel,
} = require('../initialObjects/initialChannels');
const {
  InitializeChannels,
  InitializeCategory,
} = require('../helpers/InitializeChannels');

module.exports = {
  name: Events.GuildCreate,
  once: true,
  async execute(guild) {

    const categoryId = await InitializeCategory(guild.channels, categoryChannel);

    await InitializeChannels(guild.channels, textChannels, categoryId);
  },
};
