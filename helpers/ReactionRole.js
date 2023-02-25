const { participant } = require('../initialObjects/initialRoles');

const getMember = (reaction, memberId) => {
  return reaction
    .message
    .guild
    .members
    .cache
    .get(memberId);
};

const getParticipantRole = (reaction) => {
  return reaction
    .message
    .guild
    .roles
    .cache
    .find(role => role.name === participant.name);
};

const verifiedMessage = (memberId, emojiName) => {
  return memberId !== process.env.CLIENT_ID && emojiName === '✅' ? true : false;
};

const reactionRole = async (message, collectorParams) => {
  const collector = await message.createReactionCollector(collectorParams);

  collector.on('collect', async (reaction, member) => {
    if (verifiedMessage(member.id, reaction.emoji.name)) {
      try {
        const roleAssigned = getParticipantRole(reaction);

        await getMember(reaction, member.id).roles.add(roleAssigned);
      }
      catch (error) {
        console.log(error);
        collector.stop();
      }
    }
  });

  collector.on('remove', async (reaction, member) => {
    if (verifiedMessage(member.id, reaction.emoji.name)) {
      try {
        const roleRemoved = getParticipantRole(reaction);

        await getMember(reaction, member.id).roles.remove(roleRemoved);
      }
      catch (error) {
        console.log(error);
        collector.stop();
      }
    }
  });

  collector.on('end', async () => {
    await message.reply('Participant sign up has been closed!');
    console.log('Collector stopped listening!');
  });
};

module.exports = {
  reactionRole,
};

