const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res.status(404).json({ message: "Username or Password required" });
  const foundUser = usersDB.users.find((u) => u.username === user);
  if (!foundUser) return res.sendStatus(401);
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) res.json({ success: `User ${user} logged in` });
  else res.sendStatus(401);
};

module.exports = handleLogin;
