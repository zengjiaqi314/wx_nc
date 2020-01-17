// pages/menu/menu.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list1:[],
    list2:[],
    list3:[],
    list4:[],
  },
  tz2: function (e) {
    var sort = e.currentTarget.dataset.sort;
    var id = e.currentTarget.dataset.id;
    var path = `/pages/details/details?sort=${sort}&id=${id}`
    //console.log(path)
    wx.navigateTo({
      url: path,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection("nc_shops")             //指定集合
      .where({ sort: "1" })               //指定条件
      .get()                              //获取
      .then(res => {                     //查询成功回调
        var list = res.data;
        list.splice(0, list.length - 3)
        this.setData({ list1: list })
      })
      .catch(err => { console.log(err) }) //查询失败回调
    db.collection("nc_shops")             //指定集合
      .where({ sort: "2" })               //指定条件
      .get()                              //获取
      .then(res => {                     //查询成功回调
        var list = res.data;
        list.splice(0, list.length - 3)
        this.setData({ list2: list })
      })
      .catch(err => { console.log(err) }) //查询失败回调
    db.collection("nc_shops")             //指定集合
      .where({ sort: "3" })               //指定条件
      .get()                              //获取
      .then(res => {                     //查询成功回调
        var list = res.data;
        list.splice(0, list.length - 3)
        this.setData({ list3: list })
      })
      .catch(err => { console.log(err) }) //查询失败回调
    db.collection("nc_shops")             //指定集合
      .where({ sort: "4" })               //指定条件
      .get()                              //获取
      .then(res => {                     //查询成功回调
        var list = res.data;
        list.splice(0, list.length - 3)
        this.setData({ list4: list })
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