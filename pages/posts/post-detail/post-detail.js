var postdatas = require('../../../data/posts-data.js')
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayingMusic: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var postid = options.id;
        // 传递数据到上面的data
        this.data.currentPostid = postid
        this.setData({
            postdata: postdatas.postList[postid]
        });

        var postsCollected = wx.getStorageSync('posts_Collected')
        if (postsCollected) {
            var postCollected = postsCollected[postid];
            if (postCollected) {
                this.setData({
                    collected: postCollected
                })
            } else {
                postsCollected[postid] = false;
                wx.setStorageSync('posts_Collected', postsCollected);
            }
        } else {
            postsCollected = {};
            postsCollected[postid] = false;
            wx.setStorageSync('posts_Collected', postsCollected);
        }

        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postid) {
            this.setData({
                isPlayingMusic: true
            })
        }

        var that = this;
        wx.onBackgroundAudioPlay(function() {
            that.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = that.data.currentPostid;
        });

        wx.onBackgroundAudioPause(function() {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        });

        wx.onBackgroundAudioStop(function(){
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        });
    },

    onCollectionTap: function(event) {
        var postsCollected = wx.getStorageSync('posts_Collected');
        var postCollected = postsCollected[this.data.currentPostid];
        // 收藏与不收藏相互转换
        postCollected = !postCollected;
        postsCollected[this.data.currentPostid] = postCollected;
        // 更新文章是否收藏的缓存值
        wx.setStorageSync('posts_Collected', postsCollected);
        // 更新数据绑定变量。从而实现切换图片
        this.setData({
            collected: postCollected
        })

        wx.showToast({
            title: postCollected ? '收藏成功' : '取消成功',
            duration: 1000,
        })
    },

    onShareTap: function(event) {
        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ]
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function(res) {
                // res.cancel    用户是否点击了取消
                // res.tapIndex 用户点击了选项的索引
                wx.showModal({
                    title: '确定' + itemList[res.tapIndex],
                    content: '',
                })
            },
        })
    },

    onMusicTap: function(event) {
        var currentPostid = this.data.currentPostid
        var postdata = postdatas.postList[currentPostid]
        var isPlayingMusic = this.data.isPlayingMusic;
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: postdata.music.url,
                title: postdata.music.title,
                coverImgUrl: postdata.music.coverImg
            })
            this.setData({
                isPlayingMusic: true
            })
        }
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