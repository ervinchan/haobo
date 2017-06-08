(function (Vue, $, api) {
    window.vm = new Vue({
        el: '#userCenter',
        data: {
            tabs: [
                {icon: 'icon shouye', text: '首页', href: 'index.html'},
                {icon: 'icon dingdan', text: '订单', href: 'order.html'},
                {icon: 'icon wode', text: '我的', active: true, href: 'profile.html'}
            ],
            profile: {}
        },
        methods: {
            profile$$load: function () {
                $.showIndicator();
                api.profile().then(function (data) {
                    console.log(data);
                    this.profile = data;
                    $.hideIndicator();
                }.bind(this), function (msg) {
                    $.hideIndicator();
                    $.alert(msg);
                });
            },
            modifyPhone:function(){
                layer.open({
                  type: 1,
                  anim: 'up',
                  style: 'width:85%;border-radius:4px;-webkit-animation-duration: .5s; animation-duration: .5s;',
                  content:$("#dialog").html(),
                  btn: ['确认', '取消']
                })
            },
            getCode:function(){
            	alert(1)
            	api.getCode('').then(function(){

            	})
            }
        },
        ready: init(function () {
            $.scope().profile$$load();
        })
    });
})(Vue, Zepto, jQuery.api);