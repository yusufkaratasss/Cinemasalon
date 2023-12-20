document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
       
        const userData = {
            username: username,
            password: password,

        };

        try {
            const response = await fetch("http://127.0.0.1:20000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (response) {
                const result = await response.json();
                if (result.token) {
                    window.location.href = "sinema-krokisi.html";
                } else {
                    alert("Tekrar deneyin, bilgiler eşleşmiyor.");
                }
            } 
        } catch (error) {
            console.error("Hata:", error);
        }
    });
});