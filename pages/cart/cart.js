// pages/cart/cart.js
//获取应用实例
const app = getApp()
const apihost = app.globalData.apiUrl;  //本地

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取购物车商品列表
    this.getcartlist();
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
   * 获取购物车商品列表
   */
  getcartlist:function(){
    let _this=this;
    let access_token=wx.getStorageSync('key');
    // console.log(access_token);
    wx.request({
      url: apihost+'/api/cartlist?access_token='+access_token,
      success:function(res){
        // console.log(res)
        //  console.log(res.data.data.cartlist)
        _this.setData({
          cartlist:res.data.data.cartlist
        })
      }
    })
  }
})