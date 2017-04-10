(function (Vue, $, api) {
    window.vm = new Vue({
        el: '#pay',
        data: {
            pay_mode: '',
            order: {
                total_price: 0
            },
            amounts: [
                {
                    key: '500',
                    text: '充值500元',
                    desc: ''
                },
                {
                    key: '1000',
                    text: '充值1000元赠200',
                    desc: ''
                },
                {
                    key: '3000',
                    text: '充值3000元赠800',
                    desc: ''
                },
                {
                    key: '5000',
                    text: '充值5000元赠2000',
                    desc: ''
                }
            ],
            pays: [
                {
                    key: 'weixin',
                    text: '微信支付',
                    desc: ''
                },
                {
                    key: 'xianxia',
                    text: '支付宝支付',
                    desc: ''
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