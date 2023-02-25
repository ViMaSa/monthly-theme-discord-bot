const InitializeRoles = async (guildRoles, roleCollection) => {
  for (const role of roleCollection) {
    const foundRole = guildRoles
      .cache
      .some(cachedRole => cachedRole.name === role.name);

    if (!foundRole) {
      await guildRoles.create(role).catch(console.error);
    }
    else {
      console.log(`Role: ${role.name} already exists!`);
    }
  }
};

module.exports = {
  InitializeRoles,
};
