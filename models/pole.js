import mongoose from "mongoose";

const poleSchema = new mongoose.Schema({
  lat: {type:Number},
  lng: {type:Number},
  insidePlot: {type:Boolean},
  plotId: {type:String},
  detectedAt: { type: Date, default: Date.now }
});

const Pole = mongoose.model('Pole', poleSchema);
export default Pole
