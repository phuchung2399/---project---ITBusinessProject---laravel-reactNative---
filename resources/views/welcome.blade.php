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
    <!-- <img src="{{ asset('storage/slides\/tbibZe2Cxn9OgPHsdYvr3fAGADIPxO4wHOcPvGYk.jpeg') }}" alt=""> -->

    <form method="POST" action="{{URL::action('demoController@demo')}}" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="{!! csrf_token() !!}" />
        <input type="text" id="title" name="title">
        <input type="submit" value="ok" />
    </form>
    @if($errors->any())
    @foreach ($errors->all() as $error)
    <h3>{{!! $error !!}}</h3>
    @endforeach
    @endif


    <!-- <script>
        function a() {

            var images = document.getElementById("image");
            var title = document.getElementById("title").value;
            var file = images.files;
            var image = file[0].name;
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            xhr.send(formData);

            console.log(image);
            console.log(title);

            $.ajax({
                method: "PUT",
                url: "http://127.0.0.1:8000/api/v1/slide/4d33803f-8d01-4b86-86db-41383df22672",
                data: {
                    title: title,
                    image: image
                },
                success: function(data) {
                    console.log(JSON.stringify(data))
                },
                error: function(data) {
                    alert("The content is not found")
                }
            })
        }
    </script> -->
</body>

</html>