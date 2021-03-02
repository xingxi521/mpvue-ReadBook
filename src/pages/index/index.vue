<template>
    <div>
        <div class="home-main" v-if="isAuth">
            <SearchBar :disabled="true" :hotSearch="hotSearch" @onClick="gotoSearchHandler"/>
            <BookCard :data="bookCardData" @onClick="onClickBooKHandler" @onClickBookShelf="onClickBookShelf"/>
            <Banner title="全新图书即将重磅上线，请多多关注" btnText="了解更多" link="http://www.youbaobao.xyz/book/res/bg.jpg" @onClick="jumpHandler"/>
            <BookList :data="recommend" :row="1" :col="3" mode="row" :linearBg="true" title="为你推荐" btnText="换一批" @onMoreClick="changeBatchHandler('recommend')" @onClick="onClickBooKHandler"/>
            <BookList :data="freeRead" :row="2" :col="2" mode="col" title="免费阅读" btnText="换一批" @onMoreClick="changeBatchHandler('freeRead')" @onClick="onClickBooKHandler"/>
            <BookList :data="hotBook" :row="1" :col="4" mode="row" :linearBg="true" title="当前最热" btnText="换一批" @onMoreClick="changeBatchHandler('hotBook')" @onClick="onClickBooKHandler"/>
            <BookList :data="category" :row="3" :col="2" mode="category" title="分类" btnText="查看全部" @onMoreClick="changeBatchHandler('category')" @onClick="onClickBookHandler"/>
        </div>
        <Auth @onGetUserInfo="getUserInfoHandler" v-if="!isAuth"/>
    </div>
</template>
<script>
import SearchBar from '../../components/SearchBar'
import BookCard from './BooKCard'
import Banner from './Banner'
import BookList from '../../components/BookList'
import Auth from '../../components/Auth'
import wxApi from '../../utils/wxapi'
export default {
    components:{
        SearchBar,
        BookCard,
        Banner,
        BookList,
        Auth
    },
    data(){
        return{
            recommend:[],//为你推荐数据
            freeRead:[],//免费阅读数据
            hotBook:[],//当前最热数据
            category:[],//分类数据
            shelf:[],//书架数据
            userInfo:{},//用户信息
            shelfCount:'',//书架数量
            hotSearch:'',//热门搜索词
            isAuth:false,//授权状态
        }
    },
    mounted() {
        wxApi.getSetting('userInfo',(res)=>{//已经授权过则直接获取用户信息
            this.isAuth = true;
            wxApi.showLoading('正在加载中...')
            this.initInfo();//获取用户信息
        },()=>{
            this.isAuth = false;
            console.log('没授权，点按钮授权吧');
        });
    },
    computed:{
        bookCardData(){
            return{
                bookList:this.shelf,
                num:this.shelfCount,
                userInfo:this.userInfo
            }
        }
    },
    methods: {
        //获取首页数据
        getHomeDataRequest(openId,userinfo){
            this.$api.getHomeData({
                openId:openId
            }).then(res=>{
                var { recommend,freeRead,hotBook,category,shelf,shelfCount,hotSearch } = res;
                this.recommend = recommend;
                this.freeRead = freeRead;
                this.hotBook = hotBook;
                this.category = category;
                this.shelf = shelf;
                this.userInfo = userinfo;
                this.shelfCount = shelfCount;
                this.hotSearch = hotSearch.keyword;
                wxApi.hideLoading();
            })
        },
        //用户注册
        postWxRegisterRequest(openId,userinfo){
            this.$api.postWxRegister(openId,userinfo).then(res=>{
                this.getHomeDataRequest(openId,userinfo);//获取首页数据
            });
        },
        //换一批按钮
        changeBatchHandler(type){
            console.log(type);
            if(type == "recommend"){//为你推荐
                this.$api.getRecommend().then(res=>{
                    this.recommend = res;
                })
            }else if(type == "freeRead"){
                this.$api.getFreeRead().then(res=>{
                    this.freeRead = res;
                })
            }else if(type == "hotBook"){
                this.$api.getHotBook().then(res=>{
                    this.hotBook = res;
                })
            }else if(type == "category"){
                this.$router.push('/pages/CategoryList/main');
            }
        },
        //点击用户授权按钮（允许获取授权后触发的事件）
        getUserInfoHandler(){
            this.isAuth = true;
            wxApi.showLoading('正在加载中...')
            this.initInfo();
        },
        //初始化用户信息
        initInfo(){
            wxApi.getUserInfo((res)=>{
                wxApi.setStorageSync('userInfo',res);
                var openId = wxApi.getStorageSync('openId');
                var tempUserInfo = res;
                if(openId && openId.length > 0){//如果本地有存openID则不需要重新去获取
                    console.log('缓存有openID');
                    // this.getHomeDataRequest(openId,tempUserInfo);
                    this.postWxRegisterRequest(openId,tempUserInfo);
                }else{//没有则需要去获取
                    wxApi.wxLogin(res=>{//code码成功获取
                        this.$api.getWxOpenId(res).then(result=>{//根据code码获取openId
                            wxApi.setStorageSync('openId',result.openid);
                            this.getHomeDataRequest(result.openid,tempUserInfo);
                        })
                    },()=>{//获取失败
                        console.log('登陆凭证code获取失败');
                    })
                }
                
            },(err)=>{
                console.log('获取用户信息失败了',err);
            })
        },
        //跳转到搜索页面
        gotoSearchHandler(){
            this.$router.push({
                path:'/pages/Search/main',
                query:{hotSearchText:this.hotSearch}
            });
        },
        //点击书本事件
        onClickBooKHandler(book){
            this.$router.push({
                path:'/pages/BookDetail/main',
                query:{
                    fileName:book.fileName
                }
            });
        },
        //点击分类
        onClickBookHandler(book){
            this.$router.push({
                path:'/pages/SearchList/main',
                query:{
                    title:book.categoryText,
                    subTitle:'category'
                }
            });
        },
        //点击书架
        onClickBookShelf(){
            this.$router.push('/pages/BookShelf/main');
        }
    },
    
}
</script>  
<style lang="less" scoped>
    
    
</style>