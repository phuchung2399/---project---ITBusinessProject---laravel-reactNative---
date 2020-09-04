/**
 * logout
 **/
function logout() {
  var token = localStorage.getItem("nail_token");
  $.ajax({
    method: "post",
    url: "http://13.124.107.54//api/v1/admin/logout",
    type: "json",
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      localStorage.removeItem("nail_token");
      alert("Đã đăng xuất");
      window.location.replace(
        "file:///E:/admin-nail_app/index/login/index.html"
      );
    },
    error: function (errors) {
      console.log(errors);
    },
  });
}
