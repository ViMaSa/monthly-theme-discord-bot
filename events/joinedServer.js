const { Events } = require('discord.js');

module.exports = {
  name: Events.GuildCreate,
  once: true,
  execute(guild) {
    const channelNames = ['general', 'welcome'];
    const channel = guild.channels.cache.find(ch => channelNames.includes(ch.name));

    // TODO: Create a mapping (yml file?) for this message
    if (channel) {
      channel.send(
        `
          Hello! My name is @${guild.client.user.username} and I hear that this server is going to hosting monthly themes! Luckily, I can take "snapshots" of participants by creating threads based on the month and year. This means that when I say "CHEESE", everyone should have their display name and avatars ready to be included in the thread!
        `,
      ).catch(console.error);
    }
  },
};
