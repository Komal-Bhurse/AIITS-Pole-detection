import mongoose from "mongoose";

const plotSchema = new mongoose.Schema({
  name: {type:String},
  boundary: [[Number]],  // [ [lat, lng], [lat, lng], ... ]
});

const Plot = mongoose.model('Plot', plotSchema);
export default Plot