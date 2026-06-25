module.exports = function (name) {
  return name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
};
