const Listing = require("../models/listing");
const { geocodeLocation } = require("../utils/geocode.js");

module.exports.index = async(req, res) => {
    let { category } = req.query;
    
    let filter = category ? { category } : {};
    let allListings = await Listing.find(filter).populate("reviews");
    
    res.render("./listings/index.ejs", { allListings, category });
}

module.exports.renderNewForm = async(req, res) => {
    res.render("./listings/new.ejs");
}

module.exports.createListing = async(req, res, next) => {
    // let { title, description, image, price, location, country } = req.body;
    // const newListing = await new Listing({
    //     title: title,
    //     description: description,
    //     image: image,
    //     price: price, 
    //     location: location,
    //     country: country,
    // });
    // await newListing.save();

    // instead of above we use listing[field_name] this
    // if(!req.body.listing) {
    //     return next(new ExpressError(400, "Send valid data for listing!"));
    // }

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    try {
        newListing.geometry = await geocodeLocation(req.body.listing.location, req.body.listing.country);
    } catch (err) {
        req.flash("error", "Could not find that location. Please check the spelling.");
        return res.redirect("/listings/new");
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }}).populate("owner");
    console.log(listing.owner);
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("./listings/show.ejs", { listing });
} 

module.exports.renderEditForm = async(req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    if(originalImageUrl.includes("/upload")) {
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_250,c_fill");
    }

    res.render("./listings/edit.ejs", {listing, originalImageUrl});
}

module.exports.updateListing = async(req, res) => {
    let {id} = req.params;
    let oldListing = await Listing.findById(id);
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
    if(typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
    }
    
    let newLocation = req.body.listing.location;
    let newCountry = req.body.listing.country;


    if(oldListing.location !== newLocation || oldListing.country !== newCountry) {
        listing.geometry = await geocodeLocation(newLocation, newCountry);
    }

    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings")
}