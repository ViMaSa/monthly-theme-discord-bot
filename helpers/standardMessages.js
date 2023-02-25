const { reactionRole } = require('./reactionRole');

const acknowledgeCommand = async (interaction) => {
  await interaction.reply({
    content: 'Sending sign-up message!',
    ephemeral: true,
  });
};

const channelExistsMessage = async (interaction, channelObj) => {
  await interaction.reply({
    content: `${channelObj.name} already exists!`,
    ephemeral: true,
  });
};

const recordsThreadThemeMessage = async (channel, theme) => {
  channel.send({
    content: `Theme for the month: ${theme}`,
  });
};

const sendIntroductionMessage = async (channel) => {
  const collectorParams = {
    dispose: true,
    time: 60000,
  };

  const msg = await channel.send(
    `I'm **${channel.guild.client.user.username}** look at me! I hear that this server is going to hosting monthly themes! ` +
    'If you wish to participate, click the checkmark reaction emoji on this message and you will be a participant! ' +
    `This message will only be able to assign roles for the next ${collectorParams.time / 1000} seconds. ` +
    'Don\'t worry, this role can also be assigned later!',
  ).catch(console.error);
  msg.react('✅');

  await reactionRole(msg, collectorParams);
};

const sendSignUpMessage = async (interaction) => {
  const collectorParams = {
    dispose: true,
    time: 30000,
  };

  const msg = await interaction.channel.send(
    'React to this message using the ✅ emoji in the next ' +
    `${collectorParams.time / 1000} seconds and you will be assigned the participant role!`,
  ).catch(console.error);
  msg.react('✅');

  await reactionRole(msg, collectorParams);
};

module.exports = {
  acknowledgeCommand,
  channelExistsMessage,
  recordsThreadThemeMessage,
  sendIntroductionMessage,
  sendSignUpMessage,
};
