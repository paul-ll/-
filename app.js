var config = require('comm/script/config')
var amapFile = require('./dist/amap-wx.js')
App({
  globalData:{  
    appid:'wx80dc403e157187d9',//appid需自己提供  
    secret:'c7dbac08bbe8c09b4d10c2e255a66508',//secret  
  
    },
     onLaunch: function () {  
     var that = this  
     console.log(11)
     wx.clearStorageSync()
     var user=wx.getStorageSync('user') || {};    
     var userInfo=wx.getStorageSync('userInfo') || {};   
     var code;
     if((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600))&&(!userInfo.nickName)){   
        console.log(22)
        wx.login({    
        success: function(res){   
          console.log(res)
          code=res.code;
            if(res.code) {  
                wx.getUserInfo({  
                    success: function (res) {  
                        var objz={};  
                        objz.avatarUrl=res.userInfo.avatarUrl;  
                        objz.nickName=res.userInfo.nickName;  
                        console.log(objz);  
                        wx.setStorageSync('userInfo', objz);//存储userInfo  
                    }  
                });  
                var d=that.globalData;//这里存储了appid、secret、token串    
                var l='https://api.weixin.qq.com/sns/jscode2session?appid='+d.appid+'&secret='+d.secret+'&js_code='+res.code+'&grant_type=authorization_code';    
                
                wx.request({    
                    url: l,    
                    data: {},    
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
                    // header: {}, // 设置请求的 header    
                    success: function(res){  
                    console.log(res) 
                          var obj={};
                        obj.openid=res.data.openid;    
                        obj.expires_in=Date.now()+res.data.expires_in;    
                        console.log(obj);  
                        wx.setStorageSync('user', obj);//存储openid    
                    }    
                }); 
                // access_token
                wx.request({    
                    url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+d.appid+'&secret='+d.secret+'&code='+res.code+'&grant_type=authorization_code',    
                    data: {},    
                    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
                    // header: {}, // 设置请求的 header    
                    success: function(res){  
                    console.log(res) 
                      var obj_token={};
                          
                        obj_token.openid=res.data.openid;    
                        obj_token.access_token=res.data.access_token;    
                        console.log(obj_token);  
                        wx.setStorageSync('obj_token', obj_token);//存储token    
                    }    
                }); 

                 
            }else {  
                console.log('获取用户登录态失败！' + res.errMsg)  
            }            
        }    
      });   
    }   
   },  
  // onLaunch: function() {
  //   // 获取用户信息
  //   this.getUserInfo()
  //   // //初始化缓存
  //   this.initStorage()
  // },
  // getUserInfo:function(cb){
  //   var that = this
  //   wx.login({
  //     success: function (red) {
  //       console.log(red)
  //       wx.getUserInfo({
  //         success: function (res) {

  //            var code = res.code;
  //       if (code) {
  //         console.log('获取用户登录凭证：' + code);
  //       } else {
  //         console.log('获取用户登录态失败：' + res.errMsg);
  //       }
  //           console.log(res)
  //           wx.setStorage({
  //           key: 'uid',
  //           data: 69
  //         })

  //           that.globalData.userInfo = res.userInfo
  //           typeof cb == "function" && cb(that.globalData.userInfo)
  //         }
  //       })
  //     }
  //   })
  // },






  getCity: function() {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'b615b3f4ff1e35e90835dc07ad211c34'});
    myAmapFun.getRegeo({
      success: function(data){
        console.log()
        return data[0].regeocodeData.addressComponent
      },
      fail: function(info){
        wx.showModal({title:info.errMsg})
      }
    })
  },
  initStorage: function() {
    wx.getStorageInfo({
      success: function(res) {
        // 判断电影收藏是否存在，没有则创建
        if (!('film_favorite' in res.keys)) {
          wx.setStorage({
            key: 'film_favorite',
            data: []
          })
        }
        // 判断人物收藏是否存在，没有则创建
        if (!('person_favorite' in res.keys)) {
          wx.setStorage({
            key: 'person_favorite',
            data: []
          })
        }
        // 判断电影浏览记录是否存在，没有则创建
        if (!('film_history' in res.keys)) {
          wx.setStorage({
            key: 'film_history',
            data: []
          })
        }
        // 判断人物浏览记录是否存在，没有则创建
        if (!('person_history' in res.keys)) {
          wx.setStorage({
            key: 'person_history',
            data: []
          })
        }
        // 个人信息默认数据
        var personInfo = {
          name: '',
          nickName: '',
          gender: '',
          age: '',
          birthday: '',
          constellation: '',
          company: '',
          school: '',
          tel: '',
          email:'',
          intro: ''
        }
        // 判断个人信息是否存在，没有则创建
        if (!('person_info' in res.keys)) {
          wx.setStorage({
            key: 'person_info',
            data: personInfo
          })
        }
        // 判断相册数据是否存在，没有则创建
        if (!('gallery' in res.keys)) {
          wx.setStorage({
            key: 'gallery',
            data: []
          })
        }
        // 判断背景卡选择数据是否存在，没有则创建
        if (!('skin' in res.keys)) {
          wx.setStorage({
            key: 'skin',
            data: ''
          })
        }
      }
    })
  }
})