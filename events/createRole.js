const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildCreate,
  once: true,
  execute(guild) {
    const roleExist = guild.roles.cache.find(r => r.name === 'Monthly Theme Bot - Participant');

    if (roleExist) {
      console.log('Role already exists!');
      return;
    }
    else {
      guild.roles.create(
        {
          name: 'Monthly Theme Bot - Participant',
          color: '#344236',
          reason: 'Participant for monthly themes',
          mentionable: true,
        },
      )
        .then(console.log)
        .catch(console.error);
    }
  },
};
