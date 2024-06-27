"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.querySelector("#registerForm");

    if (registerForm) {
        registerForm.onsubmit = function(event) {
            event.preventDefault();

            const registerData = {
                username: registerForm.username.value,
                fullName: registerForm.fullName.value,
                password: registerForm.password.value,
            };

            registerForm.querySelector("#registerButton").disabled = true;
            register(registerData);
        };
    }

    const loginForm = document.querySelector("#login");

    if (loginForm) {
        loginForm.onsubmit = function(event) {
            event.preventDefault();

            const loginData = {
                username: loginForm.username.value,
                password: loginForm.password.value,
            };

            login(loginData);
        };
    }
});

function register(registerData) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    };

    return fetch(apiBaseURL + "/api/users", options)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return null;
            }

            login({
                username: registerData.username,
                password: registerData.password,
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
