$(document).ready(function () {
    $.get("http://localhost/ChatApp/PHP_BACKEND/chat.php", function (data) {
        if (data.email) {
            console.log("Logged in user: " + data.email);
        }
        for (var i = 0; i < data.messages.length; i++) {
            var senderName = data.name[i];
            var message = data.messages[i];
            var time = data.time[i];

            console.log("Sender: " + senderName);
            console.log("Message: " + message);
            console.log("Time: " + time);
        }
    });
});
