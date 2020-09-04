function userCount(quantity, created_at, class_name) {
  var ctx = document.getElementById(class_name).getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: created_at,
      datasets: [
        {
          label: "# of Votes",
          data: quantity,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      tooltips: {
        mode: "point",
      },
    },
  });
}

var token = localStorage.getItem("nail_token");
/////////////////////////////// user //////////////////////////////////////////
$.ajax({
  method: "get",
  url: "http://13.124.107.54/api/v1/user/count-user",
  type: "json",
  beforeSend: function (xhr, settings) {
    xhr.setRequestHeader("Authorization", "Bearer " + token);
  },
  success: function (data) {
    var quantity = [];
    var created_at = [];
    for (let index = 0; index < data.data.length; index++) {
      quantity.push(data.data[index].quantity);
    }
    for (let index = 0; index < data.data.length; index++) {
      created_at.push(data.data[index].created_at);
    }
    userCount(quantity, created_at, "user");
  },
  error: function (errors) {
    var location_name = errors.responseJSON.errors.location_name;
    for (const i in location_name) {
      alert(location_name[i]);
    }
  },
});
//////////////////////////////// store /////////////////////////////////////////
$.ajax({
  method: "get",
  url: "http://13.124.107.54/api/v1/store/count-store",
  type: "json",
  beforeSend: function (xhr, settings) {
    xhr.setRequestHeader("Authorization", "Bearer " + token);
  },
  success: function (data) {
    var quantity = [];
    var created_at = [];
    for (let index = 0; index < data.data.length; index++) {
      quantity.push(data.data[index].quantity);
    }
    for (let index = 0; index < data.data.length; index++) {
      created_at.push(data.data[index].created_at);
    }
    userCount(quantity, created_at, "store");
  },
  error: function (errors) {
    var location_name = errors.responseJSON.errors.location_name;
    for (const i in location_name) {
      alert(location_name[i]);
    }
  },
});
////////////////////////////////// order ///////////////////////////////////////
$.ajax({
  method: "get",
  url: "http://13.124.107.54/api/v1/count-order",
  type: "json",
  beforeSend: function (xhr, settings) {
    xhr.setRequestHeader("Authorization", "Bearer " + token);
  },
  success: function (data) {
    console.log(data);
    var quantity = [];
    var created_at = [];
    for (let index = 0; index < data.data.length; index++) {
      quantity.push(data.data[index].quantity);
    }
    for (let index = 0; index < data.data.length; index++) {
      created_at.push(data.data[index].created_at);
    }
    userCount(quantity, created_at, "order");
  },
  error: function (errors) {
    console.log(errors);
  },
});
