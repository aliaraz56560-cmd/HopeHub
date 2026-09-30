/* =========================================================
   HOPEHUB - COMPLETE JAVASCRIPT
   Features:
   - Loader
   - Mobile menu
   - Theme
   - Login / Signup
   - Daily quotes
   - Search
   - Categories
   - Likes
   - Favorites
   - Video views
   - Video tracking/counts
   - Google Analytics events
   - Stats counters
   - Testimonials
   - FAQ
   - Contact
   - Newsletter
   - Back to top
   - Video page
========================================================= */


/* =========================================================
   VIDEO DATABASE
========================================================= */

const HOPEHUB_VIDEOS = {
    "crsST0ptxlU": {
        title: "Keep Going 🌟",
        description: "No matter how difficult life feels, keep moving forward. Every small step matters.",
        category: "Motivation",
        image: "images/video1.jpg"
    },

    "I_mPoUWBMf4": {
        title: "Believe in Your Power 💙",
        description: "Believe in yourself, your abilities, and the future you are creating.",
        category: "Success",
        image: "images/video2.jpg"
    },

    "UF8uR6Z6KLc": {
        title: "Keep Moving Forward ❤️",
        description: "Difficult days do not define your whole story. Keep moving forward with hope.",
        category: "Mental Health",
        image: "images/video3.jpg"
    },

    "ZToicYcHIOU": {
        title: "Stay Positive ☀️",
        description: "A positive mindset can help you see new possibilities even during difficult moments.",
        category: "Positivity",
        image: "images/video4.jpg"
    },

    "suvwogCC7PI": {
        title: "Never Give Up 🔥",
        description: "Your journey may be difficult, but giving up is not the end you deserve.",
        category: "Motivation",
        image: "images/video5.jpg"
    },

    "M00D85NmCwk": {
        title: "Your Best Chapter Is Coming ✨",
        description: "Your current situation is not your final destination. Better chapters can still come.",
        category: "Success",
        image: "images/video6.jpg"
    }
};


/* =========================================================
   LEGACY VIDEO KEYS
   Old HTML uses video1, video2 etc.
========================================================= */

const VIDEO_KEY_MAP = {
    video1: "crsST0ptxlU",
    video2: "I_mPoUWBMf4",
    video3: "UF8uR6Z6KLc",
    video4: "ZToicYcHIOU",
    video5: "suvwogCC7PI",
    video6: "M00D85NmCwk"
};


function normalizeVideoId(videoId) {
    return VIDEO_KEY_MAP[videoId] || videoId;
}


/* =========================================================
   GOOGLE ANALYTICS
========================================================= */

function trackGAEvent(eventName, parameters = {}) {

    if (typeof window.gtag === "function") {

        window.gtag("event", eventName, parameters);

    }
}


/* =========================================================
   LOCAL STORAGE HELPERS
========================================================= */

function getVideoStats() {

    try {

        return JSON.parse(
            localStorage.getItem("hopehubVideoStats")
        ) || {};

    } catch (error) {

        return {};

    }
}


function saveVideoStats(stats) {

    localStorage.setItem(
        "hopehubVideoStats",
        JSON.stringify(stats)
    );
}


function getSingleVideoStats(videoId) {

    const stats = getVideoStats();

    if (!stats[videoId]) {

        stats[videoId] = {
            views: 0,
            likes: 0,
            favorites: 0
        };

        saveVideoStats(stats);
    }

    return stats[videoId];
}


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.style.opacity = "0";

            setTimeout(function () {

                loader.style.display = "none";

            }, 300);

        }, 500);
    }
});


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMenu() {

    const navLinks = document.getElementById("navLinks");

    if (navLinks) {

        navLinks.classList.toggle("active");

    }
}


/* =========================================================
   THEME
========================================================= */

function applySavedTheme() {

    const savedTheme =
        localStorage.getItem("hopehubTheme") || "dark";

    const isLight = savedTheme === "light";

    document.body.classList.toggle("light", isLight);

    /*
       Also keeps compatibility if your CSS uses light-mode.
    */
    document.body.classList.toggle("light-mode", isLight);

    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {

        themeBtn.textContent = isLight ? "☀️" : "🌙";

    }
}


function changeTheme() {

    const isCurrentlyLight =
        document.body.classList.contains("light");

    const newTheme =
        isCurrentlyLight ? "dark" : "light";

    localStorage.setItem(
        "hopehubTheme",
        newTheme
    );

    applySavedTheme();
}


/* =========================================================
   AUTH
========================================================= */

function openAuth() {

    const overlay =
        document.getElementById("authOverlay");

    if (overlay) {

        overlay.style.display = "flex";

    }
}


function closeAuth() {

    const overlay =
        document.getElementById("authOverlay");

    if (overlay) {

        overlay.style.display = "none";

    }
}


function showSignup() {

    const loginBox =
        document.getElementById("loginForm");

    const signupBox =
        document.getElementById("signupForm");

    if (loginBox) loginBox.style.display = "none";

    if (signupBox) signupBox.style.display = "block";
}


function showLogin() {

    const loginBox =
        document.getElementById("loginForm");

    const signupBox =
        document.getElementById("signupForm");

    if (loginBox) loginBox.style.display = "block";

    if (signupBox) signupBox.style.display = "none";
}


function signupUser() {

    const name =
        document.getElementById("signupName")?.value.trim();

    const email =
        document.getElementById("signupEmail")?.value.trim();

    const password =
        document.getElementById("signupPassword")?.value;

    if (!name || !email || !password) {

        alert("Please fill all fields.");

        return;

    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem(
        "hopehubUser",
        JSON.stringify(user)
    );

    localStorage.setItem(
        "hopehubLoggedIn",
        "true"
    );

    alert("Account created successfully!");

    closeAuth();

    updateLoginButton();
}


function loginUser() {

    const email =
        document.getElementById("loginEmail")?.value.trim();

    const password =
        document.getElementById("loginPassword")?.value;

    let user = null;

    try {

        user =
            JSON.parse(
                localStorage.getItem("hopehubUser")
            );

    } catch (error) {

        user = null;

    }

    if (
        user &&
        user.email === email &&
        user.password === password
    ) {

        localStorage.setItem(
            "hopehubLoggedIn",
            "true"
        );

        alert("Login successful!");

        closeAuth();

        updateLoginButton();

    } else {

        alert("Invalid email or password.");

    }
}


function updateLoginButton() {

    const button =
        document.querySelector(".login-btn");

    if (!button) return;

    let user = null;

    try {

        user =
            JSON.parse(
                localStorage.getItem("hopehubUser")
            );

    } catch (error) {

        user = null;

    }

    const loggedIn =
        localStorage.getItem("hopehubLoggedIn") === "true";

    if (loggedIn && user) {

        button.textContent =
            `👋 ${user.name}`;

    } else {

        button.textContent =
            "👤 Login";

    }
}


/* =========================================================
   DAILY QUOTES
========================================================= */

const dailyQuotes = [

    "Your story isn't over yet.",

    "Small steps every day create big changes.",

    "Believe in yourself even when nobody else does.",

    "You are stronger than the challenges you face.",

    "Better days are coming.",

    "Never give up on yourself.",

    "Your future needs you to keep going.",

    "You can start again at any moment.",

    "Progress is still progress, no matter how small.",

    "Hope can begin with one small thought.",

    "You have survived difficult days before.",

    "Your best chapter may still be ahead."

];


function showRandomQuote() {

    const quoteElement =
        document.getElementById("dailyQuote");

    if (!quoteElement) return;

    const randomIndex =
        Math.floor(
            Math.random() * dailyQuotes.length
        );

    quoteElement.textContent =
        dailyQuotes[randomIndex];
}


function copyQuote() {

    const quoteElement =
        document.getElementById("dailyQuote");

    if (!quoteElement) return;

    const quote =
        quoteElement.textContent;

    navigator.clipboard.writeText(quote)
        .then(function () {

            alert("Quote copied!");

        })
        .catch(function () {

            alert("Unable to copy quote.");

        });
}


function shareQuote() {

    const quoteElement =
        document.getElementById("dailyQuote");

    if (!quoteElement) return;

    const quote =
        quoteElement.textContent;

    if (navigator.share) {

        navigator.share({
            title: "HopeHub Daily Quote",
            text: quote,
            url: window.location.href
        });

    } else {

        navigator.clipboard.writeText(quote)
            .then(function () {

                alert("Quote copied. You can share it anywhere!");

            });

    }
}


/* =========================================================
   SEARCH
========================================================= */

function searchVideos() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const searchText =
        input.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".video-card");

    cards.forEach(function (card) {

        const title =
            card.querySelector("h3")?.textContent
                .toLowerCase() || "";

        const description =
            card.querySelector("p")?.textContent
                .toLowerCase() || "";

        const category =
            card.dataset.category?.toLowerCase() || "";

        const matches =
            title.includes(searchText) ||
            description.includes(searchText) ||
            category.includes(searchText);

        card.classList.toggle(
            "hide",
            !matches
        );

    });
}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function filterCategory(category, button) {

    const cards =
        document.querySelectorAll(".video-card");

    cards.forEach(function (card) {

        const cardCategory =
            card.dataset.category;

        if (
            category === "All" ||
            cardCategory === category
        ) {

            card.classList.remove("hide");

        } else {

            card.classList.add("hide");

        }

    });

    document
        .querySelectorAll(".category-btn")
        .forEach(function (btn) {

            btn.classList.remove("active");

        });

    if (button) {

        button.classList.add("active");

    }
}


/* =========================================================
   VIDEO CARD ID
========================================================= */

function getVideoIdFromLink(link) {

    if (!link) return "";

    try {

        const url =
            new URL(
                link,
                window.location.href
            );

        return (
            url.searchParams.get("video") || ""
        );

    } catch (error) {

        const match =
            link.match(/[?&]video=([^&]+)/);

        return match
            ? decodeURIComponent(match[1])
            : "";
    }
}


/* =========================================================
   TRACKING UI
========================================================= */

function createTrackingBox(card, videoId) {

    if (!card || !videoId) return;

    let box =
        card.querySelector(".video-tracking-stats");

    if (!box) {

        box =
            document.createElement("div");

        box.className =
            "video-tracking-stats";

        const description =
            card.querySelector("p");

        if (description) {

            description.insertAdjacentElement(
                "afterend",
                box
            );

        } else {

            card.appendChild(box);

        }
    }

    updateTrackingBox(box, videoId);
}


function updateTrackingBox(box, videoId) {

    if (!box) return;

    const stats =
        getSingleVideoStats(videoId);

    box.innerHTML = `
        <span>👁️ ${stats.views}</span>
        &nbsp;&nbsp;
        <span>❤️ ${stats.likes}</span>
        &nbsp;&nbsp;
        <span>⭐ ${stats.favorites}</span>
    `;
}


function updateAllTrackingUI() {

    const cards =
        document.querySelectorAll(".video-card");

    cards.forEach(function (card) {

        const link =
            card.querySelector(
                'a[href*="video.html?video="]'
            );

        const videoId =
            getVideoIdFromLink(
                link?.getAttribute("href")
            );

        if (!videoId) return;

        createTrackingBox(
            card,
            videoId
        );

        const likeButton =
            card.querySelector(
                ".like-btn"
            );

        if (likeButton) {

            likeButton.dataset.videoId =
                videoId;

            updateLikeButton(
                likeButton,
                videoId
            );
        }

        const favoriteButton =
            card.querySelector(
                ".favorite-btn"
            );

        if (favoriteButton) {

            favoriteButton.dataset.videoId =
                videoId;

            updateFavoriteButton(
                favoriteButton,
                videoId
            );
        }

    });
}


/* =========================================================
   LIKE SYSTEM
========================================================= */

function getLikes() {

    try {

        return JSON.parse(
            localStorage.getItem("hopehubLikes")
        ) || {};

    } catch (error) {

        return {};

    }
}


function saveLikes(likes) {

    localStorage.setItem(
        "hopehubLikes",
        JSON.stringify(likes)
    );
}


function updateLikeButton(button, videoId) {

    if (!button) return;

    const likes =
        getLikes();

    const legacyId =
        Object.keys(VIDEO_KEY_MAP)
            .find(
                key => VIDEO_KEY_MAP[key] === videoId
            );

    const isLiked =
        likes[legacyId || videoId] === true;

    button.innerHTML =
        isLiked
            ? "❤️ Liked"
            : "🤍 Like";
}


function likeVideo(button, videoId) {

    const canonicalId =
        normalizeVideoId(videoId);

    const likes =
        getLikes();

    const storageKey =
        VIDEO_KEY_MAP[videoId]
            ? videoId
            : canonicalId;

    const alreadyLiked =
        likes[storageKey] === true;

    const stats =
        getVideoStats();

    if (!stats[canonicalId]) {

        stats[canonicalId] = {
            views: 0,
            likes: 0,
            favorites: 0
        };
    }

    if (alreadyLiked) {

        delete likes[storageKey];

        stats[canonicalId].likes =
            Math.max(
                0,
                stats[canonicalId].likes - 1
            );

        trackGAEvent(
            "video_unlike",
            {
                video_id: canonicalId,
                video_title:
                    HOPEHUB_VIDEOS[canonicalId]?.title || ""
            }
        );

    } else {

        likes[storageKey] = true;

        stats[canonicalId].likes += 1;

        trackGAEvent(
            "video_like",
            {
                video_id: canonicalId,
                video_title:
                    HOPEHUB_VIDEOS[canonicalId]?.title || ""
            }
        );
    }

    saveLikes(likes);

    saveVideoStats(stats);

    updateLikeButton(
        button,
        canonicalId
    );

    updateAllTrackingUI();

    updateVideoPageStats();
}


/* =========================================================
   FAVORITES
========================================================= */

function getFavorites() {

    try {

        return JSON.parse(
            localStorage.getItem("hopehubFavorites")
        ) || [];

    } catch (error) {

        return [];

    }
}


function saveFavorites(favorites) {

    localStorage.setItem(
        "hopehubFavorites",
        JSON.stringify(favorites)
    );
}


function isFavorite(videoId) {

    const favorites =
        getFavorites();

    return favorites.some(function (item) {

        return (
            getVideoIdFromLink(item.link) ===
            videoId
        );

    });
}


function updateFavoriteButton(
    button,
    videoId
) {

    if (!button) return;

    button.innerHTML =
        isFavorite(videoId)
            ? "⭐ Saved"
            : "🤍 Favorite";
}


function addFavorite(
    title,
    image,
    link,
    button
) {

    const videoId =
        getVideoIdFromLink(link);

    if (!videoId) {

        return;

    }

    const favorites =
        getFavorites();

    const existingIndex =
        favorites.findIndex(function (item) {

            return (
                getVideoIdFromLink(item.link) ===
                videoId
            );

        });

    const stats =
        getVideoStats();

    if (!stats[videoId]) {

        stats[videoId] = {
            views: 0,
            likes: 0,
            favorites: 0
        };
    }

    if (existingIndex !== -1) {

        favorites.splice(
            existingIndex,
            1
        );

        stats[videoId].favorites =
            Math.max(
                0,
                stats[videoId].favorites - 1
            );

        trackGAEvent(
            "video_unfavorite",
            {
                video_id: videoId,
                video_title:
                    HOPEHUB_VIDEOS[videoId]?.title || title
            }
        );

        if (button) {

            updateFavoriteButton(
                button,
                videoId
            );
        }

    } else {

        favorites.push({
            title: title,
            image: image,
            link: link
        });

        stats[videoId].favorites += 1;

        trackGAEvent(
            "video_favorite",
            {
                video_id: videoId,
                video_title:
                    HOPEHUB_VIDEOS[videoId]?.title || title
            }
        );

        if (button) {

            updateFavoriteButton(
                button,
                videoId
            );
        }
    }

    saveFavorites(favorites);

    saveVideoStats(stats);

    displayFavorites();

    updateAllTrackingUI();

    updateVideoPageStats();
}


function displayFavorites() {

    const container =
        document.getElementById(
            "favoriteContainer"
        );

    if (!container) return;

    const favorites =
        getFavorites();

    if (favorites.length === 0) {

        container.innerHTML = `
            <p>No favorite videos yet.</p>
        `;

        return;
    }

    container.innerHTML = "";

    favorites.forEach(function (item) {

        const videoId =
            getVideoIdFromLink(
                item.link
            );

        const card =
            document.createElement("div");
 card.className =
    "video-card saved favorite-card";

        card.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.title}"
                loading="lazy"
            >

            <h3>${item.title}</h3>

            <a
                href="${item.link}"
                class="watch-btn"
            >
                ▶ Watch Video
            </a>

            <button
                type="button"
                class="remove-favorite-btn"
                data-video-id="${videoId}"
            >
                ❌ Remove
            </button>
        `;

        const removeButton =
            card.querySelector(
                ".remove-favorite-btn"
            );

        removeButton.addEventListener(
            "click",
            function () {

                removeFavorite(
                    item.link
                );

            }
        );

        container.appendChild(card);

    });
}


function removeFavorite(link) {

    const videoId =
        getVideoIdFromLink(link);

    const favorites =
        getFavorites();

    const newFavorites =
        favorites.filter(function (item) {

            return (
                getVideoIdFromLink(item.link) !==
                videoId
            );

        });

    const stats =
        getVideoStats();

    if (stats[videoId]) {

        stats[videoId].favorites =
            Math.max(
                0,
                stats[videoId].favorites - 1
            );
    }

    saveFavorites(newFavorites);

    saveVideoStats(stats);

    displayFavorites();

    updateAllTrackingUI();

    updateVideoPageStats();
}


function restoreFavoriteButtons() {

    document
        .querySelectorAll(".favorite-btn")
        .forEach(function (button) {

            const videoId =
                button.dataset.videoId;

            if (videoId) {

                updateFavoriteButton(
                    button,
                    videoId
                );
            }

        });
}
/* =========================================================
   ARTICLE VIEW TRACKING
========================================================= */

function trackArticleView() {

    const articlePath =
        window.location.pathname;

    const articleNames = {

        "/HopeHub/article-keep-going.html":
            "How to Keep Going When Life Feels Difficult",

        "/HopeHub/article-5-small-things.html":
            "5 Small Things That Can Give You Hope",

        "/HopeHub/article-worst-day.html":
            "You Are Not Your Worst Day"

    };

    const articleTitle =
        articleNames[articlePath];

    if (!articleTitle) return;

    if (typeof gtag === "function") {

        gtag("event", "article_view", {

            article_title:
                articleTitle,

            article_path:
                articlePath

        });

    }

}

/* =========================================================
   VIDEO VIEW TRACKING
========================================================= */

function recordVideoView(videoId) {

    if (!videoId) return;

    let alreadyViewed = false;

    try {

        alreadyViewed =
            sessionStorage.getItem(
                "hopehubViewed_" + videoId
            ) === "true";

    } catch (error) {

        alreadyViewed = false;

    }

    if (alreadyViewed) {

        return;

    }

    const stats =
        getVideoStats();

    if (!stats[videoId]) {

        stats[videoId] = {
            views: 0,
            likes: 0,
            favorites: 0
        };
    }

    stats[videoId].views += 1;

    saveVideoStats(stats);

    try {

        sessionStorage.setItem(
            "hopehubViewed_" + videoId,
            "true"
        );

    } catch (error) {
        // Ignore storage errors
    }

    const video =
        HOPEHUB_VIDEOS[videoId];

    trackGAEvent(
        "video_view",
        {
            video_id: videoId,
            video_title:
                video?.title || "",
            video_category:
                video?.category || ""
        }
    );

    updateAllTrackingUI();

    updateVideoPageStats();
}


/* =========================================================
   VIDEO PAGE STATS
========================================================= */

function updateVideoPageStats() {

    const statsElement =
        document.getElementById(
            "videoStats"
        );

    const videoId =
        window.currentHopeHubVideoId;

    if (!statsElement || !videoId) return;

    const stats =
        getSingleVideoStats(videoId);

    statsElement.innerHTML = `
        <span>👁️ ${stats.views} Views</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span>❤️ ${stats.likes} Likes</span>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <span>⭐ ${stats.favorites} Favorites</span>
    `;

    const likeButton =
        document.getElementById(
            "videoLikeBtn"
        );

    const favoriteButton =
        document.getElementById(
            "videoFavoriteBtn"
        );

    if (likeButton) {

        updateLikeButton(
            likeButton,
            videoId
        );
    }

    if (favoriteButton) {

        updateFavoriteButton(
            favoriteButton,
            videoId
        );
    }
}


/* =========================================================
   STATS COUNTERS
========================================================= */

function startCounters() {

    const counters =
        document.querySelectorAll(
            ".counter"
        );

    counters.forEach(function (counter) {

        const target =
            Number(
                counter.dataset.target ||
                counter.textContent ||
                0
            );

        let current = 0;

        const increment =
            Math.max(
                1,
                Math.ceil(target / 100)
            );

        function update() {

            current += increment;

            if (current >= target) {

                counter.textContent =
                    target;

                return;

            }

            counter.textContent =
                current;

            requestAnimationFrame(
                update
            );
        }

        update();

    });
}


/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

function initTestimonials() {

    const testimonials =
        document.querySelectorAll(
            ".testimonial"
        );

    if (testimonials.length <= 1) return;

    let current = 0;

    testimonials.forEach(function (item, index) {

        item.style.display =
            index === 0
                ? "block"
                : "none";

    });

    setInterval(function () {

        testimonials[current].style.display =
            "none";

        current =
            (current + 1) %
            testimonials.length;

        testimonials[current].style.display =
            "block";

    }, 5000);
}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );

    questions.forEach(function (question) {

        question.addEventListener(
            "click",
            function () {

                const item =
                    question.parentElement;

                item.classList.toggle(
                    "active"
                );

            }
        );

    });
}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "contactName"
                )?.value.trim();

            const email =
                document.getElementById(
                    "contactEmail"
                )?.value.trim();

            const message =
                document.getElementById(
                    "contactMessage"
                )?.value.trim();

            if (
                !name ||
                !email ||
                !message
            ) {

                alert(
                    "Please fill all fields."
                );

                return;

            }

            alert(
                "Thank you! Your message has been received."
            );

            form.reset();

        }
    );
}


/* =========================================================
   NEWSLETTER
========================================================= */

function initNewsletter() {

    const form =
        document.querySelector(
            ".newsletter-form"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const emailInput =
                form.querySelector(
                    'input[type="email"]'
                );

            if (!emailInput) return;

            const email =
                emailInput.value.trim();

            if (!email) {

                alert(
                    "Please enter your email."
                );

                return;

            }

            let subscribers = [];

            try {

                subscribers =
                    JSON.parse(
                        localStorage.getItem(
                            "hopehubSubscribers"
                        )
                    ) || [];

            } catch (error) {

                subscribers = [];

            }

            if (
                !subscribers.includes(email)
            ) {

                subscribers.push(email);

                localStorage.setItem(
                    "hopehubSubscribers",
                    JSON.stringify(
                        subscribers
                    )
                );
            }

            alert(
                "Thank you for subscribing!"
            );

            form.reset();

        }
    );
}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const topButton =
        document.getElementById(
            "topBtn"
        );

    if (!topButton) return;

    window.addEventListener(
        "scroll",
        function () {

            if (window.scrollY > 400) {

                topButton.style.display =
                    "block";

            } else {

                topButton.style.display =
                    "none";

            }

        }
    );

    topButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}


/* =========================================================
   VIDEO PAGE
========================================================= */

function initVideoPage() {

    const iframe =
        document.getElementById(
            "youtubeVideo"
        );

    if (!iframe) return;

    const params =
        new URLSearchParams(
            window.location.search
        );

    const videoId =
        params.get("video");

    const video =
        HOPEHUB_VIDEOS[videoId];

    const titleElement =
        document.getElementById(
            "videoTitle"
        );

    const descriptionElement =
        document.getElementById(
            "videoDescription"
        );

    if (!videoId || !video) {

        iframe.style.display =
            "none";

        if (titleElement) {

            titleElement.textContent =
                "Video Not Found";

        }

        if (descriptionElement) {

            descriptionElement.textContent =
                "The requested video could not be found.";

        }

        return;
    }

    window.currentHopeHubVideoId =
        videoId;

    iframe.src =
        `https://www.youtube.com/embed/${videoId}?rel=0`;

    iframe.title =
        video.title;

    if (titleElement) {

        titleElement.textContent =
            video.title;

    }

    if (descriptionElement) {

        descriptionElement.textContent =
            video.description;

    }

    document.title =
        `${video.title} | HopeHub`;

    const likeButton =
        document.getElementById(
            "videoLikeBtn"
        );

    if (likeButton) {

        likeButton.dataset.videoId =
            videoId;

        likeButton.onclick =
            function () {

                likeVideo(
                    likeButton,
                    videoId
                );

            };
    }

    const favoriteButton =
        document.getElementById(
            "videoFavoriteBtn"
        );

    if (favoriteButton) {

        favoriteButton.dataset.videoId =
            videoId;

        favoriteButton.onclick =
            function () {

                addFavorite(
                    video.title,
                    video.image,
                    `video.html?video=${videoId}`,
                    favoriteButton
                );

            };
    }

    recordVideoView(videoId);

    updateVideoPageStats();

    displayFavorites();
}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* Theme */
        applySavedTheme();

        /* Login */
        const loginButton =
            document.querySelector(
                ".login-btn"
            );

        if (loginButton) {

            loginButton.addEventListener(
                "click",
                openAuth
            );

        }

        updateLoginButton();

        /* Mobile navigation */
        const navLinks =
            document.getElementById(
                "navLinks"
            );

        if (navLinks) {

            navLinks
                .querySelectorAll("a")
                .forEach(function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            navLinks.classList.remove(
                                "active"
                            );

                        }
                    );

                });

        }

        /* Quote */
        showRandomQuote();

        /* Favorites */
        displayFavorites();

        /* Tracking */
        updateAllTrackingUI();

        restoreFavoriteButtons();

        /* Counters */
        startCounters();

        /* Other features */
        initTestimonials();

        initFAQ();

        initContactForm();

        initNewsletter();

        initBackToTop();

        /* Video page */
        initVideoPage();

        /* Close auth */
        const overlay =
            document.getElementById(
                "authOverlay"
            );

        if (overlay) {

            overlay.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        overlay
                    ) {

                        closeAuth();

                    }

                }
            );

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAuth();

        }

    }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest(
                'a[href^="#"]'
            );

        if (!link) return;

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }

        const target =
            document.querySelector(
                targetId
            );

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


console.log(
    "HopeHub JavaScript loaded successfully."
);
/* =========================================
   GOOGLE ANALYTICS TRACKING
========================================= */

// Track Video Open
function trackVideoOpen(videoId, videoTitle) {
    if (typeof gtag === "function") {
        gtag("event", "video_open", {
            video_id: videoId,
            video_title: videoTitle
        });
    }
}

// Track Like
function trackLike(videoId) {
    if (typeof gtag === "function") {
        gtag("event", "video_like", {
            video_id: videoId
        });
    }
}

// Track Favorite
function trackFavorite(videoId) {
    if (typeof gtag === "function") {
        gtag("event", "video_favorite", {
            video_id: videoId
        });
    }
}
trackArticleView();
