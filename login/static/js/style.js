document.addEventListener("DOMContentLoaded", function() {
    
  
    document.getElementById("loginForm")?.addEventListener("submit", function(event) {
        event.preventDefault();
        let email = document.getElementById("loginEmail").value;
        let password = document.getElementById("loginPassword").value;

        
        let storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            alert("Login successful!");
            window.location.href = "dashboard.html";  
        } else {
            alert("Invalid credentials, please try again.");
        }
    });

    
    document.getElementById("signupForm")?.addEventListener("submit", function(event) {
        event.preventDefault();
        let name = document.getElementById("signupName").value;
        let email = document.getElementById("signupEmail").value;
        let password = document.getElementById("signupPassword").value;

      
        let userData = { name, email, password };
        localStorage.setItem(email, JSON.stringify(userData));

        alert("Sign-up successful! You can now log in.");
        window.location.href = "index.html";  

});
});