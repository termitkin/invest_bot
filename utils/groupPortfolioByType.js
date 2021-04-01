/* eslint-disable comma-dangle */
// eslint-disable-next-line arrow-body-style
const groupPortfolioByType = (positions) => {
  return positions.reduce(
    (acc, curr) => {
      if (curr.instrumentType === 'Stock') {
        acc.stocks.push(curr);
      } else if (curr.instrumentType === 'Bond') {
        acc.bonds.push(curr);
      } else if (curr.instrumentType === 'Etf') {
        acc.etfs.push(curr);
      } else if (curr.instrumentType === 'Currency') {
        acc.currencies.push(curr);
      }
      return acc;
    },
    { stocks: [], etfs: [], bonds: [], currencies: [] }
  );
};

module.exports = groupPortfolioByType;
