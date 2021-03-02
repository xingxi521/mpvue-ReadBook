import baseUrl from './baseUrl'
import { get_Fly,post_Fly } from '../utils/http'
export default{
    //获取首页数据
    getHomeData(params){
        return get_Fly(baseUrl.host+baseUrl.homeData,params);
    },
    //获取为你推荐数据
    getRecommend(){
        return get_Fly(baseUrl.host+baseUrl.recommend);
    },
    //获取免费阅读数据
    getFreeRead(){
        return get_Fly(baseUrl.host+baseUrl.freeRead);
    },
    //获取当前最热数据
    getHotBook(){
        return get_Fly(baseUrl.host+baseUrl.hotBook);
    },
    //获取微信小程序openId
    getWxOpenId(params){
        return get_Fly(baseUrl.host+baseUrl.wxOpenId,{
            appId:baseUrl.appId,
            code:params,
            secret:baseUrl.AppSecret
        });
    },
    //微信用户注册
    postWxRegister(params,userinfo){
        return post_Fly(baseUrl.host+baseUrl.wxRegister,{
            openId:params,
            platform:mpvuePlatform,
            ...userinfo
        });
    },
    //获取热门搜索词
    getHotSearchWord(){
        return get_Fly(baseUrl.host+baseUrl.hotSearchWord);
    },
    //关键词搜索
    getSearch(params){
        return get_Fly(baseUrl.host+baseUrl.search,params);
    },
    //获取图书详情
    getDetail(params){
        return get_Fly(baseUrl.host+baseUrl.detail,params);
    },
    //获取图书目录
    getBookCatalog(params){
        return get_Fly(baseUrl.host+baseUrl.bookCatalog,params);
    },
    //图书评分
    getRankSave(params){
        return get_Fly(baseUrl.host+baseUrl.rankSave,params);
    },
    //获取图书存储书架状态
    getBookShelf(params){
        return get_Fly(baseUrl.host+baseUrl.bookShelf,params);
    },
    //加入书架
    getBookSave(params){
        return get_Fly(baseUrl.host+baseUrl.bookSave,{
            shelf:encodeURIComponent(JSON.stringify(params))
        });
    },
    //移除书架
    getBookRemove(params){
        return get_Fly(baseUrl.host+baseUrl.bookRemove,{
            shelf:encodeURIComponent(JSON.stringify(params))
        });
    },
    //获取图书列表
    getSearchList(params){
        return get_Fly(baseUrl.host+baseUrl.searchList,params);
    },
    //获取分类列表
    getCatagoryList(){
        return get_Fly(baseUrl.host+baseUrl.categoryList);
    },
    //获取用户加入天数
    getJoinDay(params){
        return get_Fly(baseUrl.host+baseUrl.joinDay,params);
    }
}