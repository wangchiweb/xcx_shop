//index.js
//获取应用实例
const app = getApp()
const apihost = app.globalData.apiUrl;  //本地

Page({
  //点击登录
  login:function(res){
    // console.log(res);
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: ''+apihost+'/api/login', 
            method: 'post',
            data: {
              code: res.code
            },
            success (res) {
              // console.log(res.data.data.token);
              wx.setStorageSync('key',res.data.data.token);
              let value=wx.getStorageSync('key');
              // console.log(value); 
              
            }
          })
          
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  //获取商品列表页的数据
  getgoodslist:function(){
      let _this=this;
      wx.request({
        url:""+apihost+"/api/list",
        data:{
          page:_this.data.page,
          size:_this.data.pagesize
        },
        header: {
              'content-type': 'application/json' // 默认值
            },
        success (res) {
          // console.log(res.data.data.list);
          let new_list=_this.data.list.concat(res.data.data.list);
          // console.log(new_list);    
          _this.setData({
            list:new_list
          })
        }
      })
  },

  //点击商品信息，页面跳转至商品详情页
  detail:function(res){
    // console.log(res);
    //获取商品id
    let goods_id=res.currentTarget.id;
    // console.log(goods_id);
    //跳转页面
    wx.redirectTo({
      url: '/pages/detail/detail?goods_id='+goods_id,
    })
  },
  
  //轮播图
  data: {
    background: ['/image/discount-banner.jpg', '/image/draw-banner.jpg', '/image/nursing-banner.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    list:[],
    page: 1,   //商品列表--页号
    pagesize: 10,   //商品列表--大小
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom:function(){
    console.log(123456);
    this.data.page++;
    this.getgoodslist();
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    let _this=this;
    //获取商品列表页的数据
    _this.getgoodslist();
    _this.login();


    // //发起网络请求
    // wx.request({
    //   url: ''+apihost+'/api/test', //仅为示例，并非真实的接口地址
    //   data: {
    //     x: 'xxx',
    //     y: 'yyy'
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     // console.log(res.data)
    //     _this.setData({
    //       goods_id :res.data.goods_id,
    //       goods_name: res.data.goods_name,
    //       price: res.data.price
    //     })
        
    //   }
    // })
    

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
      hasUserInfo: true,
    })
  }
})
