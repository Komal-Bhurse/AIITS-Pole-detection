import React, { useState } from 'react';

import { Polygon, useMapEvents } from 'react-leaflet';


export default function PlotDrawer({ onFinish }) {
    const [points, setPoints] = useState([]);
  
    useMapEvents({
      click(e) {
        setPoints([...points, [e.latlng.lat, e.latlng.lng]]);
      },
      contextmenu() {
        if (points.length >= 3) {
          onFinish(points);
          setPoints([]);
        }
      }
    });
  
    return points.length ? <Polygon positions={points} color="blue" /> : null;
  }