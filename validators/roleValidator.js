const roles = require('../initialObjects/initialRoles');

const participantValidation = (interaction) => {
  const roleName = roles.participant.name;
  const role = interaction.guild.roles.cache.find(cachedRole => cachedRole.name === roleName);

  return role.members.some(member => member.user.id === interaction.user.id);
};

const adminValidation = (interaction) => {
  const roleName = roles.monthlyThemeAdmin.name;
  const role = interaction.guild.roles.cache.find(cachedRole => cachedRole.name === roleName);

  return role.members.some(member => member.user.id === interaction.user.id);
};

module.exports = {
  participantValidation,
  adminValidation,
};
