const { Events } = require('discord.js');
const { InitializeChannels } = require('../helpers/InitializeChannels');
const { InitializeRoles } = require('../helpers/InitializeRoles');
const InitialChannels = require('../initialObjects/initialChannels');
const InitialRoles = require('../initialObjects/initialRoles');

module.exports = {
  name: Events.GuildCreate,
  once: true,
  execute(guild) {
    InitializeRoles(guild.roles, Object.values(InitialRoles));
    InitializeChannels(guild.channels, Object.values(InitialChannels));
  },
};
