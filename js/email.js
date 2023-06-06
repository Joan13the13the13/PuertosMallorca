// Initialize EmailJS with your user ID
emailjs.init("0MxkuJoRMc06tyEYk");

// Function to send email
function sendEmail(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Get form data
  let name = document.getElementById("firstName").value.trim();
  let email = document.getElementById("email").value.trim();
  let category=document.getElementById("category").value.trim();
  let message = document.getElementById("message").value.trim();

  // Check if form fields are not empty
  if (name && email && message) {
    // Set email parameters
    let params = {
      to_name:"admin",
      from_name: name+"("+email+")",
      message: "Category:"+category+"\n"+message,
    };

    // Send email using EmailJS
    emailjs.send("PuertosMallorca", "Puerto_plantilla", params)
      .then(function(response) {
        alert("Email sent successfully!"); // Show success message
        document.getElementById("myForm").reset(); // Reset form
      }, function(error) {
        console.error("Error sending email:", error); // Log error message
        alert("Error sending email!"); // Show error message
      });
  } else {
    alert("Please fill out all fields."); // Show error message
  }
}
// Add event listener to form submission
document.getElementById("myForm").addEventListener("submit", sendEmail);