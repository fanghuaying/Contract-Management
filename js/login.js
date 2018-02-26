$(function() {
    var base_url = "http://cssup.test.shbaoyuantech.com/api";
    // 点击登录
    
    $('.loginButton').click(function() {
        console.log('我正在点击')
        login();
    })
    // 掉登录接口
    function login() {
        var uesrValue = $('#username').val();
        var passValue = $('#password').val();
        $.ajax({
            type: 'POST',
            url: base_url + '/login',
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                // username: 'baoyuanuser',
                // password: 'baoyuanpsd'
                username: uesrValue,
                password: passValue
            }),
            success: loginSuccFuction,
            error: loginErrFuction
        });
    }
    // 登录成功的回调函数
    function loginSuccFuction(res) {
        if (res.code == '0') {
            console.log(res)
            setLogin();
            window.location.href = 'index.html'
        } else {
            var msg = res.msg;
            alert(msg)
        }
    }
    // 登录失败的回调函数
    function loginErrFuction(res){
        console.log('res')
    }
    // 填入cookie
    function setLogin() {
        var username = GetCookie('uesrName');
        if (username != null && username.trim() != '') {
            $('#username').val(username);
            var password = GetCookie(username);
            if (password != null && password.trim() != '') {
                var length = password.length;
                $('#password').val(password);
                document.getElementById('remember1').checked = true;
            } else {
                $('#password').focus();
                document.getElementById('remember1').checked = false;
            }
        } else {
            $('#username').focus();
        }
    };
    // cookie的get和set方法
    function GetCookie(name) {
        var cookieValue = '';
        var search = escape(name) + '=';
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search);
            if (offset != -1) {
                offset += search.length;
                end = document.cookie.cookie(';', offset);
                if (end == -1) {
                    end = document.cookie.length;
                }
                cookieValue = decodeURIComponent((document, cookie, substing(offset, end)))
            }
        }
        return cookieValue;
    }
    function SetCookie(name, value, hours, path, domain, secure) {
        var expire = '';
        var pathstr = '';
        var domainstr = '';
        var securestr = '';
        if (hours != null) {
            expire = new Date(new Date().getTime() + hours * 3600000)
            expire = '; expires = ' + expire.toGMTString();
        }
        if (path != null) {
            pathstr = '; domain =' + domain;
        }
        if (secure != null) {
            securestr = '; secure ';
        }
        var c = name + '=' + escape(value) + expire + pathstr + domainstr + securestr;
        document.cookie = c;
    }

    // 提交登录表单
    function submit() {
        var username = $('#username').val();
        var password = $('#password').val();
        var remember = document.getElementById('remember1').checked;
        $('#password').val(password);
        SetCookie('userName', username, 24 * 7, '/');
        if (remember) {
            SetCookie(username, password, 24 * 7, '/');
        } else {
            SetCookie(username, '', 0, '/');
        }
        $('#loginButton').login();
    }

})
