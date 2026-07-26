console.log("HopeHub Loaded");

// =========================
// Mobile Menu
// =========================

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

// Close Menu After Click

document.querySelectorAll("#navLinks a").forEach(link => {

    link.addEventListener("click", () => {

        document.getElementById("navLinks").classList.remove("active");

    });

});

// =========================
// Search Videos
// =========================

function searchVideos() {

    let input = document.getElementById("searchInput").value.toLowerCase();

    let cards = document.querySelectorAll(".video-card");

    cards.forEach(card => {

        let title = card.querySelector("h3").innerText.toLowerCase();

        if (title.includes(input)) {

            card.classList.remove("hide");

        } else {

            card.classList.add("hide");

        }

    });

}

// =========================
// Dark / Light Theme
// =========================

function changeTheme() {

    document.body.classList.toggle("light");

    let btn = document.getElementById("themeBtn");

    if (document.body.classList.contains("light")) {

        btn.innerHTML = "☀️";

    } else {

        btn.innerHTML = "🌙";

    }

}

// =========================
// Like Button + Local Storage
// =========================

function likeVideo(button, id) {

    let liked = localStorage.getItem(id);

    if (liked === "true") {

        localStorage.setItem(id, "false");

        button.classList.remove("liked");

        button.innerHTML = "🤍 Like";

    } else {

        localStorage.setItem(id, "true");

        button.classList.add("liked");

        button.innerHTML = "❤️ Liked";

    }

}

// =========================
// Daily Quotes
// =========================

const quotes = [

    "Your story isn't over yet.",

    "The best chapters are still waiting to be written.",

    "Every small step forward is still progress.",

    "Believe in yourself, even on difficult days.",

    "Hope is stronger than fear.",

    "One day you'll thank yourself for not giving up.",

    "Healing takes time, and that's okay."

];

// =========================
// Copy Quote
// =========================

function copyQuote() {

    let quote = document.getElementById("dailyQuote").innerText;

    navigator.clipboard.writeText(quote);

    alert("✅ Quote Copied!");

}

// =========================
// Share Quote
// =========================

function shareQuote() {

    let quote = document.getElementById("dailyQuote").innerText;

    if (navigator.share) {

        navigator.share({

            title: "HopeHub",

            text: quote

        });

    } else {

        alert("Sharing is not supported on this browser.");

    }

}

// =========================
// Back To Top
// =========================

let topBtn = document.getElementById("topBtn");

window.onscroll = function () {

    if (document.documentElement.scrollTop > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

};

function goTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// =========================
// Page Load
// =========================

window.addEventListener("load", function () {

    // Hide Loader

    setTimeout(() => {

        document.getElementById("loader").style.display = "none";

    }, 1500);

    // Random Quote

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    document.getElementById("dailyQuote").innerText = randomQuote;

    // Restore Likes

    ["video1","video2","video3","video4","video5","video6"].forEach(id => {

        let btn = document.querySelector(`button[onclick*="${id}"]`);

        if (btn && localStorage.getItem(id) === "true") {

            btn.classList.add("liked");

            btn.innerHTML = "❤️ Liked";

        }

    });

});