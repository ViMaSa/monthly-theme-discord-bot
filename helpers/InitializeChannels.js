const { sendIntroductionMsg } = require('./introductionMessage');

const InitializeCategory = async (guildChannels, categoryChannel) => {
  const foundCategory = guildChannels.cache
    .some(cachedChannel => cachedChannel.name === categoryChannel.name);

  if (!foundCategory) {
    const channel = await guildChannels.create(categoryChannel).catch(console.error);
    return String(channel.id);
  }
  else {
    const category = await guildChannels.cache
      .find(cachedChannel => cachedChannel.name === categoryChannel.name);

    console.log(`Category: ${categoryChannel.name} already exists!`);
    return String(category.id);
  }
};

const InitializeChannels = async (guildChannels, channelCollection, categoryId) => {
  for (const channel of channelCollection) {
    const foundChannel = guildChannels.cache
      .some(cachedChannel => cachedChannel.name === channel.name);

    if (!foundChannel) {
      const textChannel = await guildChannels
        .create(channel)
        .catch(console.error);

      textChannel.setParent(categoryId, { lockPermissions: false });

      if (textChannel.name === 'monthly-theme-general') {
        sendIntroductionMsg(textChannel);
      }
    }

    else {
      console.log(`Channel: ${channel.name} already exists!`);
    }
  }
};

module.exports = {
  InitializeChannels,
  InitializeCategory,
};
