$(document).ready(function () {
    $.ajax({
        url: 'check_login.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.loggedIn) {
                $('#status').html('Logged in as ' + data.username);
            } else {
                $('#status').html('Not logged in');
            }
        },
        error: function () {
            $('#status').html('Error checking login status');
        }
    });
});