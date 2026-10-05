import express from "express";

const app = express();

// ========== MIDDLEWARE ==========

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ========== DATABASE ==========

let listings = [
    { id: 1, title: "Nile View Apartment", pricePerNight: 85 },
    { id: 2, title: "Beach House", pricePerNight: 140 },
    { id: 3, title: "Desert Eco-Lodge", pricePerNight: 60 },
];

let nextId = 4;

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

function handleCreate(req, res) {
    const listing = addListing(req.body);
    res.status(201).json(listing);
}

function handleUpdate(req, res) {
    const listing = updateListing(Number(req.params.id), req.body);

    if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
    }

    res.json(listing);
}

function handleDelete(req, res) {
    const listing = removeListing(Number(req.params.id));

    if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
    }

    res.json(listing);
}

// ========== ROUTES ==========

app.get("/api/listings", handleGetAll);
app.get("/api/listings/:id", handleGetOne);

app.post("/api/listings", handleCreate);

app.put("/api/listings/:id", handleUpdate);

app.delete("/api/listings/:id", handleDelete);

// ========== START ==========

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
