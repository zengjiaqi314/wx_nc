// pages/index/index.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    autoplay: true,//自动播放
    duration: 1500,//滑动间隔时间
    list1:[],
    list2:[]
  },

  tz2:function(e){
    var sort = e.currentTarget.dataset.sort;
    var id = e.currentTarget.dataset.id;
    var path = `/pages/details/details?sort=${sort}&id=${id}`
    //console.log(path)
    wx.navigateTo({
      url: path,
    }); 
  },

  tz1:function(e){
    var sort = e.currentTarget.dataset.sort;
    var path = "/pages/list/list?sort=" + sort;
    //console.log(path)
    wx.navigateTo({
      url: path,
    }); 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("nc_huishops")             //指定集合
      .where({ sort: "5" })               //指定条件
      .get()                              //获取
      .then(res => {                     //查询成功回调
        var list = res.data;
        list.splice(0, list.length - 2)
        this.setData({ list1: list })
        //console.log(res.data)
      })
      .catch(err => { console.log(err) }) //查询失败回调
    db.collection("nc_xinshops")             //指定集合
      .where({ sort: "6" })               //指定条件
      .get()                              //获取
      .then(res => {                     //查询成功回调
        var list = res.data;
        this.setData({ list2: list })
        //console.log(res.data)
      })
      .catch(err => { console.log(err) }) //查询失败回调
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