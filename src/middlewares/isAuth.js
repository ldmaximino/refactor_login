import { __dirname } from "../utils.js";

export const isAuth = (req, res, next) => {
  if (req.session.passport && req.session.passport.user) {
    if (req.isAuthenticated()) return next();
  }
  return res.render(__dirname + "/views/user_not_auth");
};
