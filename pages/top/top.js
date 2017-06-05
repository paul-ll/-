var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		 menus: [],
		 site:1,
		 page:1,
		 pageLen:10,
		 cate:2,
		films: [],
		hasMore: true,
		showLoading: true,
		start: 0
	},
	onLoad: function() {
	
		var that = this
		that.setData({
			site:douban.site_map().site
		})
		
		console.log(douban.site_map().site)
	
		douban.search_list.call(that, config.apiList.search_list, that.data.site, that.data.page,that.data.pageLen,that.data.cate)
		douban.getCateList.call(that,config.apiList.getCateList,that.data.site)
		// 页面显示
    var span = wx.getSystemInfoSync().windowWidth / that.data.menus.length + 'px';
    that.setData({
      itemWidth: that.data.menus.length <= 5 ? span : '160rpx'
    });
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0,
			site:douban.site_map().site
		})
		douban.search_list.call(that, config.apiList.search_list, that.data.site, that.data.page,that.data.pageLen,that.data.cate)
		console.log(douban.site_map().site)
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			douban.fetchFilms.call(that, config.apiList.top, config.city, that.data.start, config.count)
		}
	},
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../filmDetail/filmDetail?id=" + data.id
		})
	},
	viewFilmByTag: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
		})
	},
	 tabChange: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    });
  }

})