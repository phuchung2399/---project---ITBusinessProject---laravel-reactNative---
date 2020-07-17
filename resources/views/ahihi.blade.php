<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>API 1</title>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://code.jquery.com/jquery-migrate-1.4.1.min.js"></script>
    <script src="https://js.pusher.com/6.0/pusher.min.js"></script>
</head>

<body>
    <h1>Notification status - user - 909090</h1>
    <h1 id="count">Đơn hàng đang chờ xác nhận</h1>
</body>
<script>
    function constructor() {
        this.state = {

        }
    }
    var count = document.getElementById("count");
    // Enable pusher logging - don't include this in production
    //  Pusher.logToConsole = true;
    var pusher = new Pusher('99ac8370b9aa803cb529', {
        cluster: 'ap1'
    });
    // 22222224
    var channel = pusher.subscribe('channel-status-order-notification-id.909090');
    channel.bind('event-status-order-notification', function(data) {
        $.ajax({
            method: "get",
            url: "http://127.0.0.1:8000/api/v1/order-user",
            type: 'json',
            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTlhNDUzZjgxY2ZjNDE4MDNkNmNjZjRjYjliMDkwNjg1ZDFiMzU5MjM4NzUxN2NjNzMxYTQ5NzdhNDE1MTYwNDUwM2Q4ZTY2OTQ1NjVmNDAiLCJpYXQiOjE1OTMyNjQ1OTIsIm5iZiI6MTU5MzI2NDU5MiwiZXhwIjoxNjI0ODAwNTkyLCJzdWIiOiI5MDkwOTAiLCJzY29wZXMiOltdfQ.ee8TUptB2W_5_4IzTkFTjghuwu8zPn1i25Cvc_rbfrLflDx3sjBFjHqo_-a4GoozFLWWRimbtnqvqACBxrCbOaUFIJwdgB7rDvmR0JnSvp3404aX5hQA3dss6sNxt4tGiqY8qFEd1PZAAC0lvovYuxi_UXuGk1gYqjD5yHn8A3WzJOaE7XSTHYeRxm1R3W-0DODqz3pT_Ov9w0SzIoqJic0WK6LRkhVe79_oZsMbkPFkO2EewTdfgGZHl1IwzDMCNdQs4IDLTgJuvgeLuWW-6bkgxo6l0Y4Hit9YPgxxRwH6DaHkIMPHgQjqhuY3xwKXocJa6meCOXLXztzJNQ3nA5BW0Uvw3VN1AXJ_j0zreOGLuzFLw1f0PXTuwjw6zuXfXV7bpM4_LpTxQEebSBlMZhnqtjkgZ859O5bmLLiZ48dbIMFs3_oh5pezcJrzSpp0jND6t6dNgi8WsQFNlStg_lY3_fXB_rbAzeIwwSFTBw6ugtWzn2cMwvHm1wJzxi1_H5wQ8cajyNaI9jTBeZaWyWC6emHzzDw18hkxVQhT_yEg_DfXwVEfedz1rNkklyhy_bClAlLhB4Tj6TE29Vxf2VFWWnOImAssceKbIP-ns6f1YXiTZXeAqkzvRB4LSzqrg_tbR_wj76LvwojsVmnEbT5UMk3YE6Xbal9RRwHY2jk');
            },
            success: function(ahihi) {
                count.innerHTML = (ahihi.data[0].status[0].massage);
            //    alert(ahihi.data[0].status[0].massage);

            },
            error: function(data) {
                alert("The content is not found")
            }
        })
    });
</script>

</html>