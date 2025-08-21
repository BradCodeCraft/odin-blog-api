import { PrismaClient } from "../../generated/prisma/client.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Passport } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

const passport = new Passport();
const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        return done(null, false, { message: "Invalid username!" });
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return done(null, false, { message: "Invalid password!" });
      }

      return done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            id: jwt_payload.sub,
          },
        });

        if (!user) {
          done(null, false);
        } else {
          done(null, user);
        }
      } catch (error) {
        done(error);
      }
    },
  ),
);

export default passport;
