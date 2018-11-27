
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

        this.getMovieListData(inTheatersUrl);
        // this.getMovieListData(comingSoonUrl);
        // this.getMovieListData(top250Url);
    },

    getMovieListData: function (url) {
        var that = this
        wx.request({
            url: url,
            header: {
                'content-type': 'json'
            },
            success: function (res) {
                that.processDoubanData(res.data)
            },
            fail: function (error) {
                console.log(error)
            }
        })
    },

    processDoubanData:function(moviesDouban){
        var movies = [];
        for (var idx in moviesDouban.subjects){
            var subject = moviesDouban.subjects[idx]
            var title = subject.title
            if(title.length >= 6){
                title = title.substring(0, 6) + "..."
            }
            var temp = {
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp)
        }
        this.setData({
            movies: movies
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