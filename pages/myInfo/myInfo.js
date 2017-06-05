var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var util = require('../../util/util')
var app = getApp();
Page({
  data:{
    skin: '',
     winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    suid:67,
    uid:69,
    p:1,
    data_arr:[],
    feedlist_arr:[],
    myInfo_arr:{},
  },
  onLoad:function(cb){
    var that = this

    console.log(app.globalData.userInfo)
    // 检测是否存在用户信息
    if (app.globalData.userInfo != null) {
      that.setData({
          userInfo: app.globalData.userInfo
      })
    } else {
      app.getUserInfo()
    }
    typeof cb == 'function' && cb()
  },
  onShow:function(){
    var that = this;
		// douban.getEventList.call(that,config.apiList.getEventList,that.data.suid,that.data.p);
    // douban.getFeedList.call(that,config.apiList.getFeedList,that.data.suid,that.data.p);
    douban.getUserProfile.call(that,config.apiList.getUserProfile,that.data.uid,that.data.suid);
    wx.getStorage({
      key: 'skin',
      success: function(res){
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
        if (res.data == "") {
          that.setData({
            skin: config.skinList[0].imgUrl
          })
        } else {
          that.setData({
            skin: res.data
          })
        }
      }
    })
  },
  onPullDownRefresh: function() {
    this.onLoad(function(){
      wx.stopPullDownRefresh()
    })
  },
  viewGridDetail: function(e) {
    var data = e.currentTarget.dataset
    console.log(data.url);
		wx.navigateTo({
			url: "../" + data.url + '/' + data.url
		})
  },
  viewSkin: function() {
		wx.navigateTo({
			url: "../skin/skin"
		})
  },
 
  /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  active_into:function(){
    	wx.navigateTo({
			url: "../my/my"
		})
  },
  addressInto:function(){
    	wx.navigateTo({
			url: "../address/address"
		})
  },
   listInto:function(){
    wx.navigateTo({
      url: "../list/list?uid="+this.data.uid
    })
  },
  ticketInto:function(){
    wx.navigateTo({
      url: "../favorite/favorite?uid="+this.data.uid
    })
  },
  collectionInto:function(){
     wx.navigateTo({
      url: "../collection/collection?uid="+this.data.uid
    })
  },
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  }  
})