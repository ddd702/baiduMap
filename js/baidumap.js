var baiduMap = {
    map: new BMap.Map('j-baiduMap'),
    currentPoint:{},
    renderMap: function(scale) { //draw a map
        var _this = this;
        _this.getCurrent(function(r) {
            draw(r)
        }, function() {
            alert('get current point fail');
        });
        var draw = function(r) {
            _this.map.centerAndZoom(new BMap.Point(r.point.lng, r.point.lat), scale); // 初始化地图,设置中心点坐标和地图级别
        }
    },
    getCurrent: function(successFn, failFn) {
        var geolocation = new BMap.Geolocation();
        var _this = this;
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                var address = r.address.province + r.address.city + r.address.district + r.address.street + r.address.street_number;
                if (successFn) {
                    successFn(r);
                }

                _this.map.addOverlay(mk);
                _this.map.panTo(r.point);
                var opts = {
                    width: 200, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                    title: address // 信息窗口标题
                        //enableMessage: true, //设置允许信息窗发送短息
                        //message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
                }
                var infoWindow = new BMap.InfoWindow('<span style="color:#777">' + new Date() + '</span>', opts); // 创建信息窗口对象 
                mk.addEventListener("click", function() {
                    _this.map.openInfoWindow(infoWindow, r.point); //开启信息窗口
                });

            } else {
                if (failFn) {
                    failFn();
                }

            }
        }, {
            enableHighAccuracy: true
        })
    }
}
baiduMap.renderMap(12);
