const channels = require('../../initialObjects/initialChannels');

const themeGeneralValidation = (interaction) => {
  const channelName = channels.generalTxtChannel.name;
  return interaction.channel.name === channelName;
};

const themeRecordsValidation = (interaction) => {
  const channelName = channels.recordsTxtChannel.name;
  return interaction.channel.name === channelName;
};

const recordsThreadExists = (guild, parentId, threadObj) => {
  const recordsThreads = guild.channels.cache.filter(cachedChannel => {
    return cachedChannel.type === 11 && cachedChannel.parentId === parentId;
  });

  return recordsThreads.some(thread => thread.name === threadObj.name);
};

module.exports = {
  recordsThreadExists,
  themeGeneralValidation,
  themeRecordsValidation,
};
