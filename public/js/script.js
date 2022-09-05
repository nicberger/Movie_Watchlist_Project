document.addEventListener(
    "DOMContentLoaded",
    () => {
        console.log("Movie_Watchlist_Project JS imported successfully!");
    },
    false
);

function addtoWatchlist(original_title) {
    fetch("/watchlist/api/result?id=" + original_title).then((data) =>
        console.log(data)
    );
    console.log(original_title);
}

// Test comment
