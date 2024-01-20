const certificateMethods = () => {
  const data = {};

  const insert = (key, value) => {
    data[key] = value;
  };

  const get = (key) => data[key];

  return { insert, get };
};

module.exports = certificateMethods;
