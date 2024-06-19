import * as services from "../services/user_services.js";

export const registerResponse = (req, res, next) => {
  try {
    return res.redirect("/user_registered");
  } catch (error) {
    next(error);
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user)
      id = req.session.passport.user;
    const user = await services.getUserById(id);
    const dataUser = {
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    };
    if (!user) return res.redirect("/user_login_error");
    return res.redirect("/products");
  } catch (error) {
    next(error);
  }
};
