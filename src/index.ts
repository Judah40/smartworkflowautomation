import express, { Request, Response } from "express";
import { authRoutes } from "./routes/auth.route";
import { professionalRoute } from "./routes/professionalProfile.route";
import { port } from "./config/default";
import cors from "cors";
import { verifyUserToken } from "./service/Auth/verifiyUserToken";

const app = express();

app.use(express.json());
app.use(cors({}));

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/professional-profile", verifyUserToken, professionalRoute);
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
