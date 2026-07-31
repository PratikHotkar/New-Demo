locationiq.key = mapToken;
//Define the map and configure the map's theme
let map = new maplibregl.Map({
    container: 'map',
    style: locationiq.getLayer("Streets"),
    zoom: 10,
    center: [ listing.geometry.coordinates[0],  listing.geometry.coordinates[1] ]
});

//Define layers you want to add to the layer controls; the first element will be the default layer
let layerStyles = {
    "Streets": "streets/vector",
    // "Dark": "dark/vector",
    // "Light": "light/vector"
};

map.addControl(new locationiqLayerControl({
    key: locationiq.key,
    layerStyles: layerStyles
}), 'top-left');

const marker = new maplibregl.Marker({ color: "red" })
    .setLngLat([listing.geometry.coordinates[0], listing.geometry.coordinates[1]])
    .setPopup(new maplibregl.Popup({ offset: 25 })
        .setHTML(`<h6>${listing.location}</h6><p>Exact Location provided after booking</p>`))
    .addTo(map);