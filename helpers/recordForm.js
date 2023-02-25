const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const createRecordForm = async (interaction) => {
  const modal = new ModalBuilder()
    .setCustomId('record-form-modal')
    .setTitle('Monthly Theme Form');

  const introductionInput = new TextInputBuilder()
    .setCustomId('introductionInput')
    .setLabel('Introduction as your persona')
    .setStyle(TextInputStyle.Paragraph);

  const funFactInputArray = (arrSize) => {
    const textInputArr = new Array(arrSize);

    for (let i = 0; i < arrSize; i++) {
      textInputArr[i] = new TextInputBuilder()
        .setCustomId(`funFactInput${i}`)
        .setLabel(`Fun Fact #${i + 1}`)
        .setStyle(TextInputStyle.Short);
    }

    return textInputArr;
  };


  const firstActionRow = new ActionRowBuilder().addComponents(introductionInput);
  modal.addComponents(firstActionRow);

  const factArray = funFactInputArray(4);
  factArray.forEach(factInput => {
    const actionRowItem = new ActionRowBuilder().addComponents(factInput);
    modal.addComponents(actionRowItem);
  });

  await interaction.showModal(modal);
};

module.exports = {
  createRecordForm,
};
