// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    current: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**发送网络请求--根据goods_id获取商品详情页的数据 */
    
    //接受商品列表页传过来的商品id
    let goods_id=options.goods_id;
    // console.log(goods_id);
    let _this=this;
    wx.request({
      url: 'http://jd.com/api/detail?goods_id='+goods_id,
      success:function(res){
        // console.log(res.data.data.detail)
        console.log(res)
        _this.setData({
          detail:res.data.data.detail
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

  }
})