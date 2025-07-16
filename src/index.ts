window.addEventListener('DOMContentLoaded', () => {
    const user: string | null = localStorage.getItem("loggedInUser");

    if (!user) {
        window.location.href = "/public/pages/login.html";
    }

});
