const { recordsTxtChannel } = require('../initialObjects/initialChannels');
const roles = require('../initialObjects/initialRoles');

const getParticipants = async (guild) => {
  const guildMembers = await guild.members.fetch();

  const validRoleId = String(guild
    .roles
    .cache
    .find(cachedRole => cachedRole.name === roles.participant.name)
    .id,
  );

  const participants = await guildMembers.filter(participant => participant
    .roles
    .cache
    .some(pRole => pRole.id === validRoleId),
  );

  return participants;
};

/*
  Thread creation needs a few properties:
    name:
    autoArchiveDuration:
    reason:
    type: GUILD_PUBLIC_THREAD
    parent: <channel>
    parentId: <channelId>
    unarchivable:
    viewable: true
*/
const createRecordsThemeThread = async (guild) => {
  const parent = guild.channels.cache.find(cachedChan => cachedChan.name === recordsTxtChannel.name);

  const participants = await getParticipants(guild);

  const thread = await parent.threads.create({
    name: 'February 2023',
    reason: 'New monthly theme channel created',
  });

  participants.each(async participant => {
    await thread.send(participant.displayAvatarURL());
  });
};

module.exports = {
  createRecordsThemeThread,
};
