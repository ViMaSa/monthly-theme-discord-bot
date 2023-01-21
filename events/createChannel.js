const { Events, ChannelType } = require('discord.js');

module.exports = {
  name: Events.GuildCreate,
  once: true,
  async execute(guild) {
    const categoryChannel = {
      name: 'monthly-theme-category',
      type: ChannelType.GuildCategory,
      reason: 'Category for this bot to use',
    };

    const textChannels = [
      {
        name: 'monthly-theme-general',
        type: ChannelType.GuildText,
        reason: 'General Text chat for Monthly Theme Bot Commands',
      },
      {
        name: 'monthly-theme-records',
        type: ChannelType.GuildText,
        reason: 'Text channel for history threads',
      },
    ];

    const foundCategory = guild.channels.cache.some(cachedChannel => cachedChannel.name === categoryChannel.name);
    let categoryId;

    if (!foundCategory) {
      const category = await guild.channels.create(categoryChannel);
      categoryId = String(category.id);
    }
    else {
      console.log(`${categoryChannel.name} already exists!`);
    }

    for (const channel of textChannels) {
      const foundChannel = guild.channels.cache.some(cachedChannel => cachedChannel.name === channel.name);

      if (!foundChannel) {
        const textChannel = await guild.channels.create(channel);
        textChannel.setParent(categoryId, { lockPermissions: false });
      }
      else {
        console.log(`${channel.name} already exists!`);
      }
    }
  },
};
