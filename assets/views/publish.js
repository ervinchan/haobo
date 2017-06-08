(function (Vue, $, api) {
    var vm = new Vue({
        el: '#publish',
        data: {
            loginInfo: {}
        },
        methods: {
            getExInfo: function () {
                //$.showIndicator();
                var E = window.wangEditor
                var editor = new E('#editor')
                // 或者 var editor = new E( document.getElementById('#editor') )
                editor.create()
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