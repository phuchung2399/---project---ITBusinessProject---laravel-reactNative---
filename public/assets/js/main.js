/**
 * resetPassword
**/
function resetPassword() {
    let arr = (location.href.substring(location.href.indexOf('password') + 9, location.href.length)).split("/"); // get id by url
    let password = document.getElementById('password');
    let confirm_password = document.getElementById('confirm_password');
    let bnt_reset_password = document.getElementById("bnt-reset-password");
    $.ajax({
        method: 'put',
        url: "api/v1/auth/" + arr[0] + "/reset-password/" + arr[1],
        data: {
            password: password.value,
            confirm_password: confirm_password.value
        },
        success: function (data) {
            alert(data.source.message);
            // set null value after update success
            password.value = null;
            confirm_password.value = null;
            // set disabled for input value after update success
            password.disabled = true;
            confirm_password.disabled = true;
            bnt_reset_password.disabled = true;
        },
        error: function (errors) {
            console.log(errors)
            var password = errors.responseJSON.errors.password;
            var confirm_password = errors.responseJSON.errors.confirm_password
            for (const i in password) {
                alert(password[i]);
            }
            for (const i in confirm_password) {
                alert(confirm_password[i]);
            }
        }
    })
}

/**
 * preventBack
 * disable back on web 
 * 
**/
function preventBack() {
    window.history.forward();
}
setTimeout("preventBack()", 0);
window.onunload = function () {
    null
};

/**
 * disableF5
 * disableF5 disable F5 for web
 * 
**/
function disableF5(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };
$(document).on("keydown", disableF5);

