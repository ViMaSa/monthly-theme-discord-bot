const { EmbedBuilder } = require('discord.js');

const getMemberEmbed = (participant) => {
  const participantEmbed = new EmbedBuilder();

  participantEmbed.setColor(0x0099FF);
  participantEmbed.setTitle(participant.displayName);
  participantEmbed.setDescription('I\'m back on my bs. Coming for the throne.');
  if (participant.user.displayAvatarURL()) {
    participantEmbed.setThumbnail(participant.displayAvatarURL());
  }
  participantEmbed.setFields(
    { name: 'Introduction', value: 'Zuko here. I uhh am not really good at this...' },
    { name: 'Fact 1:', value: 'Chased the avatar.' },
    { name: 'Fact 2:', value: 'Restored my honor.' },
    { name: 'Fact 3:', value: 'Danced with dragons.' },
    { name: 'Fact 4:', value: 'Pulled a baddie.' },
  );
  if (participant.user.bannerURL()) {
    participantEmbed.setImage(participant.user.bannerURL());
  }
  participantEmbed.setTimestamp();
  participantEmbed.setFooter({ text: 'Powered by Monthly Theme Bot' });

  return participantEmbed;
};

module.exports = {
  getMemberEmbed,
};
