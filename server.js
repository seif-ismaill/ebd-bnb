import express from "express";
const app = express();
// Our fake database for now
const listings = [
    { id: 1, title: "Nile View Apartment", pricePerNight: 85 },
    { id: 2, title: "Beach House", pricePerNight: 140 },
    { id: 3, title: "Desert Eco-Lodge", pricePerNight: 60 },
];

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

// ========== MODEL ==========
function getAllListings() {
    return listings;
}
function getListingById(id) {
    return listings.find((listing) => listing.id === id);
}
function addListing(data) {
    const listing = {
        id: nextId++,
        title: data.title,
        pricePerNight: data.pricePerNight,
    };
    listings.push(listing);
    return listing;
}

function updateListing(id, data) {
    const listing = getListingById(id);
    if (listing) {
        listing.title = data.title;
        listing.pricePerNight = data.pricePerNight;
    }
    return listing;
}
function removeListing(id) {
    const listing = getListingById(id);
    listings = listings.filter((item) => item.id !== id);
    return listing;
}

// ========== CONTROLLERS ==========

function handleGetAll(req, res) {
 res.json(getAllListings());
}
function handleGetOne(req, res) {
 const listing = getListingById(Number(req.params.id));
 if (!listing) {
 return res.status(404).json({ error: "Listing not found" });
 }
 res.json(listing);
}
