/** @format */

const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://www.example.com/auth/google/callback",
		},
		function (accessToken, refreshToken, profile, cb) {
			User.findOrCreate({ googleId: profile.id }, function (err, user) {
				return cb(err, user);
			});
		}
	)
);

//616080543725-lcggbakpfv97mg7amh6khbrl7k9k7dfs.apps.googleusercontent.com

//thTwMuq0I0vcAG5ZjoG_9nEg
