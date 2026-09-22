/* ==================================================
   HOPEHUB - MAIN JAVASCRIPT
================================================== */


/* ==================================================
   PAGE LOADER
================================================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(function () {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 500);
    }

});


/* ==================================================
   MOBILE MENU
================================================== */

function toggleMenu() {

    const navLinks = document.getElementById("navLinks");

    if (!navLinks) return;

    navLinks.classList.toggle("active");

}


/* Close mobile menu when clicking a navigation link */

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.getElementById("navLinks");

    if (!navLinks) return;

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

        });

    });

});


// ===============================
// LIGHT / DARK MODE
// ===============================

function changeTheme() {
    document.body.classList.toggle("light");

    const btn = document.getElementById("themeBtn");

    if (document.body.classList.contains("light")) {
        btn.textContent = "🌙";
        localStorage.setItem("hopehubTheme", "light");
    } else {
        btn.textContent = "🌞";
        localStorage.setItem("hopehubTheme", "dark");
    }
}

// Save theme after refresh
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("hopehubTheme");
    const btn = document.getElementById("themeBtn");

    if (savedTheme === "light") {
        document.body.classList.add("light");

        if (btn) {
            btn.textContent = "🌙";
        }
    }
});


/* Load saved theme */

document.addEventListener("DOMContentLoaded", function () {

    const savedTheme = localStorage.getItem("hopehubTheme");

    const themeBtn = document.getElementById("themeBtn");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        if (themeBtn) {
            themeBtn.textContent = "☀️";
        }

    }

});


/* ==================================================
   AUTH OVERLAY
================================================== */

const loginButton = document.querySelector(".login-btn");

if (loginButton) {

    loginButton.addEventListener("click", function () {

        const overlay = document.getElementById("authOverlay");

        if (overlay) {
            overlay.style.display = "flex";
        }

    });

}


/* Close authentication window */

function closeAuth() {

    const overlay = document.getElementById("authOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }

}


/* Show Login */

function showLogin() {

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (loginForm) {
        loginForm.style.display = "block";
    }

    if (signupForm) {
        signupForm.style.display = "none";
    }

}


/* Show Signup */

function showSignup() {

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (loginForm) {
        loginForm.style.display = "none";
    }

    if (signupForm) {
        signupForm.style.display = "block";
    }

}


/* ==================================================
   SIGNUP
================================================== */

function signupUser() {

    const name = document.getElementById("signupName");
    const email = document.getElementById("signupEmail");
    const password = document.getElementById("signupPassword");

    if (!name || !email || !password) return;

    const userName = name.value.trim();
    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if (!userName || !userEmail || !userPassword) {

        alert("Please fill in all fields.");

        return;
    }

    if (userPassword.length < 6) {

        alert("Password must be at least 6 characters.");

        return;
    }

    const user = {

        name: userName,
        email: userEmail,
        password: userPassword

    };

    localStorage.setItem(
        "hopehubUser",
        JSON.stringify(user)
    );

    alert("Account created successfully! 🎉");

    name.value = "";
    email.value = "";
    password.value = "";

    showLogin();

}


/* ==================================================
   LOGIN
================================================== */

function loginUser() {

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    if (!email || !password) return;

    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    const savedUser = localStorage.getItem("hopehubUser");

    if (!savedUser) {

        alert("No account found. Please sign up first.");

        showSignup();

        return;
    }

    const user = JSON.parse(savedUser);

    if (
        user.email === userEmail &&
        user.password === userPassword
    ) {

        localStorage.setItem(
            "hopehubLoggedIn",
            "true"
        );

        alert(
            "Welcome back, " +
            user.name +
            "! 👋"
        );

        closeAuth();

        email.value = "";
        password.value = "";

        updateLoginButton();

    } else {

        alert("Incorrect email or password.");

    }

}


/* Update login button */

function updateLoginButton() {

    const button = document.querySelector(".login-btn");

    if (!button) return;

    const loggedIn =
        localStorage.getItem("hopehubLoggedIn") === "true";

    if (loggedIn) {

        const savedUser =
            localStorage.getItem("hopehubUser");

        if (savedUser) {

            const user = JSON.parse(savedUser);

            button.textContent =
                "👋 " + user.name;

        }

    } else {

        button.textContent = "👤 Login";

    }

}


document.addEventListener(
    "DOMContentLoaded",
    updateLoginButton
);


/* ==================================================
   DAILY QUOTES
================================================== */

const quotes = [
    "Your story isn't over yet.",
    "Difficult roads often lead to beautiful destinations.",
    "Every small step forward is still progress.",
    "Believe in yourself and never give up.",
    "You are stronger than you think.",
    "Better days are coming.",
    "Keep going, even when it feels hard.",
    "Your future is worth fighting for."
];

function showRandomQuote() {
    const quoteElement = document.getElementById("dailyQuote");

    if (!quoteElement) return;

    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

document.addEventListener("DOMContentLoaded", function () {
    showRandomQuote();
});

/* ==================================================
   COPY QUOTE
================================================== */

function copyQuote() {

    const quoteElement =
        document.getElementById("dailyQuote");

    if (!quoteElement) return;

    const quote =
        quoteElement.textContent.trim();

    if (navigator.clipboard) {

        navigator.clipboard.writeText(quote)
            .then(function () {

                alert("Quote copied! 📋");

            })
            .catch(function () {

                alert("Unable to copy the quote.");

            });

    } else {

        alert(quote);

    }

}


/* ==================================================
   SHARE QUOTE
================================================== */

function shareQuote() {

    const quoteElement =
        document.getElementById("dailyQuote");

    if (!quoteElement) return;

    const quote =
        quoteElement.textContent.trim();

    if (navigator.share) {

        navigator.share({

            title: "HopeHub Quote",
            text: quote,
            url: window.location.href

        }).catch(function () {});

    } else {

        copyQuote();

        alert(
            "Sharing is not supported here. " +
            "The quote has been copied instead."
        );

    }

}


/* ==================================================
   SEARCH VIDEOS
================================================== */

function searchVideos() {

    const input =
        document.getElementById("searchInput");

    if (!input) return;

    const searchTerm =
        input.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".video-card");

    cards.forEach(function (card) {

        const title =
            card.querySelector("h3");

        const description =
            card.querySelector("p");

        const category =
            card.dataset.category || "";

        const titleText =
            title
                ? title.textContent.toLowerCase()
                : "";

        const descriptionText =
            description
                ? description.textContent.toLowerCase()
                : "";

        const categoryText =
            category.toLowerCase();

        const found =
            titleText.includes(searchTerm) ||
            descriptionText.includes(searchTerm) ||
            categoryText.includes(searchTerm);

        card.style.display =
            found ? "" : "none";

    });

}


/* ==================================================
   CATEGORY FILTER
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const cards =
        document.querySelectorAll(".video-card");

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const selectedCategory =
                button.textContent.trim();

            cards.forEach(function (card) {

                const cardCategory =
                    card.dataset.category;

                if (
                    selectedCategory === "All" ||
                    cardCategory === selectedCategory
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });

});


/* ==================================================
   LIKE VIDEOS
================================================== */

function likeVideo(button, videoId) {

    if (!button) return;

    let likedVideos =
        JSON.parse(
            localStorage.getItem("hopehubLikes") || "{}"
        );

    if (likedVideos[videoId]) {

        likedVideos[videoId] = false;

        button.textContent = "🤍 Like";

        button.classList.remove("liked");

    } else {

        likedVideos[videoId] = true;

        button.textContent = "❤️ Liked";

        button.classList.add("liked");

    }

    localStorage.setItem(
        "hopehubLikes",
        JSON.stringify(likedVideos)
    );

}


/* Restore likes */

document.addEventListener("DOMContentLoaded", function () {

    const likedVideos =
        JSON.parse(
            localStorage.getItem("hopehubLikes") || "{}"
        );

    document
        .querySelectorAll(".like-btn")
        .forEach(function (button) {

            const onclickText =
                button.getAttribute("onclick") || "";

            const match =
                onclickText.match(/'([^']+)'/);

            if (!match) return;

            const videoId = match[1];

            if (likedVideos[videoId]) {

                button.textContent = "❤️ Liked";

                button.classList.add("liked");

            }

        });

});


/* ==================================================
   FAVORITES
================================================== */

function addFavorite(
    title,
    image,
    link,
    button
) {

    let favorites =
        JSON.parse(
            localStorage.getItem("hopehubFavorites") || "[]"
        );

    const existing =
        favorites.find(function (item) {

            return item.link === link;

        });

    if (existing) {

        favorites =
            favorites.filter(function (item) {

                return item.link !== link;

            });

        if (button) {

            button.textContent =
                "🤍 Favorite";

            button.classList.remove("favorited");

        }

        alert("Removed from favorites.");

    } else {

        favorites.push({

            title: title,
            image: image,
            link: link

        });

        if (button) {

            button.textContent =
                "❤️ Favorited";

            button.classList.add("favorited");

        }

        alert("Added to favorites! ❤️");

    }

    localStorage.setItem(
        "hopehubFavorites",
        JSON.stringify(favorites)
    );

    displayFavorites();

}


/* Display favorites */

function displayFavorites() {

    const container =
        document.getElementById("favoriteContainer");

    if (!container) return;

    const favorites =
        JSON.parse(
            localStorage.getItem("hopehubFavorites") || "[]"
        );

    container.innerHTML = "";

    if (favorites.length === 0) {

        container.innerHTML =
            '<p class="empty-fav">No favorite videos yet.</p>';

        return;

    }

    favorites.forEach(function (video) {

        const card =
            document.createElement("div");

        card.className =
            "card favorite-card";

        card.innerHTML = `

            <a href="${video.link}">

                <div class="video-image">

                    <img
                        src="${video.image}"
                        alt="${video.title}"
                    >

                    <div class="play-btn">
                        ▶
                    </div>

                </div>

            </a>

            <h3>${video.title}</h3>

            <button
                class="remove-favorite"
                type="button"
            >
                ❌ Remove
            </button>

        `;

        const removeButton =
            card.querySelector(".remove-favorite");

        removeButton.addEventListener(
            "click",
            function () {

                removeFavorite(video.link);

            }
        );

        container.appendChild(card);

    });

}


/* Remove favorite */

function removeFavorite(link) {

    let favorites =
        JSON.parse(
            localStorage.getItem("hopehubFavorites") || "[]"
        );

    favorites =
        favorites.filter(function (video) {

            return video.link !== link;

        });

    localStorage.setItem(
        "hopehubFavorites",
        JSON.stringify(favorites)
    );

    displayFavorites();

    restoreFavoriteButtons();

}


/* Restore favorite buttons */

function restoreFavoriteButtons() {

    const favorites =
        JSON.parse(
            localStorage.getItem("hopehubFavorites") || "[]"
        );

    const favoriteLinks =
        favorites.map(function (item) {

            return item.link;

        });

    document
        .querySelectorAll(".favorite-btn")
        .forEach(function (button) {

            const onclickText =
                button.getAttribute("onclick") || "";

            const match =
                onclickText.match(
                    /'([^']+)'\s*,\s*'([^']+)'\s*,\s*'([^']+)'/
                );

            if (!match) return;

            const videoLink = match[3];

            if (
                favoriteLinks.includes(videoLink)
            ) {

                button.textContent =
                    "❤️ Favorited";

                button.classList.add("favorited");

            } else {

                button.textContent =
                    "🤍 Favorite";

                button.classList.remove("favorited");

            }

        });

}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayFavorites();

        restoreFavoriteButtons();

    }
);


/* ==================================================
   STATISTICS COUNTERS
================================================== */

function startCounters() {

    const counters =
        document.querySelectorAll(".counter");

    counters.forEach(function (counter) {

        const target =
            Number(counter.dataset.target);

        if (!target) return;

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 100));

        const timer =
            setInterval(function () {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent =
                    current.toLocaleString();

            }, 20);

    });

}


document.addEventListener(
    "DOMContentLoaded",
    startCounters
);


/* ==================================================
   TESTIMONIAL SLIDER
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const testimonials =
        document.querySelectorAll(".testimonial-card");

    if (testimonials.length <= 1) return;

    let current = 0;

    testimonials.forEach(function (item, index) {

        item.classList.toggle(
            "active",
            index === 0
        );

    });

    setInterval(function () {

        testimonials[current].classList.remove("active");

        current =
            (current + 1) % testimonials.length;

        testimonials[current].classList.add("active");

    }, 4000);

});


/* ==================================================
   FAQ ACCORDION
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const questions =
        document.querySelectorAll(".faq-question");

    questions.forEach(function (question) {

        question.addEventListener(
            "click",
            function () {

                const answer =
                    question.nextElementSibling;

                if (!answer) return;

                const isOpen =
                    answer.classList.contains("open");

                /* Close all answers */

                document
                    .querySelectorAll(".faq-answer")
                    .forEach(function (item) {

                        item.classList.remove("open");

                        item.style.maxHeight = null;

                    });

                document
                    .querySelectorAll(".faq-question span")
                    .forEach(function (span) {

                        span.textContent = "+";

                    });

                /* Open selected answer */

                if (!isOpen) {

                    answer.classList.add("open");

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                    const span =
                        question.querySelector("span");

                    if (span) {
                        span.textContent = "−";
                    }

                }

            }
        );

    });

});


/* ==================================================
   CONTACT FORM
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const contactForm =
        document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("contactName");

            const email =
                document.getElementById("contactEmail");

            const message =
                document.getElementById("contactMessage");

            if (
                !name ||
                !email ||
                !message
            ) return;

            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !message.value.trim()
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;

            }

            alert(
                "Thank you, " +
                name.value.trim() +
                "! Your message has been received. 💙"
            );

            contactForm.reset();

        }
    );

});


/* ==================================================
   NEWSLETTER FORM
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const newsletterForm =
        document.querySelector(".newsletter-form");

    if (!newsletterForm) return;

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const emailInput =
                newsletterForm.querySelector(
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

            localStorage.setItem(
                "hopehubSubscriber",
                email
            );

            alert(
                "Thank you for subscribing! 💙"
            );

            newsletterForm.reset();

        }
    );

});


/* ==================================================
   BACK TO TOP BUTTON
================================================== */

const topButton =
    document.getElementById("topBtn");


window.addEventListener(
    "scroll",
    function () {

        if (!topButton) return;

        if (window.scrollY > 400) {

            topButton.classList.add("show");

        } else {

            topButton.classList.remove("show");

        }

    }
);


function goTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* ==================================================
   CLOSE AUTH WHEN CLICKING OUTSIDE
================================================== */

document.addEventListener("click", function (event) {

    const overlay =
        document.getElementById("authOverlay");

    if (!overlay) return;

    if (
        event.target === overlay
    ) {

        closeAuth();

    }

});


/* ==================================================
   ESCAPE KEY
================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeAuth();

    }

});


/* ==================================================
   SMOOTH SCROLL
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const anchors =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchors.forEach(function (anchor) {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });

});


/* ==================================================
   CONSOLE MESSAGE
================================================== */

console.log(
    "HopeHub JavaScript Loaded Successfully ❤️"
);
