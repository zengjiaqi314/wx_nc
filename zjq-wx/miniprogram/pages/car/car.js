// pages/car/car.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    dzlist: ['美国', '中国', '巴西', '日本'],
    index1: '',
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    issh:"0",
    index:'',
    qxcb:true,
    qian:0
  },
  bindPickerChange: function (e) {
    this.setData({ index1: e.detail.value })
  },
  // 地址选择
  dz: function (e) {
    this.setData({ index1: e.detail.value })
  },
  // 判断是否为空
  iskong:function(){
    var list=this.data.list[0]
    if(list){
      this.setData({ show2:true })
    }else{
      this.setData({ show2: false })
    }
  },
  // 结算,跳转支付页面
  zf:function(){
    wx.setStorageSync('list', this.data.list)
    var dzid = this.data.index1
    var path = `/pages/zf/zf?issh=${this.data.issh}&dzid=${dzid}`;
    wx.navigateTo({
      url: path,
    });
  },
  //计算
  js:function(){
    var list = this.data.list
    var qian = 0
    for (var i = 0; i < list.length; i++) {
      qian += list[i].price * list[i].num
    }
    this.setData({ qian })
  },
  // 设置删除
  szsc:function() {
    var list=this.data.list
    var list2=[]
    console.log(this.data.list)
    for (var i = 0; i < list.length; i++) {
      if (list[i].cb == true){
        console.log(list[i]._id)
        db.collection("nc_car").doc(list[i]._id).remove()
      }else{
        list2.push(list[i])
      }
    }
    this.setData({ list:list2 });
    this.iskong()
    this.js()
  },
  // 删除
  sc:function() {
    var list2 = this.data.list
    var index = this.data.index
    var id2 = this.data.list[index]._id
    //console.log(id2)
    list2.splice(index, 1)
    //console.log(list2)
    this.setData({ list: list2 })
    db.collection("nc_car").doc(id2).remove()
    this.iskong()
    this.js()
  },

  // 弹窗
  onClose:function() {
    this.setData({ show3: false,show4: false });
  },
  open:function() {
    this.setData({ show4: true });
  },

  jia: function (e) {
    var id2 = e.currentTarget.dataset.id
    var sort = e.currentTarget.dataset.sort
    var num = e.currentTarget.dataset.num
    var index = e.currentTarget.dataset.index
    var list2 = this.data.list
    num++
    if (sort == 5) {
      num = 1;
      wx.showModal({
        content: '优惠商品限量购买',
        showCancel: false,
      })
    }
    list2[index].num = num
    this.setData({ list: list2 })
    db.collection("nc_car").doc(id2).update({ data: { num } })
    this.js()
  },

  jian: function (e) {
    var id2=e.currentTarget.dataset.id
    var num=e.currentTarget.dataset.num
    var index = e.currentTarget.dataset.index
    var list2 = this.data.list
    num--
    if (num < 1) {
      this.setData({ show3: true,index:index }); 
    }else{
      list2[index].num=num
      this.setData({ list: list2 })
      db.collection("nc_car").doc(id2).update({ data: { num } })
      this.js()
    }
  },
  // 全选
  qx:function(e){
    var value = e.detail.value[0]
    var list = this.data.list
    //console.log(e.detail.value[0])
    if(value){
      for(var i=0;i<list.length;i++){
        list[i].cb=true;
      }
      this.setData({ list })
      console.log(1)
    }else{
      for (var i = 0; i < list.length; i++) {
        list[i].cb = false;
      }
      this.setData({ list })
      console.log(0)
    }
  },
  // 多项选择
  check:function(e){
    var value = e.detail.value[0]
    var list = this.data.list
    var index = e.currentTarget.dataset.index
    //console.log(index)
    //console.log(e.detail.value[0])
    if (value){
      console.log(1)
      list[index].cb = true
      this.setData({ list})
      for (var i = 0; i < list.length; i++) {
        if (list[i].cb==false){
          this.setData({ qxcb: false })
          return
        }else{
          this.setData({ qxcb: true })
        } 
      }
    }else{
      console.log(0)
      list[index].cb=false
      this.setData({ list, qxcb: false })
    }
  },
  // 取货滑块
  onClick(event) {
    var issh = event.detail.name
    this.setData({ issh })
    if(issh==1){
      this.setData({ show1:true })
    }else{
      this.setData({ show1: false })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "findcar"
    }).then(res => { 
      var list = res.result.data
      this.setData({ list})
      //console.log(this.data.list)
      this.iskong()
      this.js()
    }).catch(err => { console.log(err) })
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