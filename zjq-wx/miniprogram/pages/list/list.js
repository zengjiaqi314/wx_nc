// pages/list/list.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort:'',
    a:'',
    b:'',
    list:[]
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
  loadMore:function(){
    var sort=this.data.sort;
    var a=this.data.a
    db.collection(a)                     //指定集合
      .where({ sort })             //指定条件
      .get()                             //获取
      .then(res => {                     //查询成功回调
        this.setData({ list: res.data })
        //console.log(this.data.list)
      })
      .catch(err => { console.log(err) }) //查询失败回调
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收参数
    var sort = options.sort;
    //console.log(sort)
    //将接收保存data属性中
    if (sort == '6') {
      this.setData({ a: "nc_xinshops", b: "*新品专区*" }); 
    } else if (sort == '5'){
      this.setData({ a: "nc_huishops", b: "*优惠专区*" });
    } else if (sort == '4'){
      this.setData({ a: "nc_shops", b: "*魔幻梦游*" });
    } else if (sort == '3'){
      this.setData({ a: "nc_shops", b: "*草莓系列*" });
    } else if (sort == '2'){
      this.setData({ a: "nc_shops", b: "*星球嚼起*" });
    } else if (sort == '1') {
      this.setData({ a: "nc_shops", b: "*招牌喜乐*" });
    }
    this.setData({sort});
    //调用loadMore
    this.loadMore();
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