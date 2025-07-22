import express, { Request, Response } from "express";
import { authRoutes } from "./routes/auth.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register routes
app.use("/api/auth", authRoutes);

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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
