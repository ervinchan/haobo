(function (Vue, $, api) {
    var vm = new Vue({
        el: '#login',
        data: {
            loginInfo: {}
        },
        methods: {
            login: function () {
                if(!this.loginInfo.userName || !this.loginInfo.pwd){
                    return $.toast('账号和密码为必填！');
                }
                $.showIndicator();
                api.login_action().then(function (result) {
                    $.hideIndicator();
                }.bind(this), function (e) {
                    $.alert(e);
                    $.hideIndicator();
                });
            }
        },
        ready: init(function () {
            //$.scope().banners$$load();
        })
    });
})(Vue, Zepto, jQuery.api);