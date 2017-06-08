(function (Vue, $, api) {
    window.vm = new Vue({
        el: '#index',
        data: {
            banners: [],
            tabs: [
                {icon: 'icon shouye', text: '首页', active: true, href: 'index.html'},
                {icon: 'icon dingdan', text: '订单', href: 'order.html'},
                {icon: 'icon wode', text: '我的', href: 'profile.html'}
            ],
            pays: [
                {
                    key: 'weixin',
                    text: '微信',
                    desc: ''
                },
                {
                    key: 'message',
                    text: '短信',
                    desc: ''
                }
            ],
            rqList: [],
            pay_mode:"weixin"
        },
        methods: {
            banners$$load: function () {
                //$.showIndicator();
                api.get_weixin_banner().then(function (banners) {
                    this.banners = banners;
                    $.hideIndicator();
                }.bind(this), function (e) {
                    $.alert(e);
                    $.hideIndicator();
                });
                api.get_hot_products().then(function (products) {
                    this.promotions = products;
                    $.hideIndicator();
                }.bind(this), function (e) {
                    $.alert(e);
                    $.hideIndicator();
                });
            },
            buy:function(id){
                var self = this;
                layer.open({
                  type: 1,
                  title:'收取方式',
                  anim: 'up',
                  style: 'width:85%;border-radius:4px;-webkit-animation-duration: .5s; animation-duration: .5s;',
                  content:$("#dialog").html(),
                  btn: ['确认', '取消'],
                  success:function(){
                    
                  },
                  yes: function(index){
                     $.scope().buySubmit(id)
                      
                  }
                })
            },
            buySubmit:function(id){
                switch (this.pay_mode) {
                    case 'weixin':
                        $.showIndicator();
                        api.wx_buy(id).then(function (data) {
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
                    case 'message':
                        $.alert('您选择了短信接收')
                        break;
                    default:
                        $.alert('请选择收取方式');
                        break;
                }
            }
        },
        ready: init(function () {
            $.scope().banners$$load();
        })
    });
})(Vue, Zepto, jQuery.api);