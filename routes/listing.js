const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });

// Controllers
const listingController = require("../controllers/listing");

// Router.route
router.route("/")
    // Index Route - To show all data
    .get(wrapAsync(listingController.index))
    // Create Route
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
    // Show route
    .get(wrapAsync(listingController.showListing))
    // Update Route
    .put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    // Delete Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;