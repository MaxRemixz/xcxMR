// es6 创建一个类
var util = require('../../../../utils/util.js');
class Movie {
    constructor(url) {
        this.url = url;
    }
    // cb callback 指的是接收一个回调函数
    getMovieData(cb) {
        this.cb = cb;
        util.http(this.url, this.processDoubanData.bind(this));
    }

    processDoubanData(data) {
        // 如果data为空值
        if (!data) {
            return;
        }
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        //给一些变量设定默认空值。这样在默认为空的情况下就会使用默认的空值
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large
            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }

        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("丶 "),
            stars: util.convertToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: util.convertToCastString(data.casts),
            castsInfo: util.converToCastInfos(data.casts),
            summary: data.summary
        }
        this.cb(movie);
    }
}

export {Movie}