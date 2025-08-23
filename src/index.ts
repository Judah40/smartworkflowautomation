import express, { NextFunction, Request, Response } from "express";
import { authRoutes } from "./routes/auth.route";
import { professionalRoute } from "./routes/professionalProfile.route";
import { port } from "./config/default";
import cors from "cors";
import { verifyUserToken } from "./service/Auth/verifiyUserToken";
import { requireAuthenticatedUser } from "./middleware/authMiddleware";
import { socialRoute } from "./routes/socialLinks.route";
import "./config/passport";
const app = express();
import session from "express-session";
import passport from "./config/passport";
app.use(
  session({
    secret: "supersecret", // put in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true if HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
// Parse JSON safely
app.use(express.json({ limit: "10mb" })); // add a limit to avoid DOS attacks
// ✅ Handle invalid JSON parsing errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON format. Please check your request body.",
    });
  }
  next(err);
});

app.use(
  cors({
    origin: "*", // allow all origins
  })
);

// ✅ Ensure body is never undefined for POST/PUT/PATCH
app.use((req: Request, res: Response, next: NextFunction) => {
  if (["POST", "PUT", "PATCH"].includes(req.method) && req.body === undefined) {
    req.body = {}; // fallback to empty object
  }
  next();
});

// Register routes
app.use("/api/auth", authRoutes);
app.use(
  "/api/professional-profile",
  requireAuthenticatedUser,
  professionalRoute
);
app.use("/api/socials", requireAuthenticatedUser, socialRoute);
// Default test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Smart Workflow Automation Hub!");
});

// 404 Handler – Must be *after* all other routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    status: 404,
  });
});

// Start the server – Always the last thing
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
