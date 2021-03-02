<template>
    <div class="book-bottom-main">
        <van-button round :custom-class="isShelf?'join':'noJoin'" @click="joinBookHandler">{{isShelf?'移除书架':'加入书架'}}</van-button>
        <van-button round custom-class="read" @click="readBook">阅读</van-button>
    </div>
</template>
<script>
export default {
    props:{
        //书本是否加入了书架
        isShelf:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        //加入/移除书架
        joinBookHandler(){
            this.$emit('onJoinBook');
        },
        //阅读事件
        readBook(){
            this.$emit('onReadBook');
        }
    },
}
</script>
<style lang="less" scoped>
    .book-bottom-main{
        width: 100%;
        height: 51px;
        line-height: 51px;
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 5px 18px;
        background-color: #fff;
        box-shadow: 0 -2px 8px 0 rgba(0,0,0,0.11);
        /deep/.noJoin{
            background: #FFFFFF;
            border: 1px solid #64B6FF;
            border-radius: 22.5px;
            width: 160px;
            height: 40px;
            color: #64B6FF;
            font-size: 15px;
            line-height: 38px;
        }
        /deep/.read{
            background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
            border: 1px solid #64B6FF;
            border-radius: 22.5px;
            width: 160px;
            height: 40px;
            color: #fff;
            font-size: 15px;
            line-height: 38px;
            margin-left: 18px;
        }
        /deep/.join{
            background: #FFE6E0;
            border: 1px solid #FFAF9B;
            border-radius: 22.5px;
            width: 160px;
            height: 40px;
            color: #F96128;
            font-size: 15px;
            line-height: 38px;
        }
    }
</style>