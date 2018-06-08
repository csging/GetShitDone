const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const sql = require('../models/user.js')
const keys = require('../config/keys.js')

passport.serializeUser((result, done) => {
    done(null, result[0].googleID);
})

passport.deserializeUser((id, done) => {
    sql.view(id).then((result) => {
        done(null, result)
    })
})

passport.use(
    new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile.id)
        console.log(profile.displayName)
        console.log(profile.emails[0].value)
        sql.view(profile.id).then((result) => {
            if (result.length < 1) {
                sql.insert(profile.id).then((result) => {
                    console.log('Added Record');
                }).then(
                    sql.view(profile.id).then((result) => {done(null, result)})
                );
            }
            else {
                done(null, result)
            }
        })
    }   
)
);