let counter = 0;

const generateUniqueId = () => {
  return `${++counter}_${new Date().getTime()}`;
};

module.exports = { generateUniqueId };
