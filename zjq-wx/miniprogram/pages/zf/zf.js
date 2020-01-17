// pages/zf/zf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issh:0,
    list:[],
    a:''
  },
  loadMore:function(){},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var issh = options.issh;
    var list = wx.getStorageSync('list')
    var id = options.id;
    var sort = options.sort;
    var num = options.num;
    if (sort){
      if (sort == '6') {
        this.setData({ a: "nc_xinshops" });
      } else if (sort == '5') {
        this.setData({ a: "nc_huishops" });
      } else {
        this.setData({ a: "nc_shops" });
      }
      this.loadMore();
    }else{
      this.setData({list, issh,a: "nc_car" });
    }
    console.log(this.data.issh)
    console.log(this.data.a)
    console.log(this.data.list)
 
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