/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
const convertExpectedYieldToRub = require('../../../utils/convertExpectedYieldToRub')();

/*
Т.к. sort синхронный я не придумал ничего лучше, чем примиксовать к объекту поле valueInRub,
отсортировать по нему массив, а затем удалить это поле. Поле удалил, чтобы вернуть из этой функции объекты с таким же
набором полей, какие были переданы в эту функцию
*/
const sortPortfolioByYield = async (pos) => {
  const positions = pos.slice();

  for (const position of positions) {
    position.valueInRub = await convertExpectedYieldToRub(position.expectedYield);
  }

  positions.sort((a, b) => b.valueInRub - a.valueInRub);

  return positions.map((position) => {
    delete position.valueInRub;
    return position;
  });
};

module.exports = sortPortfolioByYield;
