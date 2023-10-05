const trgPubkey = "HyRypoH2B8UPCVvcFqEBFh1E8f7HoHta9tWBJkMa3r7L";
fetchFills(trgPubkey)
    .then(fills => {
        if (fills) {
            console.log("Fetched fills:", fills);
        }
    })
    .catch(error => console.error("An error occurred:", error));
