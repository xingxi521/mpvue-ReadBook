<template>
    <div>
        <SearchBar :focus="searchBarFocus" @onChange="onSearchChange" :hotSearch="hotSearchText" @onClear="clearHandler" @onConfirm="onConfirmHandler" ref="searchBar"/>
        <TagGroup headerText="热门搜索" btnText="换一批" :tagData="tagData" v-if="!searchListData.book" @onBtnClick="hotBtnClickHandler"/>
        <TagGroup headerText="历史搜索" btnText="清空" :tagData="historyData" v-if="!searchListData.book" @onBtnClick="historyBtnClickHandler" @onTagClick="onTagClickHandler"/>
        <SearchList :data="searchListData"/>
    </div>
</template>
<script>
import TagGroup from './TagGroup'
import SearchList from './SearchList'
import SearchBar from '../../components/SearchBar'
import wxApi from '../../utils/wxapi'
export default {
    components: {
        TagGroup,
        SearchList,
        SearchBar
    },
    data(){
        return{
           tagData:[],//热门关键词数据
           searchBarFocus:true,//搜索栏焦点状态
           page:1,//关键词搜索当前页数
           searchListData:{},//关键词搜索内容的请求结果 
           hotSearchText:'',//热搜关键词
           historyData:[],//历史搜索数据
        }
    },
    methods: {
        //获取热门关键词数据
        getHotSearchWordRequest(){
            this.$api.getHotSearchWord().then(res=>{
                this.tagData = res;
            });
        },
        //搜索栏输入改变事件
        onSearchChange(text){
            var { value } = text;
            this.getSearchRequest(value);
        },
        //关键词搜索请求
        getSearchRequest(keyword){
            this.page = 1;//搜索前先重置页数
            if(!keyword && keyword.trim().length <= 0){
                this.searchListData = {};//搜索前先重置
                return;
            }
            wxApi.showLoading('正在搜索中...');
            this.searchBarFocus = true;
            var openId = wxApi.getStorageSync('openId');
            this.$api.getSearch({
                keyword,
                openId,
                page:this.page
            }).then(res=>{
                this.searchListData = res;
                wxApi.hideLoading();
            });
        },
        //清空事件
        clearHandler(){
            this.searchListData = {};
            this.page = 1;
        },
        //虚拟键盘搜索按钮逻辑
        onConfirmHandler(text){
            var {value} = text;
            if(!value && value.trim().length <= 0){//如果没输入内容按搜索的话就按热门关键词搜索
                this.$refs.searchBar.setNowText(this.hotSearchText);
                this.getSearchRequest(this.hotSearchText);
            }else{
                this.getSearchRequest(value);
                if(!this.historyData.includes(value)){//判断历史数据里当前输入的值是否已经有了，没有才往里加
                    this.historyData.push({title:value});
                    wxApi.setStorageSync('historyData',this.historyData);//存到本地，下次进来直接读
                }
            }
        },
        //热门搜索换一批
        hotBtnClickHandler(){
            this.getHotSearchWordRequest();
        },
        //历史搜索清空
        historyBtnClickHandler(){
            wxApi.setStorageSync('historyData',[]);
            this.historyData = [];
        },
        //历史搜索标签点击事件
        onTagClickHandler(text){
            this.$refs.searchBar.setNowText(text);
            this.getSearchRequest(text);
        }
    },
    mounted() {
        this.getHotSearchWordRequest();
        this.hotSearchText = this.$route.query.hotSearchText || '';
        this.historyData = wxApi.getStorageSync('historyData') || [];
    },
    //小程序页面滚动触发事件的处理函数
    onPageScroll(){
        this.searchBarFocus = false;
    },
    //小程序上拉到底生命周期函数
    onReachBottom(){
        if(this.searchListData.book){//判断是否在搜索状态中才触发
            this.page++;
            var openId = wxApi.getStorageSync('openId');
            wxApi.showLoading('正在加载更多...');
            this.$api.getSearch({
                keyword:this.$refs.searchBar.getNowText(),
                openId,
                page:this.page
            }).then(res=>{
                if(res.book && res.book.length > 0){
                    this.searchListData.book.push(...res.book);
                }else{
                    wxApi.showToast('没有更多数据了');
                }
                wxApi.hideLoading();
            });
        }
    }
    
}
</script>