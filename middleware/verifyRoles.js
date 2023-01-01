const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArr = [...allowedRoles];
    const result = req.roles
      .map((r) => rolesArr.includes(r))
      .find((v) => v === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
