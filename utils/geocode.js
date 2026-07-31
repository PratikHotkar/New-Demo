const axios = require("axios");

// This function takes a location name and country,
// and returns the latitude/longitude for that place.
module.exports.geocodeLocation = async (location, country) => {

    // Step 1: Combine location + country into one search text
    // Example: "Malibu" + "United States" → "Malibu, United States"
    const searchText = `${location}, ${country}`;

    // Step 2: Ask LocationIQ to find coordinates for this text
    const response = await axios.get("https://us1.locationiq.com/v1/search", {
        params: {
            key: process.env.MAP_TOKEN,   // our API key, proves we're allowed to use this service
            q: searchText,                 // the address we want to search for
            format: "json",                // ask LocationIQ to reply in JSON format
        },
    });

    // Step 3: LocationIQ sends back a LIST of possible matches.
    // We just want the first (best) match.
    const firstMatch = response.data[0];

    // Step 4: If nothing was found, stop here and throw an error
    if (!firstMatch) {
        throw new Error("Could not find this location. Please check the spelling.");
    }

    // Step 5: LocationIQ gives us lat/lon as TEXT (strings), like "19.0760"
    // We convert them into actual numbers using parseFloat
    const longitude = parseFloat(firstMatch.lon);
    const latitude = parseFloat(firstMatch.lat);

    // Step 6: Return the coordinates in the format MongoDB/Maps expect
    return {
        type: "Point",
        coordinates: [longitude, latitude],   //longitude comes FIRST, then latitude
    };
};