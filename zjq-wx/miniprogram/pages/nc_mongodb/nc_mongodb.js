// pages/nc_mongodb/nc_mongodb.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    id:'',
    pic:'',
    title:'',
    price:'',
    details:'',
    sort:'',
    xl:''
  },

  gai_shop:function(){
    for(var i=0;i<this.data.id-1;i++){
      var id2=this.data.list[i]._id
      db.collection("nc_shops")
        .doc(id2)                           //_id
        .update({ data: { xl: 1 } })
        .then(res => { console.log(res) })  //更新成功
        .catch(err => { console.log(err) })  //更新失败
    }
  },

  add_shops:function(){
    var id = Number(this.data.id);
    var pic = this.data.pic;
    var title = this.data.title;
    var price = Number(this.data.price);
    var details = this.data.details;
    var sort = this.data.sort;
    var obj = { id, pic, title, price, details, sort }
    db.collection("nc_shops")  //好喝
      .add({ data: obj })
      .then(res => {           //添加成功回调函数
        console.log(res)
        console.log('成功')
        this.setData({ id: '', pic: '', title: '', price: '', details: '', sort: '' }) 
      })
      .catch(err => { console.log(err) }) //添加失败回调函数
  },
 
  find_shops:function(){
    db.collection("nc_shops")             //指定集合
      .get()                              //获取
      .then(res => {                     //查询成功回调
        var id = res.data.length+1
        console.log(id)
        this.setData({ id: id })
        this.setData({ list: res.data })
      })
      .catch(err => { console.log(res) }) //查询失败回调
   },

  //双项绑定
  bindInput(e) {
    // data-开头的是自定义属性，可以通过dataset获取到，dataset是一个json对象
    var dataset = e.currentTarget.dataset;
    // 获取input的当前值value
    var value = e.detail.value;
    // 将input所对应的值更新
    this.data[dataset.item] = value;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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