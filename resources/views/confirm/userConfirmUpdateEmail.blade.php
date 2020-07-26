<!DOCTYPE html>
<html lang="en">
@include('head.head')

<body>
    <div id="container">
        <div id="menu">
            <img id="logo" src='https://drive.google.com/uc?export=view&id=1JHJ5wLLpQfZJ1WXjeGgE-bZa6YzF_ipl' alt="logo">
        </div>

        <div id="format-form">
            <div id="form">
                <input type="hidden" name="_token" value="{!! csrf_token() !!}" />
                <h2>Vui lòng nhấn xác nhận để có thể thay đổi email cho tài khoản</h2>
                <input id="bnt-update-email" type="button" value="Xác Nhận" onclick="updateEmail()">
            </div>
        </div>

        <!-- script -->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="./assets/js/main.js"></script>
</body>

</html>