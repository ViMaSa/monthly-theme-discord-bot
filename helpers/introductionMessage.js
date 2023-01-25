const { participant } = require('../initialObjects/initialRoles');

const sendIntroductionMsg = async (channel) => {
  const msg = await channel.send('testing');
  msg.react('✅');

  const reactionFilter = (reaction) => reaction.emoji.name === '✅';

  const collector = await msg.createReactionCollector({
    dispose: true,
    filter: reactionFilter,
    time: 60000,
  });

  collector.on('collect', async (reaction, member) => {
    if (member.id !== process.env.CLIENT_ID && reaction.emoji.name === '✅') {
      const roleAssign = await reaction.message.guild.roles.cache.find(role => role.name === participant.name);
      await reaction.message.guild.members.cache.get(member.id).roles.add(roleAssign);
      console.log('success ' + member.id);
    }
  });

  collector.on('remove', async (reaction, member) => {
    if (member.id !== process.env.CLIENT_ID && reaction.emoji.name === '✅') {
      const roleRemoved = await reaction.message.guild.roles.cache.find(role => role.name === participant.name);
      await reaction.message.guild.members.cache.get(member.id).roles.remove(roleRemoved);
      console.log('removing role');
    }
  });

  collector.on('end', () => {
    console.log('Stopped listening!');
  });
};

module.exports = {
  sendIntroductionMsg,
};
