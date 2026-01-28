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
        const iso3 =
            feature.properties.ISO_A3?.toUpperCase() ||
            feature.properties.iso_a3?.toUpperCase() ||
            feature.properties.ADM0_A3?.toUpperCase() ||
            feature.properties.adm0_a3?.toUpperCase();

        const isHighlighted = highlightedCountries
            .map(c => c.toUpperCase())
            .includes(iso3);

        return {
            fill: isHighlighted ? "#23c417" : "#d6d6d6",
            stroke: "#333",
            strokeWidth: 1,
        };
    };

    console.log("highlightedCountries:", highlightedCountries);
    return (
        <div style={{ height: "500px", width: "100%", marginTop: "20px" }}>
            <Map
                height={500}
                 defaultCenter={[20, 0]}
                 defaultZoom={2}
                 mouseEvents={false}
                 touchEvents={false}
                 zoomSnap={false}
                 zoomAnimation={false}
                 animate={false}
            >
                {geoData && (
                    <GeoJson data={geoData} styleCallback={styleCallback} />
                )}
            </Map>
        </div>
    );
}

export default ReligionMap;