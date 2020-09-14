//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  openButton:function(){
    console.log("尝试打开LED灯!")
    var that;
    var Util = require( 'util.js' );
    
    wx.request({
      url: 'http://59.46.220.242:9090/index/ctrl',
      complete: (res) => {},
      data: Util.json2Form( { status: "on" }),
      dataType: "json",
      fail: (res) => {},
      header: { 
            "Content-Type": "application/x-www-form-urlencoded"
           },
      method: "POST",
      success: function(res){
        console.log(res)
        wx.showToast({
          title: '打开LED成功！',
        })
      }
    })

  },
  shutdownButton:function(){
    console.log("尝试关闭LED灯！")
    var Util = require( 'util.js' );
    Util.json2Form( { status: "off" })
    wx.request({
      url: 'http://59.46.220.242:9090/index/ctrl',
      complete: (res) => {},
      data: Util.json2Form( { status: "off" }),
      dataType: "json",
      fail: (res) => {},
      header: { 
            "Content-Type": "application/x-www-form-urlencoded"
           },
      method: "POST",
      success: function(res){
        console.log(res.data)
        wx.showToast({
          title: '关闭LED成功！',
        })
      }
    })
  }
})
