var arr_languages = {
    "login": { "vi": "Đăng nhập", "en": "Login", "cn": "登录" },
    "register": { "vi": "Đăng ký", "en": "Register", "cn": "注册" },
    "create-register": { "vi": "Tạo tài khoản", "en": "Create account", "cn": "创建帐号" },
    "full-name": { "vi": "Tên đầy đủ", "en": "Full name", "cn": "全名" },
    "enter-phonenumber": { "vi": "Nhập số điện thoại", "en": "Enter your phone number", "cn": "输入你的电话号码" },
    "invalid-fullname": { "vi": "Tên không hợp lệ.", "en": "Invalid name.", "cn": "名称无效。" },
    "empty-fullname": { "vi": "Vui lòng nhập tên của bạn.", "en": "Please enter your name.", "cn": "请输入你的名字。" },
    "empty-phonenumber": { "vi": "Vui lòng nhập số điện thoại.", "en": "Please enter your phone number.", "cn": "请输入您的电话号码。" },
    "invalid-phonenumber": { "vi": "Số điện thoại không hợp lệ.", "en": "Invalid phone number.", "cn": "无效的电话号码。" },
    "title-popup": { "vi": "Thông báo", "en": "Notification", "cn": "通知" },
    "btn-ignore": { "vi": "Hủy bỏ", "en": "Cancel", "cn": "取消" },
    "btn-confirm": { "vi": "Xác nhận", "en": "Confirm", "cn": "确认" },
    "empty-otp": { "vi": "Vui lòng nhập mã xác minh.", "en": "Please enter verification code.", "cn": "请输入验证码。" },
    "wrong-otp": { "vi": "Mã xác minh sai.", "en": "Wrong verification code.", "cn": "验证码错误。" },
    "try-again": { "vi": "Có lỗi, vui lòng thử lại sau.", "en": "There was an error, please try again later.", "cn": "发生错误，请稍后再试。" },
    "empty-password": { "vi": "Vui lòng nhập mật khẩu.", "en": "Please enter password.", "cn": "请输入密码。" },
    "error-password": { "vi": "Mật khẩu nhập lại không giống với mật khẩu.", "en": "Re-password is not the same as the password.", "cn": "重新密码与密码不同。" },
    "register-complete": { "vi": "Đăng ký thành công.", "en": "Sign up success.", "cn": "注册成功。" },
    "phonenumber-registered": { "vi": "Số điện thoại đã được đăng ký.", "en": "Phone number already registered.", "cn": "电话号码已注册。" },
};

$(function() {
    window.setTimeout(function() {
        // $('.zolo-preloader').hide();
        // $('#helloPage').show();
        if (getCookie('language')) {
            if (getCookie('language') == 'vi') {
                $('ul.group-language li.item-language:eq(0)').click();
            } else if (getCookie('language') == 'en') {
                $('ul.group-language li.item-language:eq(1)').click();
            } else if (getCookie('language') == 'cn') {
                $('ul.group-language li.item-language:eq(2)').click();
            }
        } else {
            $('ul.group-language li.item-language:eq(0)').click();
        }

    }, 2700);
});

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyCpZX_9ycBgituf2VvTksMPlsZEIKUTg6I',
    authDomain: 'realtimechatroom-f2e99.firebaseapp.com',
    databaseURL: 'https://realtimechatroom-f2e99.firebaseio.com',
    projectId: 'realtimechatroom-f2e99',
    storageBucket: 'realtimechatroom-f2e99.appspot.com',
    messagingSenderId: '95831065723',
    appId: '1:95831065723:web:58c9bf8204c0d760a20ede',
    measurementId: 'G-Z7KY2K9QRK'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.messaging();

window.onload = function() {
    render();
    $(".carousel").carousel({})
};

function render() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    recaptchaVerifier.render();
}

function phoneAuth() {
    //get the number
    var phonenumber = $('input[name="phonenumber"]').val().replace("0", "+84");
    //phone number authentication function of firebase
    //it takes two parameter first one is number,,,second one is recaptcha
    firebase.auth().signInWithPhoneNumber(phonenumber, window.recaptchaVerifier).then(function(confirmationResult) {
        //s is in lowercase
        window.confirmationResult = confirmationResult;
        coderesult = confirmationResult;
    }).catch(function(error) {
        alert(error.message);
    });
}


function md5(str) {
    var str = CryptoJS.MD5(str).toString();
    return str;
}

function clearForm(form_id) {
    document.getElementById(form_id).reset();
}

function createToken(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function createOTP(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function register(self, page, step) {
    var fullname = $('input[name="fullname"]').val();
    var phonenumber = $('input[name="phonenumber"]').val();
    var input_otp = $('input[name="otp"]').val();
    var password = $('input[name="password"]').val();
    var re_password = $('input[name="re_password"]').val();
    var users = firebase.database().ref('/users/' + phonenumber);
    if (step == 'go_to_register') {
        window.setTimeout(function() {
            $('input[name="fullname"]').focus();
        }, 500);
        next(self, page);
    } else if (step == 'write_name') {
        window.setTimeout(function() {
            $('input[name="phonenumber"]').focus();
        }, 500);
        if (!fullname) {
            open_popup(null, 'empty-fullname', 'fullname');
            return false;
        } else if (!fullname.match(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s|_]+$/)) {
            open_popup(null, 'invalid-fullname', 'fullname');
            return false;
        } else {
            next(self, page);
        }
    } else if (step == 'send_otp') {
        // window.setTimeout(function (){
        //     $('input[name="otp"]').focus();
        // }, 500);
        if (!phonenumber) {
            open_popup(null, 'empty-phonenumber', 'phonenumber');
            return false;
            /*} else if(phonenumber.toString().substring(0, 1) != '0' || !phonenumber.match(/^[0-9]*$/) || phonenumber.length > 11 || phonenumber.length < 10){*/
        } else if (!phonenumber.match(/((09|03|07|08|05)+([0-9]{8})\b)/g)) {
            open_popup(null, 'invalid-phonenumber', 'phonenumber');
            return false;
        }
        users.once('value').then(function(snapshot) {
            var phonenumber_ = (snapshot.val() && snapshot.val().phonenumber) || null;
            var confirm = (snapshot.val() && snapshot.val().confirm) || null;
            if (phonenumber == phonenumber_ && confirm == 'y') {
                open_popup(null, 'phonenumber-registered', 'phonenumber');
            } else {
                users.set({
                    'fullname': fullname,
                    'phonenumber': phonenumber,
                    'otp': '',
                    'confirm': ''
                });
                phoneAuth();
                //alert("otp code: " + otp);
                if (page) {
                    next(self, page);
                }

                $('.resend-text').html('');
                $('.resend-text').html('Gửi lại mã xác nhận sau <span class="resend-time">59</span> giây');
                $('.resend-text').css('color', '');



                var interval = setTimeout(function() {
                    if ($('#registerPage3').css('display') == 'block') {
                        clearInterval(interval);
                        count_time();
                    }
                    $('input[name="otp"]').focus();
                    var time = 59;

                    function count_time() {
                        var timer = setInterval(function() {
                            $('.resend-time').text(time--);
                            if (time == -1) {
                                $('.resend-text').html('');
                                $('.resend-text').html('<span onclick="register(null, null, \'send_otp\')">Gửi lại mã xác nhận</span>');
                                $('.resend-text').css('color', '#ff5a77');
                                clearInterval(timer);
                            }
                        }, 1000);
                    }

                }, 1);
            }
        });
    } else if (step == 'verify_account') {
        if (!input_otp) {
            open_popup(null, 'empty-otp', 'otp');
            return false;
        }
        users.once('value').then(function(snapshot) {
            //console.log(snapshot.val().username)
            var phonenumber_ = (snapshot.val() && snapshot.val().phonenumber) || null;
            console.log(phonenumber + '|' + phonenumber_)
            if (phonenumber == phonenumber_) {
                coderesult.confirm(input_otp).then(function(result) {
                    users.set({
                        'fullname': fullname,
                        'phonenumber': phonenumber,
                        'otp': input_otp,
                        'confirm': 'y'
                    });
                    next(self, page);
                }).catch(function(error) {
                    open_popup(null, 'wrong-otp', 'otp');
                });
            } else {
                open_popup(null, 'try-again', 'otp');
            }
        });
    } else if (step == 'add_password') {

        if (!password) {
            open_popup(null, 'empty-password', 'password');
            return false;
        }

        if (password != re_password) {
            open_popup(null, 'error-repassword', 're_password');
            return false;
        }

        users.once('value').then(function(snapshot) {
            //console.log(snapshot.val().username)
            var otp_ = (snapshot.val() && snapshot.val().otp) || null;
            var phonenumber_ = (snapshot.val() && snapshot.val().phonenumber) || null;
            var confirm = (snapshot.val() && snapshot.val().confirm) || null;
            if (input_otp == otp_ && phonenumber == phonenumber_ && confirm == 'y') {
                users.set({
                    'fullname': fullname,
                    'phonenumber': phonenumber,
                    'otp': otp_,
                    'confirm': 'y',
                    'password': md5(password)
                });
                open_popup(null, 'register-complete', null);
                next(self, page);
                $('input').val('');
            } else {
                open_popup(null, 'try-again', 'otp');
            }
        });
    }

}

function resend_otp(self, page, step) {
    register(self, page, step)();
}

function login() {
    var phonenumber = $('input[name="phonenumber2"]').val();
    var password = document.getElementById('login_password').value;
    var encode_pw = md5(password);
    var users = firebase.database().ref('/users/' + phonenumber);
    var token = createToken(32);
    users.once('value').then(function(snapshot) {
        var otp = (snapshot.val() && snapshot.val().otp) || null;
        var fullname = (snapshot.val() && snapshot.val().fullname) || null;
        var check_password = (snapshot.val() && snapshot.val().password) || null;
        if (encode_pw != check_password) {
            alert('login failed');
        } else {
            users.set({
                'fullname': fullname,
                'phonenumber': phonenumber,
                'password': encode_pw,
                'token': token,
                'confirm': 'y',
                'otp': otp
            });
            alert('login success');
            setCookie('username', check_username, 1);
            setCookie('token', token, 1);
            console.log(getCookie('token'));
            clearForm('login_form');
        }
    });
}

function createRoom() {
    var room_name = document.getElementById('room_name').value;
    //console.log(message)
    firebase.database().ref('room').set({
        'room_id': createToken(32),
        'room_name': room_name,
        'messages': ['hello', 'hi']
    });
}

function chooseLanguage(self, language) {
    $('.item-language').removeClass('active')
    $(self).addClass('active');
    setCookie('language', language, 3650);
    $("[data-languages]").each(function() {
        var object = $(this).data('languages');
        var type_objext = $('[data-languages|="' + object + '"]')[0].nodeName;
        var value = arr_languages[object][language];
        if (type_objext == 'BUTTON' || type_objext == 'SPAN') {
            $('[data-languages|="' + object + '"]').text(value);
        } else if (type_objext == 'INPUT') {
            $('[data-languages|="' + object + '"]').attr("placeholder", value);
        }
    });
}

function nextToRegister() {
    $('#helloPage').hide();
    $('#registerPage').show();
}

function back(self, page) {
    var current_page = $(self).closest('.full-screen');
    current_page.css('left', '2000px');
    current_page.css('animation', 'back 2s');
    setTimeout(function() {
        $('.full-screen').hide();
        $('#' + page).show();
        current_page.css('left', '');
        current_page.css('animation', '');
    }, 400);
}

function next(self, page) {
    var current_page = $(self).closest('.full-screen');
    current_page.css('right', '2000px');
    current_page.css('animation', 'next 2s');
    setTimeout(function() {
        $('.full-screen').hide();
        $('#' + page).show();
        current_page.css('right', '');
        current_page.css('animation', '');
    }, 400);

}


//open popup
function open_popup(e, data_language, focus) {
    if ($(e).attr("btn-type") == 'confirm') {
        $('#btn-confirm').closest('li').removeClass('full-width');
        $('#btn-ignore').css('display', 'block');
        $('#btn-ignore').attr('onclick', 'close_popup()');
        $('#btn-confirm').attr('onclick', $(e).attr('action') + '()');
        $('.zolo-popup').attr('onclick', '');
        $('.zolo-popup').addClass('confirm');
    } else {
        $('.zolo-popup').removeClass('confirm');
        $('#btn-ignore').css('display', 'none');
        $('#btn-confirm').closest('li').addClass('full-width');
        $('#btn-confirm').attr('onclick', 'close_popup()');
    }

    if (data_language) {
        var text = arr_languages[data_language][getCookie('language')];
        $('.zolo-popup p').text(text);
    }

    if (focus) {
        setCookie('focus_to', focus, 1);
    }

    $('.zolo-popup').addClass('is-visible');
}

function close_popup() {
    $('.zolo-popup').removeClass('is-visible');
    if (getCookie('focus_to')) {
        window.setTimeout(function() {
            $('input[name="' + getCookie('focus_to') + '"]').focus();
        }, 500);
    }
}
jQuery(document).ready(function($) {

    $('.zolo-popup').on('click', function(event) {
        if ($(event.target).is('.zolo-popup.is-visible') && !$(event.target).is('.zolo-popup.confirm')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
            if (getCookie('focus_to')) {
                window.setTimeout(function() {
                    $('input[name="' + getCookie('focus_to') + '"]').focus();
                }, 500);
            }
        }
    });
    $('#btn-confirm').on('click', function() {
        $('.zolo-popup').removeClass('is-visible');
        if (getCookie('focus_to')) {
            window.setTimeout(function() {
                $('input[name="' + getCookie('focus_to') + '"]').focus();
            }, 500);
        }

    });
});