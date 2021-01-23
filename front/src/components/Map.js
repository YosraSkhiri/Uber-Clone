import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { getRTLTextPluginStatus, setRTLTextPlugin } from 'mapbox-gl';
import { io } from 'socket.io-client';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
    const socket = io('http://localhost:4000', {
        transports: ['websocket']
      });
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 36.8665,
        longitude: 10.1647,
        zoom: 13
    });

    socket.on("connect", () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });

      socket.on("disconnect", () => {
        console.log(socket.id); // undefined
      });

    if (getRTLTextPluginStatus() !== 'loaded' && getRTLTextPluginStatus() !== 'unavailable') {
        setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.10.1/mapbox-gl-rtl-text.js');
    }

    console.log(getRTLTextPluginStatus())

  return (
    <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1IjoibWVoZGk3NyIsImEiOiJja2R4bWtpYmIzM3N1MnRwYWUxZjlldnNxIn0.0wiRF9B_wuv8hzM5uvAqow"
        mapStyle= 'mapbox://styles/mapbox/streets-v11'
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
    >
        <Marker latitude={36.8665000000000} longitude= {10.1647000000000}> 
            <button>
                here!!
            </button>
        </Marker>
    </ReactMapGL>
  );
};

export default Map;
