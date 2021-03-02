<template>
    <div>
        <SearchTable :data="searchListData" @onClick="onClickHandler"/>
    </div>
</template>
<script>
import SearchTable from '../Search/SearchList/SearchTable'
import wxApi from '../../utils/wxapi'
export default {
    components:{
        SearchTable
    },
    data(){
        return{
            searchListData:[],//图书列表数据
            page:1,//当前页数
        }
    },
    mounted() {
        this.page = 1;
        this.searchListData = [];
        this.getSearchListRequest();
        wxApi.setNavigationBarTitle(this.$route.query.title);
    },
    methods:{
        //获取图书列表数据请求
        getSearchListRequest(){
            const {title,subTitle} = this.$route.query;
            if(title && subTitle){
                this.$api.getSearchList({
                    [`${subTitle}`]:title,
                    page:this.page
                }).then(res=>{
                    if(res.length>0){
                        this.searchListData.push(...res);
                    }else{
                        wxApi.showToast('没有更多数据了...');
                    }
                })
            }
        },
        //点击书本事件
        onClickHandler(book){
            this.$router.push({
                path:'/pages/BookDetail/main',
                query:{
                    fileName:book.fileName
                }
            });
        }
    },
    onReachBottom(){
        this.page++;
        this.getSearchListRequest();
    }
}
</script>
<style lang="less" scoped>

</style>