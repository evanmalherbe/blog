// Import bcrypt
const bcrypt = require("bcryptjs");

// Learned to use bcrypt here:
// https://heynode.com/blog/2020-04/salt-and-hash-passwords-bcrypt/

async function HashPassword(password) {
  const saltRounds = 10;
  let hashedPwd;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    hashedPwd = hash;
    console.log("Hash is " + hash);
  });

  return hashedPwd;
}

export default HashPassword;
