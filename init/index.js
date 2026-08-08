const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// The data is inserted into the DB
if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { geocodeLocation } = require("../utils/geocode.js");

const dbUrl = process.env.ATLASDB_URL;

main()
    .then((res) => {
        console.log("connection successful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const intiDB = async() => {
    for (let obj of initData.data) {
        let geometry;
        try {
            geometry = await geocodeLocation(obj.location, obj.country);   // ✅ properly awaited
        } catch (err) {
            console.log(`Could not geocode ${obj.title}: ${err.message}`);
            continue;
        }
        
        const newListing = new Listing({
            ...obj,
            owner: "6a6441c8b040ba0a8049521a",
            geometry,   // just the variable name, no parentheses
        });
        
        await newListing.save();
        await delay(600);
    }
}

intiDB();