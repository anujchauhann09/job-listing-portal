const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();


const GoogleStrategy = require("passport-google-oauth20").Strategy;
const prisma = require("../config/prisma");
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              googleId: profile.id,
              authType: "GOOGLE",
              roleId: 2, // USER role
              profile: {
                create: {
                  fullName: profile.displayName,
                  avatar: profile.photos[0].value
                }
              }
            }
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);



router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const accessToken = jwt.sign(
      { userId: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: req.user.id },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // store refresh token
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: req.user.id
      }
    });

    res.json({
      message: "Google login successful",
      accessToken,
      refreshToken,
      user: req.user
    });
  }
);

module.exports = router;
