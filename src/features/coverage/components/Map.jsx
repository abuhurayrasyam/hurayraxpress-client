import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

const defaultPosition = [23.6850, 90.3563];

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function FlyToDistrict({ coords }) {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 12, { duration: 1.5 });
  }
  return null;
}

const Map = ({ serviceCenters }) => {
  const [searchText, setSearchText] = useState('');
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const match = serviceCenters.find(d =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );
    if (match) {
      setActiveCoords([match.latitude, match.longitude]);
      setActiveDistrict(match.district);
    }
  };

  return (
    <div className="space-y-4">

      <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto flex items-center gap-2">
        <input type="text" placeholder="Search district..." className="input input-bordered w-full" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button type="submit" className="btn btn-primary">Go</button>
      </form>

      <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] rounded-xl overflow-hidden shadow-md border border-base-300">
        <MapContainer
          center={defaultPosition}
          zoom={7}
          scrollWheelZoom={true}
          zoomControl={true}
          className="h-full w-full touch-auto"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FlyToDistrict coords={activeCoords} />

          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
              icon={customIcon}
            >
              <Popup autoOpen={center.district === activeDistrict}>
                <strong>{center.district}</strong><br />
                {center.covered_area?.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;