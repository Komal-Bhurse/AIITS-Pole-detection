import express from "express";
const router = express.Router();
import Plot from "../models/plot.js"

router.post('/', async (req, res) => {
  const { name, boundary } = req.body;
  const plot = new Plot({ name, boundary });
  await plot.save();
  res.json(plot);
});

router.get('/', async (req, res) => {
  const plots = await Plot.find();
  res.json(plots);
});

export default router;
