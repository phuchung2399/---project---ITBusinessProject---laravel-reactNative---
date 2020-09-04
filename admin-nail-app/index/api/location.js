var token = localStorage.getItem("nail_token");

////////////////// - LOCATION -//////////////////////////
$.ajax({
  method: "get",
  url: "http://13.124.107.54/api/v1/location",
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
        "<td id='id_number_v'>" +
        data.data[key].location_id +
        "</td>" +
        "<td>" +
        data.data[key].location_name +
        "</td>" +
        "<td>" +
        "<a data-name='" +
        data.data[key].location_name +
        " ' " +
        "data-id= " +
        data.data[key].location_id +
        "  herf='' data-toggle='modal' data-target='#editlocation' onclick='detail(this)'><i class='fa fa-edit'></i>" +
        "</td>" +
        "<td>" +
        "<a data-id=" +
        data.data[key].location_id +
        " herf='' data-toggle='modal' data-target='#deletelocation' onclick='detail(this)' ><i class='fa fa-trash'></i></a>" +
        "</td>";
    }
  },

  // deletelocation
  error: function (errors) {
    console.log(errors);
  },
});

/**
 * Create location
 **/
function createVoucher() {
  var token = localStorage.getItem("nail_token");
  var location_name = document.getElementById("location_name").value;
  $.ajax({
    method: "post",
    url: "http://13.124.107.54/api/v1/location",
    data: {
      location_name: location_name,
    },
    type: "json",
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      fetch();
      alert(data.message);
    },
    error: function (errors) {
      var location_name = errors.responseJSON.errors.location_name;
      for (const i in location_name) {
        alert(location_name[i]);
      }
    },
  });
}

function fetch() {
  var table = document.getElementById("table_id");
  var tbody = document.getElementById("location");
  tbody.remove(tbody.children);
  $.ajax({
    method: "get",
    url: "http://13.124.107.54/api/v1/location",
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
          "<td id='id_number_v'>" +
          data.data[key].location_id +
          "</td>" +
          "<td>" +
          data.data[key].location_name +
          "</td>" +
          "<td>" +
          "<a data-name='" +
          data.data[key].location_name +
          " ' " +
          "data-id= " +
          data.data[key].location_id +
          "  herf='' data-toggle='modal' data-target='#editlocation' onclick='detail(this)'><i class='fa fa-edit'></i>" +
          "</td>" +
          "<td>" +
          "<a data-id=" +
          data.data[key].location_id +
          " herf='' data-toggle='modal' data-target='#deletelocation' onclick='detail(this)' ><i class='fa fa-trash'></i></a>" +
          "</td>";
      }
    },
    error: function (errors) {
      console.log(errors);
    },
  });
}

function detail(data) {
  id = data.getAttribute("data-id");
  console.log(id);
  document.getElementById("location_name_edit").value = data.getAttribute(
    "data-name"
  );
}

function updateLocation() {
  var token = localStorage.getItem("nail_token");
  var location_name = document.getElementById("location_name_edit").value;
  $.ajax({
    method: "put",
    url: "http://13.124.107.54/api/v1/location/" + id,
    data: {
      location_name: location_name,
    },
    type: "json",
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      fetch();
      alert(data.message);
    },
    error: function (errors) {
      var location_name = errors.responseJSON.errors.location_name;
      for (const i in location_name) {
        alert(location_name[i]);
      }
    },
  });
}

function deleteLocation() {
  var token = localStorage.getItem("nail_token");
  $.ajax({
    method: "delete",
    url: "http://13.124.107.54/api/v1/location/" + id,
    type: "json",
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      fetch();
      alert(data.message);
    },
    error: function (errors) {
      console.log(errors);
    },
  });
}
