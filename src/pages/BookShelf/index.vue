<template>
    <div>
        <ShelfUserInfo :userInfo="userInfo" :readDay="readDay" :num="shelfData.length-1"/>
        <ShelfList :shelfList="shelfData"/>
    </div>
</template>
<script>
import ShelfUserInfo from './ShelfUserInfo'
import ShelfList from './ShelfList'
import wxApi from '../../utils/wxapi'
export default {
    components:{
        ShelfUserInfo,
        ShelfList
    },
    data(){
        return{
            userInfo:{},
            readDay:0,
            shelfData:[]
        }
    },
    onShow() {
        this.userInfo = wxApi.getStorageSync('userInfo');
        this.getJoinDayRequest();
        this.getBookShelfRequest();
    },
    methods: {
        //获取用户加入天数请求
        getJoinDayRequest(){
            const openId = wxApi.getStorageSync('openId');
            this.$api.getJoinDay({openId}).then(res=>{
                this.readDay = res.day;
            });
        },
        //获取书架列表
        getBookShelfRequest(){
            const openId = wxApi.getStorageSync('openId');
            this.$api.getBookShelf({openId}).then(res=>{
                this.shelfData = res;
                this.shelfData.push({});
            })
        }
    },
}
</script>
<style lang="less" scoped>

</style>