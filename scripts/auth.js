"use strict";

const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";

function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

function isLoggedIn () {
    const loginData = getLoginData();
    return Boolean(loginData.token);
}

function login (loginData) {
    const options = { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    };

    return fetch(apiBaseURL + "/auth/login", options)
        .then(response => response.json())
        .then(loginData => {
            if (loginData.message === "Invalid username or password") {
                console.error(loginData);
                alert("Invalid username or password");
                return null;
            }

            window.localStorage.setItem("login-data", JSON.stringify(loginData));
            document.getElementById("successMessage").style.display = "block";
            setTimeout(() => {
                window.location.assign("/index.html");
            }, 2000);

            return loginData;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function logout () {
    const loginData = getLoginData();

    const options = { 
        method: "GET",
        headers: { 
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(apiBaseURL + "/auth/logout", options)
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => {
            window.localStorage.removeItem("login-data");
            window.location.assign("/");
        });
}
