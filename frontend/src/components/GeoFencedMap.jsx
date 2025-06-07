import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';


import PlotDrawer from './PlotDrawer';
import AddPole from './AddPole';


const insideIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  iconSize: [32, 32],
});

const outsideIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [32, 32],
});
    

export default function GeoFencedMap({ mapName = "" }) {

  const [toogle1, setToogle1] = useState(false)
  const [toogle2, setToogle2] = useState(false)

  const [plots, setPlots] = useState([]);

  const [poles, setPoles] = useState([]);

  console.log("plots", plots)
  console.log("poles", poles)

    const handleNewPlot = async (boundary) => {
    const name = prompt("Enter plot name:");
    const res = await axios.post('/api/plots', { name, boundary });
    setToogle1(!toogle1)
  };

  const handleAddPole = async (pole) => {
    console.log("pole", pole)
    const res = await axios.post('/api/poles', pole);
    setToogle2(!toogle2)

  };

  const getPlots = async () => {
    const res = await axios.get('/api/plots');
    setPlots(res.data);
  }

  const getPoles = async () => {
    const res = await axios.get('/api/poles');
    setPoles(res.data);
  }

  useEffect(() => {
    getPlots()
    getPoles()
  }, [])

  useEffect(() => {
    getPlots()
  }, [toogle1])

  useEffect(() => {
    getPoles()
  }, [toogle2])

  return (
    <div>
      {
        mapName === "plot" &&
        <p className='text-gray-300'>Draw Plot (Left Click to mark, Right Click to finish)</p>
      }
      <MapContainer center={[21.1610858, 79.0725101]} zoom={10} style={{ width: '90vw', height: '90vh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          mapName === "plot" ?
            <>
              <PlotDrawer onFinish={handleNewPlot} />
              {plots.map((plot, i) => (
                <Polygon key={i} positions={plot.boundary} color="green" />
              ))}
            </>
            : mapName === "pole" ?
              <>
                <AddPole onAdd={handleAddPole} />
                {poles.map((pole, idx) => (
                  <Marker key={idx} position={[pole.lat, pole.lng]} color="yellow" />
                ))}
              </>
              :
              <>
                
                {plots.map((plot, i) => (
                  <Polygon key={i} positions={plot.boundary} color="green" />
                ))}
              
                {poles.map((pole, idx) => (
                  <Marker key={idx} position={[pole.lat, pole.lng]} icon={pole.insidePlot ? insideIcon : outsideIcon} />
                ))}
              </>
        }
      </MapContainer>
    </div>
  );
}
