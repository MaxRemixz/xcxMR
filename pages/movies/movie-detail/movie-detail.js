import {
    Movie
} from 'class/Movie.js';
var app = getApp();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var movieId = options.id;
        var url = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
        var that = this;
        var movie = new Movie(url);
        movie.getMovieData(function(movie) {
            that.setData({
                movie: movie
            })
        })
    },
    // 查看图片
    viewMoviePostImg: function(event) {
        var src = event.currentTarget.dataset.src;
        wx.previewImage({
            urls: [src],
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})