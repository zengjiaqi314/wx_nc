// pages/list/list.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: '',
    id: '',
    a: '',
    num: 1,
    show: false,
    show2: false,
    show3: false,
    list: []
  },
  ljgm:function(){
    console.log("立即购买")
    var id = this.data.id;
    var sort = this.data.sort;
    var num = this.data.num;
    var path = `/pages/zf/zf?sort=${sort}&id=${id}&num=${num}`
    //console.log(path)
    wx.navigateTo({
      url: path,
    });
  },
  jumpcart:function(){
    var id = this.data.id;
    var sort = this.data.sort;
    var num = this.data.num;
    var cb = 1
    var iszq = 0
    var pic = this.data.list[0].pic;
    var title = this.data.list[0].title;
    var price = this.data.list[0].price;
    // 查询nc_car
    db.collection("nc_car")
      .where({ id,sort })
      .get()               
      .then(res => { 
        if (res.data.length==0){
          //console.log(11)
          // nc_car中插入数据
          db.collection("nc_car")
            .add({ data: { id, sort, pic, title, price, num, cb } })
            .then(res => { console.log("插入成功") }) 
        }else{
          //console.log(22)
          // 修改nc_car数据
          var i = res.data[0]._id
          num = res.data[0].num+this.data.num
          db.collection("nc_car")
            .doc(i)
            .update({ data: { num } })
            .then(res => { console.log("修改成功") })
        }  
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })  
        this.setData({ show: false, show2: false, show3: false, num: 1 });
      })
      .catch(err => { console.log(err) })
  },
  jia: function () {
    var num = this.data.num
    num++
    if(this.data.sort==5) {
      num = 1 ;
      wx.showModal({
        content: '购买数量不能大于限购数量',
        showCancel:false,
      })
    }
    this.setData({ num });
  },

  jian: function () {
    var num=this.data.num
    num--
    if (num < 1) { num = 1 }
    this.setData({ num });
  },

  show1: function () {
    this.setData({ show: true, show2: true, show3: false });
  },
  show2: function () {
    this.setData({ show: true, show3:false, show3: true });
  },

  onClose: function () {
    this.setData({ show: false });
  },

  tz: function () {
    var path = "/pages/car/car";
    //console.log(path)
    wx.navigateTo({
      url: path,
    });
  },
  loadMore: function () {
    var sort = this.data.sort;
    var id = this.data.id;
    var a = this.data.a
    //console.log(a)
    //console.log(id)
    db.collection(a)                     //指定集合
      .where({ id:id })             //指定条件
      .get()                             //获取
      .then(res => {                     //查询成功回调
        var list=res.data;
        if (list[0].time) { 
          list[0].time2 = "距结束还剩 :"
          list[0].price2 = "¥" + list[0].price2
          list[0].xg = " (限购1件)"
        }
        this.setData({ list: res.data })
        //console.log(res.data)
      })
      .catch(err => { console.log(err) }) //查询失败回调
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收参数
    var sort = options.sort;
    var id = options.id;
    //console.log(options)
    //将接收保存data属性中
    if (sort == '6') {
      this.setData({ a: "nc_xinshops" });
    } else if (sort == '5') {
      this.setData({ a: "nc_huishops" });
    } else {
      this.setData({ a: "nc_shops" });
    }
    this.setData({ sort });
    this.setData({ id });
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