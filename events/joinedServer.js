const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildCreate,
  once: true,
  execute(guild) {
    const channelNames = ['general', 'welcome'];
    const channel = guild.channels.cache.find(ch => channelNames.includes(ch.name));

    if (channel) {
      channel.send(
        `Hello, I'm **${guild.client.user.username}** and I hear that this server is going to hosting monthly themes! ` +
        'Luckily, I can take "snapshots" of participants by creating threads based on the month and year. ' +
        'After I take a snapshot, everyone should have their display name and avatars ready to be included in the thread!',
      ).catch(console.error);
    }
  },
};
