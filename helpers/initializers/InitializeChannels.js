const { sendIntroductionMessage } = require('../standardMessages');

const InitializeChannels = async (guildChannels, channelCollection) => {

  for (const channel of channelCollection) {
    const foundChannel = guildChannels
      .cache
      .some(cachedChannel => cachedChannel.name === channel.name);

    if (!foundChannel) {
      const channelCreated = await guildChannels.create(channel).catch(console.error);

      setParent(channelCreated, guildChannels);
      introMessage(channelCreated);
    }
    else {
      console.log(`${channel.name} already exists!`);
    }
  }
};

const introMessage = (channel) => {
  if (channel.name === 'monthly-theme-general') {
    sendIntroductionMessage(channel);
  }
};

const setParent = (channel, guildChannels) => {
  if (channel.type !== 4) {
    const parent = guildChannels
      .cache
      .find(cachedChannel => cachedChannel.name === 'monthly-theme-category');

    channel.setParent(String(parent.id), { lockPermissions: false });
  }
};

module.exports = {
  InitializeChannels,
};
