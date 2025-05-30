import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

export default function AddPole({ onAdd }) {
    useMapEvents({
      click(e) {
        onAdd({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    });
    return null;
  }