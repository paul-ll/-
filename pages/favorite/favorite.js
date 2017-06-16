var youyan = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')

Page({
  data:{
    film_favorite: [],
    person_favorite: [],
    show: 'film_favorite',
    // nullTip: filmNullTip,
    p:1,
    pcount:15
  },
  onLoad:function(options){
    var that = this
    var uid = options.uid;
    youyan.getUnusedTicketList.call(that,config.apiList.getUnusedTicketList,uid,that.data.p,that.data.pcount);
    youyan.getUsedTicketList.call(that,config.apiList.getUsedTicketList,uid,that.data.p,that.data.pcount);
    wx.stopPullDownRefresh()
  },
  viewgetTicketDetail: function(e) {
		var data = e.currentTarget.dataset
    console.log(data.ticket_id)
		wx.navigateTo({
			url: "../getTicketDetail/getTicketDetail?ticket_id=" + data.ticket_id
		})
  },
  changeViewType: function(e) {
  var data = e.currentTarget.dataset
  

    this.setData({
      show: data.type,
      // nullTip: data.type == 'film_favorite' ? filmNullTip : personNullTip
    })
  }
})