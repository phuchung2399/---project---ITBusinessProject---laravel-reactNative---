var token = localStorage.getItem("nail_token");

/**
 * Create userNotification
 **/
function storeNotification() {
  var token = localStorage.getItem("nail_token");
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  $.ajax({
    method: "post",
    url: "http://13.124.107.54/api/v1/notification/send-notification-store",
    data: {
      massage: title,
      description: description,
    },
    type: "json",
    beforeSend: function (xhr, settings) {
      document.getElementById("input-form-user-notification").style.display =
        "none";
      document.getElementById("send-notification").style.display = "block";
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      alert(data.message);
      document.getElementById("send-notification").style.display = "none";
      document.getElementById("input-form-user-notification").style.display =
        "block";
    },
    error: function (errors) {
      var massage = errors.responseJSON.errors.massage;
      var description = errors.responseJSON.errors.description;
      for (const i in massage) {
        alert(massage[i]);
      }
      for (const i in description) {
        alert(description[i]);
      }
    },
  });
}
