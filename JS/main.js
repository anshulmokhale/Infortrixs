$(document).ready(function () {
    var loged;
    var displayedMessages = {};
    var userLoggedIn = false;

    function isMessageDisplayed(timestamp) {
        return displayedMessages[timestamp];
    }

    function displayMessage(email, senderName, message, time) {
        var htmlContent;
        if (loged === email) {
            htmlContent = `<div class="box">
                <h5>${senderName}</h5>
                <p>${message}</p>
            </div>`;
        } else {
            htmlContent = `<div class="box">
                <h5>${senderName}</h5>
                <p>${message}</p>
            </div>`;
        }
        $(".mid").append(htmlContent);
        displayedMessages[time] = true;
    }


    function fetchAndDisplayMessages() {
        $.get("http://localhost/ChatApp/PHP_BACKEND/chat.php", function (data) {
            if (!userLoggedIn && data && data.logged) {
                console.log("Logged in user: " + data.logged);
                loged = data.logged;
                $(".dp").css("display", "none");
                $(".navbar-nav").append(`<li class="nav-item">
                    <a class="nav-link d-flex" href="./PHP_BACKEND/logout.php">${data.logged}</a>
                </li>`);
                userLoggedIn = true;
            }
            if (data && data.messages && data.email && data.name && data.time) {
                for (var i = 0; i < data.messages.length; i++) {
                    var email = data.email[i];
                    var senderName = data.name[i];
                    var message = data.messages[i];
                    var time = data.time[i];

                    if (!isMessageDisplayed(time)) {
                        displayMessage(email, senderName, message, time);
                    }
                }
            }
        });
    }
    fetchAndDisplayMessages();
    setInterval(fetchAndDisplayMessages, 500);


    $("#SendForm").submit(function (event) {
        event.preventDefault();
        var message = $("#messageInput").val();
        var email = loged;

        if (message.trim() !== "") {
            var dataToSend = {
                email: email,
                message: message
            };
            $.ajax({
                type: "POST",
                url: "http://localhost/ChatApp/PHP_BACKEND/chat.php",
                data: JSON.stringify(dataToSend),
                contentType: "application/json",
                success: function (response) {
                    $("#messageInput").val("");
                },
                error: function (error) {
                    console.error("Error sending message:", error);
                }
            });
        }
    });

});
