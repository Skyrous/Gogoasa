$(function() {
    $("form").on("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        var formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            message: $("#message").val()
        };

        // Send the form data to the server
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/contact", // Update this URL to match your server endpoint
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function(response) {
                // Handle success
                $("#response").html("<div class='alert alert-success' style='margin-top: 20px;'>Message sent successfully!</div>");
                $("form")[0].reset();
            },
            error: function(xhr) {
                // Handle error
                var errorMessage = xhr.responseJSON ? xhr.responseJSON.message : "There was an error sending the message.";
                $("#response").html("<div class='alert alert-danger'>" + errorMessage + "</div>");
            }
        });
    });
});