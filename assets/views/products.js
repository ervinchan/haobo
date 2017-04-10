(function (Vue, $, api) {
    window.vm = new Vue({
        el: '#products',
        data: {
            loading: false,
            page: 1,
            filter: 'none',
            filters: [
                {
                    key: 'none',
                    name: '综合'
                },
                {
                    key: 'sales',
                    name: '销量'
                },
                {
                    key: 'price',
                    name: '价格'
                }
            ],
            products: []
        },
        methods: {
            products$$load: function (callback) {
                //$.showIndicator();
                api.shop_products(this.page, getParam('cats'), this.filter).then(function (products) {
                    this.products = this.products.concat(products);
                    this.loading = false;
                    $.hideIndicator();
                    (callback || function () {
                    })(products);
                }.bind(this), function (err) {
                    this.loading = false;
                    $.hideIndicator();
                    $.alert(err);
                    (callback || function () {
                    })();
                });
            },
            products$$refresh: function () {
                this.page = 1;
                this.products = [];
                this.products$$load(function () {
                    $.pullToRefreshDone('.pull-to-refresh-content');
                });
            },
            products$$infinite: function () {
                this.products$$load(function (products) {
                    if (products.length >= 30) {
                        this.page++;
                    } else {
                        $.detachInfiniteScroll($('.infinite-scroll'));
                        $('.infinite-scroll-preloader').remove();
                    }
                    Vue.nextTick(function () {
                        $.refreshScroller();
                    })
                });
            },
            products$$exchange:function(){
                $.confirm('确定兑换?', function () {
                      $.alert('兑换成功');
                  });
            }
        },
        watch: {
            'filter': function () {
                this.products$$refresh();
            }
        },
        ready: init(function () {
            $.scope().products$$infinite();
            $(document).on('refresh', '.pull-to-refresh-content', function () {
                // 如果正在加载，则退出
                if ($.scope().loading) return;
                $.scope().products$$refresh();
            });
            $(document).on('infinite', '.infinite-scroll-bottom', function () {
                // 如果正在加载，则退出
                if ($.scope().loading) return;
                $.scope().products$$infinite();
            });
            $(document).on('click','.confirm-ok', function () {
                  $.confirm('确定兑换?', function () {
                      $.alert('兑换成功');
                  });
              });
        })
    });
})(Vue, Zepto, jQuery.api);
