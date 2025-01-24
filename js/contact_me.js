$(function() {
    $("form").on("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Disable the submit button to prevent multiple submissions
        $("form button[type='submit']").prop('disabled', true);

        // Get form data
        var formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            message: $("#message").val()
        };

        console.log("Form submitted with data:", formData);

        // Send the form data to the server
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/contact", // Update this URL to match your server endpoint
            data: JSON.stringify(formData),
            contentType: "application/json",
            success: function(response) {
                // Handle success
                console.log("Server response:", response);
                $("#response").html("<div class='alert alert-success' style='margin-top: 20px;'>Message sent successfully!</div>");
                // Clear the form fields
                $("form")[0].reset();
                // Re-enable the submit button
                $("form button[type='submit']").prop('disabled', false);
            },
            error: function(xhr) {
                // Handle error
                var errorMessage = xhr.responseJSON ? xhr.responseJSON.message : "There was an error sending the message.";
                console.log("Server error:", errorMessage);
                $("#response").html("<div class='alert alert-danger' style='margin-top: 20px;'>" + errorMessage + "</div>");
                // Re-enable the submit button
                $("form button[type='submit']").prop('disabled', false);
            }
        });
    });
});