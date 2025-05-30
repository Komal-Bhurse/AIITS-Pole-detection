import express from "express";
import helmet from 'helmet';
import path from "path";

import connectDB from "./db-connection.js";

import plotRoutes from "./routes/plots.js"
import poleRoutes from "./routes/poles.js"

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// middlewares
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "https: data:"]
      }
    })
  );

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.resolve("./", 'frontend', 'dist')));

app.use('/api/plots', plotRoutes);
app.use('/api/poles', poleRoutes);

// Frontend route
app.get("/", (req, res) => {
    res.sendFile(path.resolve("./", 'frontend', 'dist', 'index.html'));
});

app.get("/draw-plot", (req, res) => {
  res.sendFile(path.resolve("./", 'frontend', 'dist', 'index.html'));
});
app.get("/add-pole", (req, res) => {
  res.sendFile(path.resolve("./", 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(` Server Running on port ${PORT}`);
});