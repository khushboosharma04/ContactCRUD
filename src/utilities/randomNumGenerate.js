const crypto = require("crypto");

function getRandomInt(min, max) {
  const randomBytes = crypto.randomBytes(4);
  const randomValue = randomBytes.readUInt32LE(0);
  return Math.floor((randomValue / 0xffffffff) * (max - min + 1) + min);
}

module.exports = getRandomInt;
