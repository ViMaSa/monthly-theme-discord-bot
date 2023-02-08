const { SlashCommandBuilder } = require('discord.js');

const checkChannel = (interaction) => {
  return interaction.channel.name === 'monthly-theme-general';
};

const checkUserRole = (interaction) => {
  const role = interaction
    .guild
    .roles
    .cache
    .find(cachedRole => cachedRole.name === 'Monthly Theme - Participant');

  return role.members.some(member => member.user.id === interaction.user.id);
};

const snapshotReplies = async (interaction, user) => {
  const userHasRole = checkUserRole(interaction);
  const correctChannel = checkChannel(interaction);
  const replyObj = {
    content: '',
    ephemeral: false,
  };

  if (userHasRole && correctChannel) {
    replyObj.content = `${user.displayName} \n ${user.displayAvatarURL()}`;
  }
  else {
    replyObj.ephemeral = true;

    if (!userHasRole) {
      replyObj.content =
        `${user.displayName} does not have the proper role assigned for this command! `;
    }

    if (!correctChannel) {
      replyObj.content +=
        'This command can only be used in the __**monthly-theme-general**__ text chat under the __**Monthly-Theme-Category**__!';
    }
  }

  await interaction.reply(replyObj);
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('snapshot')
    .setDescription('Select a member and return information')
    .addUserOption(option =>
      option
        .setName('member')
        .setDescription('The member to get information')),

  execute(interaction) {
    const user = interaction.options.getMember('member');

    snapshotReplies(interaction, user);
  },
};
