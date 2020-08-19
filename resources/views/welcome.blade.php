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
    <!-- <img src="{{ asset('storage/slides\/tbibZe2Cxn9OgPHsdYvr3fAGADIPxO4wHOcPvGYk.jpeg') }}" alt=""> -->
    <!-- <h1>Notification NAil Store</h1>
    <div id="massgae">
    </div>
    <script>
        var count_temp = 0;
        var count_api;
        var source;
        var massgae = document.getElementById("massgae");
        setInterval(function() {
            $.ajax({
                method: "get",
                url: "http://127.0.0.1:8000/api/v1/notification/store/22222224",
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiN2NmYzhhOGI3NTgyYTk3OTA0Yzc2NDkyOGIxYWMyNTliZWQwNzc3MDc3MWVlODBkZjFmZjhiZTM0MmVjNWE4MzliMzMzYjkxZDJjMWU1YzYiLCJpYXQiOjE1OTIzOTA1NzgsIm5iZiI6MTU5MjM5MDU3OCwiZXhwIjoxNjIzOTI2NTc4LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.ZhF8O5nQW_YxrCd8e1TI0gAQtQa7I4APuFOg8kqpNK0qWO4f4En87NEhd_BLY3AShU4vkSIlZi9GXD4blCwBk64vFI4-RSNTxRKVrKiTaobH7jGbvK6x7nIcohuaa2oTc2ul1vfDPBOhNSDoDo4waw-UT8RTiovjZzjISGRbTpiEEk6uFW7LU1do2YnX1DDvdt6YF7V1ZWfaFhQf0agvWfDrXnvvXdoogsj3j6y4UYXxVZuQPrJIi3tvDddf5npwDOZ7nBkeAF11VKZ4MIgVw7D0p2Ehq7B3WookpeRMuhmMwReoMhdPjAnMGSi2YlxxdMd0GsmVcYactKSbXIRenKk0CfbXmab6mx-Q3w7SXBWPaQ05V5zS_U5XEdRriwr4t04ZEib7p8QxV8ko9j4EEAkAoG2yaHGxfO0SgY2tdxn6owMA9LI0WqNtnnw7wZ_-tyotD8PGKx65V_w0T3QkxQV5yprHDKOlKegqt4VOVVZFla1DhaiVmedhNWoLo8eYs9BxPMcizwOQi5UAW_Vc8d-FwAWSZZd5YBelePjx4Gsh0DnYfQrkwSlN8gAfEKkwHGm1kqe_14PIY4Tc0Kq7vAXWAzH7jrkvBNjt9qykeUzpiJUNzyuJPYItJf68nUMBSsiSYvcKa9yKNMzKJ7D4Qd-02w5iHIDlC-DrxOUXT6w');
                },
                success: function(data) {
                    source = data;
                    count_api = data.source.data.length;
                    // 1   console.log("length api: ", count_api);
                },
                error: function(data) {
                    alert("The content is not found")
                }
            })
            // 1  console.log("temp: ", count_temp);
            if (count_api > count_temp) {
                console.log(source);
                count_temp = count_api;
                alert("Có thông báo mới")
                var p = document.createElement('p');
                massgae.appendChild(p);
                p.innerHTML = source.source.data[0].content.title + "</br>" + source.source.data[0].content.description + "</br>" + "<hr>";
            }
        }, 1000);
    </script> -->

    <h1>Notification order 22222224</h1>
    <h1 id="count"></h1>
</body>
<script>
    var count = document.getElementById("count");
    var pusher = new Pusher('99ac8370b9aa803cb529', {
        cluster: 'ap1'
    });
    var test = 'channel-order-notification-storeid.222222230';
    var channel = pusher.subscribe(test);
    channel.bind('event-order-notification', function(data) {
        alert('loz')
        // var triggered = channel.trigger('client-someeventname', {
        //     your: data
        // });
        // $.ajax({
        //     method: "get",
        //     url: "http://127.0.0.1:8000/api/v1/notification/store",
        //     type: 'json',
        //     beforeSend: function(xhr, settings) {
        //         xhr.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOThiOWE3MTk4YWY1Y2FhN2VjYzIzYjgxM2M4ZGVmZjE4YzdjOTZlY2U4MzYwMjFlYjEwMWIxMjVkMTE0M2YxMzg3Nzg0ODM1NmFjNjY1NzUiLCJpYXQiOjE1OTMwNjkwOTAsIm5iZiI6MTU5MzA2OTA5MCwiZXhwIjoxNjI0NjA1MDkwLCJzdWIiOiIyMjIyMjIyNCIsInNjb3BlcyI6W119.0S1SYBHu7nipJJOpEA4LPZp-NSKjsFYxjH0Eh8pk7hcSP5tP59Sqc7PJDrVam2uXNZ4DD70vG80BKKZDXBRcZ6rSTVKyL9kZFRcRavKfjWSTG2mgPWEXIOj5VJVG_V4THeoXYfAwEW0OXqy_uPA1uQ4YDs3ZvFGiN87jsSsVHW94B6Xrf0FiHnzpyzq8bCRyEhiqlhyZKAr2Hwyh9tr8TrUELsmLe5SRV6PmOnGdqIdIHESeE_6RhMIBnCdEZTV7fx2Jt8_4EeD_YYUcVHeqNnIbxa8ECRiXnzV_zPySQtxAZR0H7Q1JlvWxIDOow0xu0utsYarAgxLJTGVBaixzXqXzHzhHcy4UX5GxwCVzqW6nM_vUEzCi9neDdqDxsw4N4ZfxWDM23Ttrhc_FvQ37v8zEL4BwqRJ6wOkxitY3tZULqI9lcJaAK-luZqm0Mf0ZL65sk-dhQiEbOO688cetvg0CbmEPITprqBXlx92936CAsTNcdukbKh_mqW3P7pA3NUBUYywDY6xcxEb6kRNk3_oEXV8SEOUE0FKTLDR08cohFrTm5DZYV4cnHjEsLM2dKc_Ml_4F0658vNZyQ1Phd3s7yHvF2Y-pHo9Sbm0yEUErrmKKXNcRZOen_-8VLqieGHr6wtauh1jbCbWjg0moiUYacnzaVYhYU1fnlLOXlvU');
        //     },
        //     success: function(ahihi) {
        //         count.innerHTML = ahihi.data.unread_notification;
        //         var object = ahihi.data.notifications;
        //         console.log(object);
        //     },
        //     error: function(data) {
        //         alert("The content is not found")
        //     }
        // })
    });

    // console.log(window);
    // Echo.private('my.channel')
    //     .listen('my-event', (e) => {
    //         console.log(e);
    //     });
</script>

</html>