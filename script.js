document.addEventListener("DOMContentLoaded", function() {
    // Identify the current page
    const currentPage = window.location.pathname;

    console.log("Current Page:", currentPage); // Debug: Check which page is loaded

    // ✅ Handle Login Form (Only if `login.html` is Open)
    if (currentPage.includes("login.html")) {
        const loginForm = document.getElementById("login-form");
        const loginBtn = document.getElementById("login-btn");

        if (!loginForm) {
            console.error("Login form not found!");
            return;
        }

        if (!loginBtn) {
            console.error("Login button not found!");
            return;
        }

        loginBtn.addEventListener("click", function() {
            console.log("Login button clicked!");
        });

        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const loginData = {
                username: document.getElementById("username").value.trim(),
                password: document.getElementById("password").value.trim(),
            };

            try {
                const response = await fetch("http://localhost/bitebuzz/login.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(loginData),
                });

                const data = await response.json();

                if (data.success) {
                    alert("Login successful! Redirecting...");
                    window.location.href = data.redirect;
                } else {
                    alert(data.message); // Displays correct error (password/user issue)
                    loginForm.reset();
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        });
    }

    // ✅ Handle Signup Form (Only if `index.html` is Open)
    if (currentPage.includes("index.html")) {
        const signupForm = document.getElementById("signup-form");

        if (!signupForm) {
            console.error("Signup form not found!");
            return;
        }

        signupForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const userData = {
                username: document.getElementById("username").value.trim(),
                phone: document.getElementById("phone").value.trim(),
                password: document.getElementById("password").value.trim(),
            };

            try {
                const response = await fetch("http://localhost/bitebuzz/signup.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userData),
                });

                const data = await response.json();
                if (data.success) {
                    alert("Signup successful! Redirecting...");
                    window.location.href = "homepage.html";
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        });
    }

    console.log(document.getElementById('choose-order-section'));
});
