// pages/login/login.js
var douban = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
function countdown(that) {
    var second = that.data.second;
    if (second == 0) {
        // console.log("Time Out...");
        that.setData({
            selected:false,
            selected1:true,
            second: 60,
        });
        return;
    }
    var time = setTimeout(function () {
            that.setData({
                second: second - 1
            });
            countdown(that);
        }
        , 1000)
}
Page({
 data:{
  userName:'',
  userPassword:'',
  winWidth: 0,  
  winHeight: 0,  
  // tab切换  
  currentTab: 0,
  phone:'' ,
  reg_code:'',
  code_id:'',
  register:'',
  second: 60,
  selected:false,
  selected1:true
 },

 formSubmit:function(e){
  var that=this;
  console.log(e.detail.value);//格式 Object {userName: "user", userPassword: "password"}

var data = e.detail.value;
var mobile = data.userName;
var password = data.userPassword;

  if (mobile.length != 11) {
          wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
       })
     return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
          wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
       })
     return false;
    }
    if (password.length <6 || password.length>10) {
          wx.showToast({
        title: '密码长度有误！',
        icon: 'success',
        duration: 1500
       })
     return false;
    }

 douban.loginByPhone.call(that, config.apiList.loginByPhone,mobile,password)

// wx.navigateTo({
//     url: '../shop/shop'
//    })



  //获得表单数据
  var objData = e.detail.value;

  if(objData.userName && objData.userPassword){
    console.log(11)
   // 同步方式存储表单数据
   wx.setStorage({
    key:'userName', 
    data:objData.userName
   });
   wx.setStorage({
    key:'userPassword', 
    data:objData.userPassword
   });

   //跳转到成功页面
   
  }
 },
 // 注册
 sendSubmit:function(e){
   var that=this;
  console.log(e.detail.value);//格式 Object {userName: "user", userPassword: "password"}

var data = e.detail.value;
var mobile = data.phone;
var password = data.Password;
var reg_code = data.reg_code;

  if (mobile.length != 11) {
          wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
       })
     return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
          wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
       })
     return false;
    }
    if (password.length <6 || password.length>10) {
          wx.showToast({
        title: '密码长度有误！',
        icon: 'success',
        duration: 1500
       })
     return false;
    }

 douban.doRegister.call(that, config.apiList.doRegister,mobile,reg_code,password,that.data.code_id)

// wx.navigateTo({
//     url: '../shop/shop'
//    })



  //获得表单数据
  var objData = e.detail.value;

  if(objData.phone && objData.Password){
    console.log(11)
   // 同步方式存储表单数据
   wx.setStorage({
    key:'phone', 
    data:objData.phone
   });
   wx.setStorage({
    key:'Password', 
    data:objData.Password
   });

   //跳转到成功页面
   
  }

 },
 // 注册验证码
 sendSmsCode:function(e){
  var that = this;
  console.log()
  var mobile = that.data.phone
  if (mobile.length != 11) {
          wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
       })
     return false;
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
          wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
       })
     return false;
    }
  
  that.setData({
            selected:true,
            selected1:false,
        });
      countdown(that);
  douban.sendSmsCode.call(that, config.apiList.sendSmsCode,mobile)
    console.log(that.data.phone)
 },
 
 // 获取手机号
 inputPhone:function(e){
     this.setData({
      phone:e.detail.value
    })
 },
 loginByThird:function(){
  
 },
 //加载完后，处理事件 
 // 如果有本地数据，则直接显示
 onLoad:function(options){
  var that = this;
  //获取本地数据
  wx.getStorage({
   key: 'userName',
   success: function(res){
    console.log(res.data);
    that.setData({userName: res.data});
   }
  });

  wx.getStorage({
   key: 'userPassword',
   success: function(res){
    console.log(res.data);
    that.setData({userPassword: res.data});
   }
  });

  
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo( {  
  
      success: function( res ) {  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
  
    });  
 },
 onReady:function(){
  // 页面渲染完成
 },
 onShow:function(){
  // 页面显示
 },
 onHide:function(){
  // 页面隐藏
 },
 onUnload:function(){
  // 页面关闭
 },
 /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
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

