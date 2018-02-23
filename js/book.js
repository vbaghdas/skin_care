/*==========================================================

                    CONTACT FORM

===========================================================*/

 $(document).ready(function(){
    $("#app_submit").click(function(){

        //get input field values
        var user_name = $('#name').val();
        var user_phone = $('#phone').val();
        var user_time = $('#time').val();
        var user_date = $('#date').val();
        var url = "./php_mailer/mail_handler.php"; // the script where you handle the form input.

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "" || user_name == " ") {
            $('#name').css('border-color', '#fa225b');
            proceed = false;
        }
        if (user_phone == "" || user_name == " ") {
            $('#phone').css('border-color', '#fa225b');
            proceed = false;
        }
        if (user_time == "" || user_name == " ") {
            $('#time').css('border-color', '#fa225b');
            proceed = false;
        }
        if (user_date == "" || user_name == " ") {
            $('#date').css('border-color', '#fa225b');
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = {
                'userName': user_name,
                'userPhone': user_phone,
                'userTime': user_time,
                'userTime': user_date
            };
            //Ajax post data to server
            $.ajax({
                type: "POST",
                url: url,
                data: $("#appointment_form").serialize(), // serializes the form's elements.
                success: function (data) {
                    $('#appointment_form').closest('form').find('input[type=text], textarea').val('');
                    $('#appointment_form').closest('form').find('input[type=email], textarea').val('');
                    $('.modal-title').text('Thank You!');
                    $('.modal-body > p').text('We will get back to you within 24 hours to confirm your appointment.');
                    $("#contact-modal").modal('show');
                },
                error: function(response){
                    $('.modal-title').text('Oops!');
                    $('.modal-body > p').text('There seemed to be an error. Please try again.');
                    $("#contact-modal").modal('show');
                }
            });
        }

        return false;
    });

    //reset previously set border colors and hide all time on .keyup()
    $("#appointment_form #name").keyup(function(){
        $("#appointment_form #name").css('border-color', '');
    });

    $("#appointment_form #email").keyup(function(){
        $("#appointment_form #email").css('border-color', '');
    });

    $("#appointment_form #phone").keyup(function(){
        $("#appointment_form #phone").css('border-color', '');
    });

    $("#appointment_form #time").click(function(){
        $("#appointment_form #time").css('border-color', '');
    });
});