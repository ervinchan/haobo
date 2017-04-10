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
            promotions: []
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
            }
        },
        ready: init(function () {
            $.scope().banners$$load();
        })
    });
})(Vue, Zepto, jQuery.api);