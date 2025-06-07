import express from "express";
import * as turf from "@turf/turf"
const router = express.Router();
import Pole from "../models/pole.js"
import Plot from "../models/plot.js"

router.post('/', async (req, res) => {
  const { lat, lng, } = req.body;

  const point = turf.point([lng, lat]);
    const plots = await Plot.find();

    let matchedPlotId = null;

    for (const plot of plots) {
      const rawCoords = plot.boundary;
    
  
      let coordinates = rawCoords.map(([lat, lng]) => [lng, lat]);
    
    
      if (
        coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
        coordinates[0][1] !== coordinates[coordinates.length - 1][1]
      ) {
        coordinates.push(coordinates[0]);
      }
    
      const polygon = turf.polygon([coordinates]);
    
      if (turf.booleanPointInPolygon(point, polygon)) {
        matchedPlotId = plot._id.toString();
        break;
      }
    }
    

    const newPole = new Pole({
      lat,
      lng,
      insidePlot: !!matchedPlotId,
      plotId: matchedPlotId
    });

    await newPole.save();

    res.json(newPole);
});

router.get('/', async (req, res) => {
  const poles = await Pole.find();
  res.json(poles);
});

export default router;
