const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const logger = require('../../logger');

module.exports = {
  userLogin: async (req, res) => {
    const { email, pwd } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        logger.warn('Suspicious activity detected'); // User not found
        req.flash("error", "User not found");
        return res.redirect("/login");
      }

      const isMatch = await bcrypt.compare(pwd, user.password);

      if (!isMatch) {
        logger.warn('Suspicious activity detected'); // Wrong password
        req.flash("error", "Invalid credentials");
        return res.redirect("/login");
      }

      logger.info('User logged in'); // Successful login
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });

    } catch (err) {
      console.error(err);
      req.flash("error", "Something went wrong");
      return res.redirect("/login");
    }
  }
};
