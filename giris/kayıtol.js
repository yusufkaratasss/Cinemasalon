document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const tc = document.getElementById("tc").value; 
        const birthdate = document.getElementById("birthdate").value;

        const userData = {
            username: username,
            password: password,
            birthdate: birthdate,
            tc: tc
        };

        try {
            let response = await fetch("http://127.0.0.1:20000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            
            if (tc.length !== 11) {
                alert("TC Kimlik numarası 11 karakter olmalıdır.");
                return;
            }
    
            if (response.status === 400) {
                const result = await response.json();
                if (result.message === "Bu kullanıcı adı zaten kullanılıyor") {
                    alert("Bu kullanıcı adı zaten kullanılıyor");
                } else {
                    console.error("An error occurred:", result.message);
                }
            } else {
                window.location.href = "giris.html";
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
        
    });
});