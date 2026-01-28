import { Map, GeoJson } from "pigeon-maps";
import { useEffect, useState } from "react";

function ReligionMap({ highlightedCountries }) {
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        fetch("/custom.geo.json")
            .then((res) => res.json())
            .then((data) => setGeoData(data))
            .catch((err) => console.error("Error loading GeoJSON:", err));
    }, []);

    const styleCallback = (feature) => {
        const iso3 = feature.properties.ISO_A3;
        const isHighlighted = highlightedCountries.includes(iso3);

        return {
            fill: isHighlighted ? "#ffcc00" : "#d6d6d6",
            stroke: "#333",
            strokeWidth: 1,
        };
    };

    return (
        <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
            <Map height={500} defaultCenter={[20, 0]} defaultZoom={2}>
                {geoData && (
                    <GeoJson data={geoData} styleCallback={styleCallback} />
                )}
            </Map>
        </div>
    );
}

export default ReligionMap;