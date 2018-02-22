/*==========================================================

                    CONTACT FORM

===========================================================*/

 $(document).ready(function(){
    $("#app_submit").click(function(){

        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_phone = $('input[name=phone]').val();
        var user_time = $('textarea[name=time]').val();
        var user_service = $('textarea[name=service]').val();
        var url = "./php_mailer/mail_handler.php"; // the script where you handle the form input.

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "" || user_name == " ") {
            $('input[name=name]').css('border-color', '#fa225b');
            proceed = false;
        }
        if (user_email == "" || user_name == " ") {
            $('input[name=email]').css('border-color', '#fa225b');
            proceed = false;
        }
        if (user_phone == "" || user_name == " ") {
            $('input[name=phone]').css('border-color', '#fa225b');
            proceed = false;
        }
        if (user_time == "" || user_name == " ") {
            $('textarea[name=time]').css('border-color', '#fa225b');
            proceed = false;
        }
        if (user_service == "" || user_service == " ") {
            $('textarea[name=service]').css('border-color', '#fa225b');
            proceed = false;
        }
        var atpos = user_email.indexOf("@");
        var dotpos = user_email.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=user_email.length) {
            $('input[name=email]').css('border-color', '#fa225b');
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'usertime': user_time,
                'userphone': user_phone
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

    $("#appointment_form #service").click(function(){
        $("#appointment_form #service").css('border-color', '');
    });

});