// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: {},
        navigateTitle: "",
        requestUrl: "",
        totalCount: 0,
        isEmpty: true, //是不是第一次加载。默认是true。就是第一次加载
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var category = options.category;
        this.data.navigateTitle = category;
        var dataUrl = "";
        switch (category) {
            case "正在热映":
                dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
                break;
            case "即将上映的电影":
                dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
                break;
            case "豆瓣电影Top250":
                dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
                break;
        }
        this.data.requestUrl = dataUrl;
        util.http(dataUrl, this.processDoubanData)
    },

    onScrollLower: function(event) {
        var nextUrl = this.data.requestUrl + "?start=" +
            this.data.totalCount + "&count=20";
        util.http(nextUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },

    processDoubanData: function(moviesDouban) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx]
            var title = subject.title
            if (title.length >= 6) {
                title = title.substring(0, 6) + "..."
            }
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp)
        }
        // 判断是不是第一次加载数据。isEmpty如果是true证明是第一次加载数据
        // 那么就需要走else 也就是不需要连接之前的数据
        var totalMovies = {};
        if (this.data.isEmpty) {
            totalMovies = movies;
            this.data.isEmpty = false;
        } else {
            totalMovies = this.data.movies.concat(movies);
        }
        this.setData({
            movies: totalMovies
        });
        this.data.totalCount += 20;
        wx.hideNavigationBarLoading();
        // wx.stopPullDownRefresh();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle,
        })
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
        // 下拉刷新的默认函数是系统定义的onPullDownRefresh

        // var refreshUrl = this.data.requestUrl + "?start=0&count=20";
        // // 需要将原来的数据清空。否则会重新添加。而且把状态改为第一次进入的刷新状态
        // this.data.movies = {};
        // this.data.isEmpty = true;
        // this.data.totalCount=0;
        // util.http(refreshUrl, this.processDoubanData);
        // wx.showNavigationBarLoading();
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