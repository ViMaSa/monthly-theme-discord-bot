const { Events } = require('discord.js');
const { InitializeRoles } = require('../helpers/InitializeRoles');
const { participantRoles } = require('../initialObjects/initialRoles');

module.exports = {
  name: Events.GuildCreate,
  once: true,
  execute(guild) {
    InitializeRoles(guild.roles, participantRoles);
  },
};
