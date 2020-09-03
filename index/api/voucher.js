var token = localStorage.getItem("nail_token");
////////////////// - VOUCHER -//////////////////////////

/**
 * fetch data voucher
 **/
$.ajax({
  method: "get",
  url: "http://13.124.107.54/api/v1/voucher",
  type: "json",
  beforeSend: function (xhr, settings) {
    document.getElementById("loading_voucher").style.display = "block";
    xhr.setRequestHeader("Authorization", "Bearer " + token);
  },
  success: function (data) {
    // console.log(document.getElementsByClassName("modal"));
    document.getElementById("loading_voucher").style.display = "none";
    var tbody = document.getElementById("voucher");
    for (const key in data.data) {
      var tr = document.createElement("tr");
      tbody.appendChild(tr);
      tr.innerHTML =
        "<td id='id_number_v'>" +
        data.data[key].voucher_id +
        "</td>" +
        "<td>" +
        data.data[key].voucher_name +
        "</td>" +
        "<td>" +
        data.data[key].quantity +
        "</td>" +
        "<td>" +
        data.data[key].price +
        "</td>" +
        "<td>" +
        "<a data-id=" +
        data.data[key].voucher_id +
        " " +
        "data-name=" +
        data.data[key].voucher_name +
        " " +
        "data-quantity=" +
        data.data[key].quantity +
        " " +
        "data-price=" +
        data.data[key].price +
        " herf=''  data-toggle='modal' data-target='#editvoucher' onclick='detail(this)'><i class='fa fa-edit'></i></a>" +
        "</td>" +
        "<td>" +
        "<a data-id=" +
        data.data[key].voucher_id +
        " herf='' data-toggle='modal' data-target='#deletevoucher' onclick='detail(this)' ><i class='fa fa-trash'></i></a>" +
        "</td>";
    }
  },
  error: function (errors) {
    console.log(errors);
  },
});

/**
 * Create voucher
 **/
function createVoucher() {
  var token = localStorage.getItem("nail_token");
  var voucher_name = document.getElementById("voucher_name").value;
  var price = document.getElementById("price").value;
  var quantity = document.getElementById("quantity").value;
  $.ajax({
    method: "post",
    url: "http://13.124.107.54/api/v1/voucher",
    data: {
      voucher_name: voucher_name,
      price: price,
      quantity: quantity,
    },
    type: "json",
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      document.getElementById("voucher_name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("quantity").value = "";
      alert(data.message);
      fetch();
    },
    error: function (errors) {
      var voucher_name = errors.responseJSON.errors.voucher_name;
      var price = errors.responseJSON.errors.price;
      var quantity = errors.responseJSON.errors.quantity;
      for (const i in voucher_name) {
        alert(voucher_name[i]);
      }
      for (const i in price) {
        alert(price[i]);
      }
      for (const i in quantity) {
        alert(quantity[i]);
      }
    },
  });
}

function fetch() {
  var table = document.getElementById("table_id");
  var tbody = document.getElementById("voucher");
  tbody.remove(tbody.children);
  $.ajax({
    method: "get",
    url: "http://13.124.107.54/api/v1/voucher",
    type: "json",
    beforeSend: function (xhr, settings) {
      let tbody = document.createElement("tbody"); // create again
      let tr = document.createElement("tr");
      let th = document.createElement("th");
      tbody.id = "voucher";
      table.appendChild(tbody);
      tbody.appendChild(tr);
      th.id = "loading_voucher";
      th.colspan = "6";
      th.innerHTML = "Loading....";
      tr.appendChild(th);
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      document.getElementById("loading_voucher").style.display = "none";
      var tbody = document.getElementById("voucher");
      for (const key in data.data) {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);
        tr.innerHTML =
          "<td id='id_number_v'>" +
          data.data[key].voucher_id +
          "</td>" +
          "<td>" +
          data.data[key].voucher_name +
          "</td>" +
          "<td>" +
          data.data[key].quantity +
          "</td>" +
          "<td>" +
          data.data[key].price +
          "</td>" +
          "<td>" +
          "<a data-id=" +
          data.data[key].voucher_id +
          " " +
          "data-name=" +
          data.data[key].voucher_name +
          " " +
          "data-quantity=" +
          data.data[key].quantity +
          " " +
          "data-price=" +
          data.data[key].price +
          " herf=''  data-toggle='modal' data-target='#editvoucher' onclick='detail(this)'><i class='fa fa-edit'></i></a>" +
          "</td>" +
          "<td>" +
          "<a data-id=" +
          data.data[key].voucher_id +
          " herf='' data-toggle='modal' data-target='#deletevoucher' onclick='detail(this)' ><i class='fa fa-trash'></i></a>" +
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
  document.getElementById("voucher_name_edit").value = data.getAttribute(
    "data-name"
  );
  document.getElementById("quantity_edit").value = data.getAttribute(
    "data-quantity"
  );
  document.getElementById("price_edit").value = Math.floor(
    data.getAttribute("data-price")
  );
}

function update(data) {
  // var id = data.getAttribute("data-id");
  var voucher_name = document.getElementById("voucher_name_edit").value;
  var quantity = document.getElementById("quantity_edit").value;
  var price = document.getElementById("price_edit").value;

  $.ajax({
    method: "put",
    url: "http://13.124.107.54/api/v1/voucher/" + id,
    data: {
      voucher_name: voucher_name,
      price: price,
      quantity: quantity,
    },
    type: "json",
    beforeSend: function (xhr, settings) {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: function (data) {
      document.createElement("editvoucher").style.display = "none !important;";
      alert(data.message);
      fetch();
    },
    error: function (errors) {
      console.log();
      if (errors.responseText.length == 80) {
        console.log("Cập nhật thành công");
      } else {
        var voucher_name = errors.responseJSON.errors.voucher_name;
        var price = errors.responseJSON.errors.price;
        var quantity = errors.responseJSON.errors.quantity;
        for (const i in voucher_name) {
          alert(voucher_name[i]);
        }
        for (const i in price) {
          alert(price[i]);
        }
        for (const i in quantity) {
          alert(quantity[i]);
        }
      }
    },
  });
}

function deleteVoucher() {
  $.ajax({
    method: "delete",
    url: "http://13.124.107.54/api/v1/voucher/" + id,
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
