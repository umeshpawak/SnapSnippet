const express = require("express");
const cors = require("cors");
const snippetRoutes = require("./routes/snippet.route");

const app = express();

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json({ limit: "1mb" }));

// Routes
app.use("/api/snippets", snippetRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "QuickShare API is running" });
});

module.exports = app;
