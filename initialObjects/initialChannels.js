const { ChannelType } = require('discord.js');

module.exports = {
  categoryChannel: {
    name: 'monthly-theme-category',
    type: ChannelType.GuildCategory,
    reason: 'Category for this bot to use',
  },

  textChannels: [
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
  ],
};
