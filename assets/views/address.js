(function (Vue, $, api) {
    window.vm = new Vue({
        el: '#address-form',
        data: {
            address: {},
            dists: []
        },
        methods: {
            address$$submit: function () {
                var self = this;
                if (!this.address.contactor || !this.address.mobile || !this.address.city) {
                    return $.toast('请输入完整的收件信息');
                }else {
                    $.showIndicator();
                    $.confirm('确定兑换?', function () {
                      api.add_addr(self.address.contactor,
                        self.address.mobile,
                        self.address.city,
                        self.address.mCode,
                        self.address.doorplate,
                        getParam('id')).then(function () {
                            $.hideIndicator();
                            $.alert('兑换成功');
                        }, function (msg) {
                            $.alert(msg);
                        })

                    });
                    
                }
            }
        },
        ready: init(function () {
            //$.scope().address$$load(1);
            $("#city-picker").cityPicker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">选择收货地址</h1>\
                </header>'
              });
        })
    });
})(Vue, Zepto, jQuery.api);