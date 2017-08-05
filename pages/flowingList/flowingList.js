var youyan = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
    data: {
		 suid:'',
		 p:1,
		 pcount:15,
		 cate:2,
		following: [],
		hasMore: true,
		showLoading: true,
		start: 0
    },
    onLoad: function(option) {
		var suid = option.suid

		var that = this
		that.setData({
			suid:suid
		})
		
		console.log(suid)
	
	},
	onShow:function(){
		var that = this
		youyan.getFollowingList.call(that, config.apiList.getFollowingList, that.data.suid, that.data.p,that.data.pcount)
		
	},
	user_info: function(e) {
		var data = e.currentTarget.dataset
		var uid = data.uid
		wx.redirectTo({
			url: '../my/my?suid='+uid
		})
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0,
			site:youyan.site_map().site
		})
		youyan.search_list.call(that, config.apiList.search_list, that.data.site, that.data.page,that.data.pageLen,that.data.cate)
		console.log(youyan.site_map().site)
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			youyan.fetchFilms.call(that, config.apiList.top, config.city, that.data.start, config.count)
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