import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";

import {
  googleClientId,
  googleClientSecret,
  googleCallbackUrl,
  githubClientId,
  githubClientSecret,
  githubCallbackUrl,
} from "./default";
import {
  findOrCreateGoogleUser,
  findUserById,
} from "../service/Auth/googleAuth";
import { findOrCreateGithubUser } from "../service/Auth/githubAuth";
import { Profile as GitHubProfile } from "passport-github2";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackUrl,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await findOrCreateGoogleUser(profile);
        return done(null, {
          id: user.id,
          email: user.email,
        });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

//github strategy

interface GitHubUser {
  id: string;
  email?: string;
  [key: string]: any;
}

passport.use(
  new GitHubStrategy(
    {
      clientID: githubClientId,
      clientSecret: githubClientSecret,
      callbackURL: githubCallbackUrl,
      scope: ["user:email"],
    },
    async (
      _accessToken: string,
      _refreshToken: string,
      profile: GitHubProfile,
      done: (error: any, user?: GitHubUser | false) => void
    ) => {
      try {
        const user: GitHubUser = await findOrCreateGithubUser(profile);
        return done(null, {
          id: user.id,
          email: user.email,
        });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
