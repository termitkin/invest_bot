const currentDate = () => {
  const d = new Date();
  const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
  const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
  const seconds = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
  const year = d.getFullYear();

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

module.exports = currentDate;
