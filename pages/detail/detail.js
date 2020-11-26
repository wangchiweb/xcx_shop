// pages/detail/detail.js
//获取应用实例
const app = getApp()
const apihost = app.globalData.apiUrl;  //本地

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['/image/discount-banner.jpg', '/image/draw-banner.jpg', '/image/nursing-banner.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**发送网络请求--根据goods_id获取商品详情页的数据 */
    
    //接受商品列表页传过来的商品id
    let goods_id=options.goods_id;
    // console.log(goods_id);
    let access_token=wx.getStorageSync('key');
    // console.log(access_token);
    let _this=this;
    wx.request({
      url: apihost+'/api/detail',
      data:{
        goods_id:goods_id,
        access_token:access_token
      },
      success:function(res){
        // console.log(res)
        
        _this.setData({
          detail:res.data.data.detail
        })
      }
    })
  },

  /**
   * 加入购物车
   */
  addcart:function(res){
    // console.log(res);
    let goods_id=res.currentTarget.id;
    // console.log(goods_id);
    let access_token=wx.getStorageSync('key');
    // console.log(access_token);

    wx.request({
      url: apihost+'/api/addcart?access_token='+access_token,
      method:'POST',
      dataType: 'json',
      header: {'content-type':'application/x-www-form-urlencoded'},
      data:{
        goods_id: goods_id
      },
      success:function(res){
        // console.log(res)
        wx.showToast({   //显示消息提示框
          title: '加入购物车成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 跳转至首页
   */
  switchindex:function(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  },

  /**
   * 跳转至购物车列表页
   */
  switchcart:function(){
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  /**
   * 给客服打电话
   */
  makecall:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },

  /**
   * 收藏
   */
  Collection:function(res){
    // console.log(res);
    let goods_id=res.currentTarget.id;
    // console.log(goods_id);
    let access_token=wx.getStorageSync('key');
    // console.log(access_token);
    wx.request({
      url: apihost+'/api/Collection?access_token='+access_token,
      method:'POST',
      dataType: 'json',
      header: {'content-type':'application/x-www-form-urlencoded'},
      data:{
        goods_id: goods_id
      },
      success:function(res){
        // console.log(res)
        wx.showToast({   //显示消息提示框
          title: '收藏成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }

})