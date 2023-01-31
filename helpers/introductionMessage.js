const { ReactionRole } = require('./ReactionRole');

const sendIntroductionMsg = async (channel) => {
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

  await ReactionRole(msg, collectorParams);
};

module.exports = {
  sendIntroductionMsg,
};
