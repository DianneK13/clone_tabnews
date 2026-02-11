import bcryptjs from "bcryptjs";

function getPepper() {
  return process.env.POSTGRES_PEPPER;
}

async function hash(password) {
  const rounds = getNumberOfRounds();
  const pepper = getPepper();
  return await bcryptjs.hash(password + pepper, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  const pepper = getPepper();
  return await bcryptjs.compare(providedPassword + pepper, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;

