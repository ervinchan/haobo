(function (Vue, $, api) {
    window.vm = new Vue({
        el: '#newsList',
        data: {
            news: [
                {
                    url: 'weixin',
                    tit:"圣保罗锦:巴西红牛VS博塔弗SP",
                    src:"http://www.6383.com/Uploads/Picture/20170309/58c0f9a1b6f31.jpg",
                    text: '微信支付',
                    desc: '',
                    time: '2017/3/27 6:00:00'
                },
                {
                    url: 'weixin',
                    tit:"圣保罗锦:巴西红牛VS博塔弗SP2",
                    src:"http://www.6383.com/Uploads/Picture/20170309/58c0f9a1b6f31.jpg",
                    text: '微信支付',
                    desc: '',
                    time: '2017/3/27 6:00:00'
                }
            ]
        },
        methods: {
            pay$$load: function (oid) {
                //$.showIndicator();
                api.order_detail(oid).then(function (order) {
                    this.order = order;
                    $.hideIndicator();
                }.bind(this), function (msg) {
                    $.hideIndicator();
                    $.alert(msg);
                })
            },
            pay$$payment: function () {
                switch (this.pay_mode) {
                    case 'weixin':
                        var oid = window.getParam('id');
                        $.showIndicator();
                        api.wx_pay(oid).then(function (data) {
                            WeixinJSBridge.invoke('getBrandWCPayRequest', data, function (res) {
                                    $.hideIndicator();
                                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                                        $.alert('支付成功', function () {
                                            window.location.href = 'finish.html?id=' + window.getParam('id');
                                        });
                                    }
                                }
                            );
                        }.bind(this), function (msg) {
                            $.hideIndicator();
                            $.alert(msg);
                        });
                        break;
                    case 'xianxia':
                        window.location.href = 'finish.html?id=' + window.getParam('id');
                        break;
                    default:
                        $.alert('请选择支付方式');
                        break;
                }
            }
        },
        ready: init(function () {
            $.scope().pay$$load(window.getParam('id'));

        })
    });
})(Vue, Zepto, jQuery.api);