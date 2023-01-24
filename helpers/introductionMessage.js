const sendIntroductionMsg = (channel) => {
  channel.send('testing').then(msg => {
    msg.react('✅');
  });
};

module.exports = {
  sendIntroductionMsg,
};
