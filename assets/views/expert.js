(function (Vue, $, api) {
    var vm = new Vue({
        el: '#expert',
        data: {
            loginInfo: {}
        },
        methods: {
            getExInfo: function () {
                $.showIndicator();
                api.get_exinfo().then(function (result) {
                    this.banners = banners;
                    $.hideIndicator();
                }.bind(this), function (e) {
                    $.alert(e);
                    $.hideIndicator();
                });
            }
        },
        ready: init(function () {
            $.scope().getExInfo();
        })
    });
})(Vue, Zepto, jQuery.api);