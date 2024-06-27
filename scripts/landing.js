"use strict";

const registerForm = document.querySelector("#registerForm");

registerForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use registerForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const registerData = {
        username: registerForm.username.value,
        fullName: registerForm.fullName.value,
        password: registerForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    registerForm.registerButton.disabled = true;

    // Time to actually process the registration using the function from auth.js!
    register(registerData);
};

function register(registerData) {
    // POST /api/users
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
                // Here is where you might want to add an error notification 
                // or other visible indicator to the page so that the user is  
                // informed that there was an issue with their registration.
                return null;
            }

            // If registration is successful, log the user in
            login({
                username: registerData.username,
                password: registerData.password,
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
