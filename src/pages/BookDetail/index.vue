<template>
    <div>
        <BookInfo :data="bookDetailsData"/>
        <DetailStar :readers="bookDetailsData.readers" :readerNum="bookDetailsData.readerNum" :rankNum="bookDetailsData.rankNum" :rankAvg="bookDetailsData.rankAvg"/>
        <DetailRate @onChange="rateChangeHandler"/>
        <BookCatalog :data="bookCatalogData" @onClick="onClickCategory"/>
        <DetailBottom @onJoinBook="joinBookHandler" :isShelf="isShelf" @onReadBook="onReadBook"/>
    </div>
</template>
<script>
import BookInfo from './BookInfo'
import DetailStar from './DetailStar'
import DetailRate from './DetailRate'
import BookCatalog from './BookCatalog'
import DetailBottom from './DetailBottom'
import wxApi from '../../utils/wxapi'
export default {
    components:{
        BookInfo,
        DetailStar,
        DetailRate,
        BookCatalog,
        DetailBottom
    },
    data(){
        return{
            bookDetailsData:{},//图书详情数据
            bookCatalogData:[],//图书目录数据
            isShelf:false,//图书是否加入了书架
        }
    },
    methods: {
        //获取图书详情请求
        getDetailRequest(){
            this.bookDetailsData = {};//每次重置一下
            var fileName = this.$route.query.fileName;
            var openId = wxApi.getStorageSync('openId');
            if(fileName && openId){
                this.$api.getDetail({
                    fileName,
                    openId
                }).then(res=>{
                    this.bookDetailsData = res;
                })
            }
            
        },
        //获取图书目录请求
        getBookCatalogRequest(){
            var fileName = this.$route.query.fileName;
            if(fileName){
                this.$api.getBookCatalog({
                    fileName
                }).then(res=>{
                    this.bookCatalogData = res;
                })
            }
        },
        //图片评分请求
        getRankSaveRequest(value){
            var fileName = this.$route.query.fileName;
            var openId = wxApi.getStorageSync('openId');
            if(fileName && openId && value){
                this.$api.getRankSave({
                    fileName,
                    openId,
                    rank:value
                }).then(res=>{
                    wxApi.showToast('评分成功！');
                    this.getDetailRequest();
                })
            }
        },
        //获取图书书架状态请求
        getBookShelfRequest(){
            var fileName = this.$route.query.fileName;
            var openId = wxApi.getStorageSync('openId');
            if(fileName && openId){
                this.$api.getBookShelf({
                    fileName,
                    openId
                }).then(res=>{
                    if(res.length>0){
                        this.isShelf = true;
                    }else{
                        this.isShelf = false;
                    }
                })
            } 
        },
        //点击星星评分事件
        rateChangeHandler(value){
            this.getRankSaveRequest(value);
        },
        //加入/移除书本
        joinBookHandler(){
            var fileName = this.$route.query.fileName;
            var openId = wxApi.getStorageSync('openId');
            if(this.isShelf){
                wxApi.showModal('移除书架',`你是否要将《${this.bookDetailsData.title}》移除书架？`,()=>{
                    if(fileName && openId){
                        this.$api.getBookRemove({
                            fileName,
                            openId
                        }).then(res=>{
                            this.getBookShelfRequest();
                        });
                    }
                },()=>{

                })
            }else{
                if(fileName && openId){
                    this.$api.getBookSave({
                        fileName,
                        openId
                    }).then(res=>{
                        this.getBookShelfRequest();
                    })
                }
            }
        },
        //阅读按钮事件
        onReadBook(){
            if(this.bookDetailsData && this.bookDetailsData.fileName){
                var fileName = this.bookDetailsData.fileName;
                var opf = this.bookDetailsData.opf;
                this.$router.push({
                    path:'/pages/Read/main',
                    query:{fileName,opf}
                });
            }
        },
        //点击目录
        onClickCategory(href){
            var index = href.indexOf('/');
            var resultHref = '';
            if(index>=0){
                resultHref = href.slice(index+1);
            }else{
                resultHref = href;
            }
            var fileName = this.bookDetailsData.fileName;
            var opf = this.bookDetailsData.opf;
            this.$router.push({
                path:'/pages/Read/main',
                query:{fileName,opf,href:resultHref}
            });
        }
    },
    mounted() {
        this.getDetailRequest();
        this.getBookCatalogRequest();
        this.getBookShelfRequest();
    },
}
</script>
<style lang="less" scoped>

</style>