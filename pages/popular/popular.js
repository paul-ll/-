var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var amapFile = require('../../dist/amap-wx.js')
var app = getApp()
var city1;
Page({
	data: {
		activeIndex: 0,
		cate:'',
	    menus: [],
	    p:1,
	    distance:[],
	    area_id:2,
	    pcount:15,
	    site:1,
	    lat:[],
	    lon:[],
	    listIds:[],
		cityId:[],
		films: [],
		hasMore: true,
		showLoading: true,
		start: 0,
		bannerList:[],
		eventList:[],
		citys:[],
		city:""

	},
	onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this
    var orlat;
    var orlon;
   
    wx.showNavigationBarLoading()
    wx.hideNavigationBarLoading()
		var myAmapFun = new amapFile.AMapWX({key:'b615b3f4ff1e35e90835dc07ad211c34'});
		  myAmapFun.getRegeo({
	      success: function(data){
	      	console.log(data)
	      	orlat = data[0].latitude;
	      	orlon = data[0].longitude;
	       that.setData({
	       	city:data[0].regeocodeData.addressComponent.province,
	       })

	  //      wx.setNavigationBarTitle({
			// 	title: '我的城市 - ' + that.citys..province
			// })
	      },
	      fail: function(info){
	        wx.showModal({title:info.errMsg})
	      }
	    })

		
		
		

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {

    // 生命周期函数--监听页面显示
    var that = this;

  	douban.getConcentration.call(that,config.apiList.getConcentration,that.data.area_id,that.data.p,that.data.pcount)
		
	douban.getCategory.call(that,config.apiList.getCategory,that.data.area_id)	



  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },

	tabChange: function (e) {
		console.log(e)
	var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.target.dataset.id
    console.log(id)
    that.setData({
    	cate:id,
      	activeIndex: index
    });
    that.onshow();
  },
	onPullDownRefresh: function() {
		var that = this
		that.onShow()
	},
	viewSearch: function() {
		
		wx.navigateTo({
			url: '../search/search'
		})
	},
	 selectRankType: function(e) {
	 	console.log(e.currentTarget.dataset.value)
        wx.navigateTo({
			url: '../switchcity/switchcity?city='+e.currentTarget.dataset.value
		})
    },
    changeList: function(e){
   
    	
    },
    Rad:function(d){
       return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
    },
    GetDistance:function (lat1,lng1,lat2,lng2){
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(lat2);
        var a = radLat1 - radLat2;
        var  b = this.Rad(lng1) - this.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) +
        Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s *6378.137 ;// EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000; //输出为公里
        s = s.toFixed(2); 
        return s;
    },
    viewEnentInfo:function(e){
    	wx.navigateTo({
			url: '../eventInfo/eventInfo?event_id='+e.currentTarget.dataset.event_id
		})
    },
    viewBannerDetail:function(e){
    	 var data = e.currentTarget.dataset
    	wx.navigateTo({
			url: '../eventInfo/eventInfo?event_id='+data.action_id
		})
    }
})
