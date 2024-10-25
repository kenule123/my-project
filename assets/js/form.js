document.addEventListener('DOMContentLoaded', function () {
    // Example function to simulate login status check (replace with actual login check)
    function isLoggedIn() {
        // Replace this with actual logic to check user login status
        // For example, check if a session cookie/token is present
        return !!localStorage.getItem('loggedIn'); // Example using localStorage
    }

    // Toggle visibility based on login status
    if (isLoggedIn()) {
        document.getElementById('login-btn').style.display = 'none';  // Hide login button
        document.getElementById('logout-btn').style.display = 'block';  // Show logout button
    } else {
        document.getElementById('login-btn').style.display = 'block';  // Show login button
        document.getElementById('logout-btn').style.display = 'none';  // Hide logout button
    }
});

// Function to show logout modal
function showLogoutModal() {
    // Here you can display the modal asking the user to confirm logout
    // For now, we just log out
    alert("Logging out...");
    // Perform actual logout action here (e.g., remove session, clear tokens)
    localStorage.removeItem('loggedIn'); // Example using localStorage
    // Reload the page or update the UI
    location.reload(); 
}




document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Show an alert and then display the modal
    alert("Registration successful!");
    
       // Delay of 0 ensures the modal is triggered right after the alert is closed

    // After showing the modal, redirect to signin.html
    setTimeout(function() {
        window.location.href = 'sign in.html';
    }, 3000);  // Redirects to signin.html after 3 seconds (you can adjust the delay as needed)
});
        
        




document.getElementById("signinForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("signinUsername").value;
    let password = document.getElementById("signinPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("loggedIn", JSON.stringify(user));
        alert("Sign In successful!");
        // Redirect to index-2.html after successful login
        window.location.href = "index.html";
    } else {
        alert("Username or password is incorrect!");
    }
});

        
        
        
 
document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("forgotUsername").value;
    let newPassword = document.getElementById("newPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    let userIndex = users.findIndex(user => user.username === username);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Password reset successful!");

        // Open the Sign In modal
        let modalSignin = new bootstrap.Modal(document.getElementById('modalSignin'));
        modalSignin.show();

    } else {
        alert("Username not found!");
    }
});
        
        
        
// Load users from local storage and display in the table
        function loadUsers() {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let tableBody = document.querySelector("#userTable tbody");
            tableBody.innerHTML = ""; // Clear table before rendering

            users.forEach((user, index) => {
                let row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${user.phoneNumber}</td>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                    <td>
                     <div class="btn-group ms-2">
                  <button onclick="editUser(${index})" type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                  <button onclick="deleteUser(${index})"   type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
                </div>
                    </td>
                `;

                tableBody.appendChild(row);
            });
        }

        // Delete a user from the local storage and refresh the table
        function deleteUser(index) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.splice(index, 1); // Remove the user from the array
            localStorage.setItem("users", JSON.stringify(users)); // Update local storage
            loadUsers(); // Refresh table
            alert("User deleted successfully!");
        }

        // Edit a user from the local storage
        function editUser(index) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users[index];

            // Populate the edit form with user details
            document.getElementById("editFirstName").value = user.firstName;
            document.getElementById("editLastName").value = user.lastName;
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editPhoneNumber").value = user.phoneNumber;
            document.getElementById("editUsername").value = user.username;
            document.getElementById("editPassword").value = user.password;

            document.getElementById("editModal").style.display = "block";

            // Save the changes when the form is submitted
            document.getElementById("editForm").onsubmit = function(event) {
                event.preventDefault();

                users[index] = {
                    firstName: document.getElementById("editFirstName").value,
                    lastName: document.getElementById("editLastName").value,
                    email: document.getElementById("editEmail").value,
                    phoneNumber: document.getElementById("editPhoneNumber").value,
                    username: document.getElementById("editUsername").value,
                    password: document.getElementById("editPassword").value
                };

                localStorage.setItem("users", JSON.stringify(users)); // Update local storage
                loadUsers(); // Refresh table
                document.getElementById("editModal").style.display = "none"; // Hide modal
                alert("User details updated successfully!");
            };
        }

        // Initial load of users on page load
        loadUsers();        