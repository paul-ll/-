var douban = require('../../comm/script/fetch');
var config = require('../../comm/script/config');
var util = require('../../util/util');
Page({
  data:{
    getTicketDetail: [],
    minaVersion: 'v2.0'
  },
  onLoad:function(options){
    var that = this
    var ticket_id = options.ticket_id;
    console.log(ticket_id)
    douban.getTicketDetail.call(that,config.apiList.getTicketDetail,ticket_id);
   
  }
})