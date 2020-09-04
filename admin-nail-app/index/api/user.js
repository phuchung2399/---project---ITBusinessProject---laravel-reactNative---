var token = localStorage.getItem("nail_token");

////////////////// - LOCATION -//////////////////////////
$.ajax({
  method: "get",
  url: "http://13.124.107.54/api/v1/user/user-all",
  type: "json",
  beforeSend: function (xhr, settings) {
    document.getElementById("loading_location").style.display = "block";
    xhr.setRequestHeader("Authorization", "Bearer " + token);
  },
  success: function (data) {
    document.getElementById("loading_location").style.display = "none";
    var tbody = document.getElementById("location");
    for (const key in data.data) {
      var tr = document.createElement("tr");
      tbody.appendChild(tr);
      tr.innerHTML =
        "<input type='hidden' id='user_number' value='" +
        data.data[key].user_id +
        "'" +
        +"/>" +
        "</td>" +
        "<td><img style='width: 100px; height: 100px;' src='" +
        data.data[key].avatar +
        "'/></td>" +
        "<td>" +
        data.data[key].user_name +
        "</td>" +
        "<td>" +
        data.data[key].email +
        "</td>" +
        "<td>" +
        data.data[key].phone +
        "</td>" +
        handleActive(data.data[key].active);
    }
  },
  error: function (errors) {
    console.log(errors);
  },
});

function handleActive(active) {
  if (active == 1) {
    return "<td>Active</td><td><a  href='' data-toggle='modal' data-target='#unlockaccount'><i class='fa fa-unlock-alt'></i></a></td>";
  } else {
    return "<td>Locked</td><td><a  href='' data-toggle='modal' data-target='#lockaccount'><i class='fa fa-lock'></i></a></td>";
  }
}

/**
 * lock account
 **/
function lock() {
  var token = localStorage.getItem("nail_token");
  var id = document.getElementById("user_number").value;
  $.ajax({
    method: "put",
    url: "http://13.124.107.54/api/v1/user/user-lock/" + id,
    type: "json",
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      alert(data.message);
      fetch();
    },
    error: function (errors) {
      console.log(errors);
    },
  });
}

/**
 * unlock account
 **/
function unlock() {
  var token = localStorage.getItem("nail_token");
  var id = document.getElementById("user_number").value;
  $.ajax({
    method: "put",
    url: "http://13.124.107.54/api/v1/user/user-active/" + id,
    type: "json",
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      alert(data.message);
      fetch();
    },
    error: function (errors) {
      console.log(errors);
    },
  });
}

function fetch() {
  var table = document.getElementById("table_id");
  var tbody = document.getElementById("location");
  tbody.remove(tbody.children);
  $.ajax({
    method: "get",
    url: "http://13.124.107.54/api/v1/user/user-all",
    type: "json",
    beforeSend: function (xhr, settings) {
      let tbody = document.createElement("tbody"); // create again
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      tbody.id = "location";
      table.appendChild(tbody);
      tbody.appendChild(tr);
      th.id = "loading_location";
      th.colspan = "6";
      th.innerHTML = "Loading....";
      tr.appendChild(th);
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      let tbody = document.getElementById("location");
      document.getElementById("loading_location").style.display = "none";
      for (const key in data.data) {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.innerHTML =
          "<input type='hidden' id='user_number' value='" +
          data.data[key].user_id +
          "'" +
          +"/>" +
          "</td>" +
          "<td><img style='width: 100px; height: 100px;' src='" +
          data.data[key].avatar +
          "'/></td>" +
          "<td>" +
          data.data[key].user_name +
          "</td>" +
          "<td>" +
          data.data[key].email +
          "</td>" +
          "<td>" +
          data.data[key].phone +
          "</td>" +
          handleActive(data.data[key].active);
      }
    },
    error: function (errors) {
      console.log(errors);
    },
  });
}
