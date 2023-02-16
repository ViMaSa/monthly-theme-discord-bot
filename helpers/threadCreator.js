const { recordsTxtChannel } = require('../initialObjects/initialChannels');
const { getMemberEmbed } = require('../helpers/embedCreator');
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

const getCurrentMonth = () => {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date();
  return month[date.getMonth()];
};

const getCurrentFullYear = () => {
  return new Date().getFullYear();
};

const createRecordsThemeThread = async (guild) => {
  const threadObj = {};
  threadObj.name = `${getCurrentMonth()} ${getCurrentFullYear()}`;
  const parent = guild.channels.cache.find(cachedChan => cachedChan.name === recordsTxtChannel.name);

  const participants = await getParticipants(guild);

  const thread = await parent.threads.create(threadObj);

  participants.each(async participant => {
    const userId = String(participant.id);
    await guild.client.users.fetch(userId, { force: true });
    const embed = getMemberEmbed(participant);
    thread.send({ embeds: [embed] });
  });
};

module.exports = {
  createRecordsThemeThread,
};
