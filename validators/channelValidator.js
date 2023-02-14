const channels = require('../initialObjects/initialChannels');

const themeGeneralValidation = (interaction) => {
  const channelName = channels.generalTxtChannel.name;
  return interaction.channel.name === channelName;
};

const themeRecordsValidation = (interaction) => {
  const channelName = channels.recordsTxtChannel.name;
  return interaction.channel.name === channelName;
};

module.exports = {
  themeGeneralValidation,
  themeRecordsValidation,
};
