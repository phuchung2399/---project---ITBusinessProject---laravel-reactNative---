<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>API</title>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://code.jquery.com/jquery-migrate-1.4.1.min.js"></script>
</head>

<body>
    <input type="file" id="slide_name" name="slide_name" />
    <input type="submit" onclick="a()" />

    <script>
        function a() {
            $image = document.getElementById("slide_name").value;

            console.log($image);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({

                method: "post",
                url: " http://127.0.0.1:8000/api/slide/",
                data: {
                    slide_name: $image,
                },
                success: function(data) {
                    console.log(data)
                },
                error: function() {
                    alert("The content is not found")
                }
            })
        }
    </script>
</body>

</html>