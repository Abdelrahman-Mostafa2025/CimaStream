"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "/public/pages/login.html";
    }
});
