(function (Vue, $, api) {
    var vm = new Vue({
        el: '#reg',
        data: {
            regInfo: {}
        },
        methods: {
            reg: function () {
                var i = /^1[34578]\d{9}$/;
                var t = /^[0-9a-zA-Z]{6,}$/;
                if(!this.regInfo.phone || !this.regInfo.pwd || !this.regInfo.code || !this.regInfo.repwd){
                    return $.toast('请填写完整信息！');
                }else if(!i.test(this.regInfo.phone)){
                    return $.toast('手机号有误');
                }else if(!t.test(this.regInfo.pwd)){
                    return $.toast('密码至少6位');
                }else if(this.regInfo.pwd != this.regInfo.repwd){
                    return $.toast('两次输入的密码不一致');
                }else{
                    return $.toast('请输入正确的验证码');
                }
                $.showIndicator();
                api.reg_action().then(function (result) {
                    this.banners = banners;
                    $.hideIndicator();
                }.bind(this), function (e) {
                    $.alert(e);
                    $.hideIndicator();
                });
            },
            getCode:function(){
                api.get_code().then(function (result) {
                    this.banners = banners;
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