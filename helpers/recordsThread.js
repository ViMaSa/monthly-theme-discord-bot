const { recordsTxtChannel } = require('../initialObjects/initialChannels');
const { recordsThreadExists } = require('./validators/channelValidator');
const { channelExistsMessage } = require('./standardMessages');
const { createParticipantRecord } = require('./records');
const roles = require('../initialObjects/initialRoles');

const createCurrentThreadObj = () => {
  const threadObj = {};
  threadObj.name = `${getCurrentMonth()} ${getCurrentFullYear()}`;

  return threadObj;
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

const getParticipants = async (guild) => {
  const guildMembers = await guild.members.fetch();

  const validRoleId = String(guild
    .roles
    .cache
    .find(cachedRole => cachedRole.name === roles.participant.name)
    .id,
  );

  const participants = guildMembers.filter(participant => participant
    .roles
    .cache
    .some(pRole => pRole.id === validRoleId),
  );

  return participants;
};

const processParticipants = async (guild, participants, thread) => {
  participants.each(async participant => {
    const userId = String(participant.id);
    await guild.client.users.fetch(userId, { force: true });

    const embed = createParticipantRecord(participant);
    thread.send({ embeds: [embed] });
  });
};

const createRecordsThemeThread = async (interaction) => {
  const guild = interaction.guild;
  const parent = guild.channels.cache.find(cachedChan => {
    return cachedChan.name === recordsTxtChannel.name;
  });
  const parentId = String(parent.id);
  const newThread = createCurrentThreadObj();

  if (recordsThreadExists(guild, parentId, newThread)) {
    channelExistsMessage(interaction, newThread);
  }

  else {
    const participants = await getParticipants(guild);
    const thread = await parent.threads.create(newThread);

    processParticipants(guild, participants, thread);
  }
};

module.exports = {
  createRecordsThemeThread,
};
