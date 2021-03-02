<template>
    <div class="search-item-main" @click="onClick(title,subTitle)">
        <div class="item-left">
            <van-icon :name="icon" color="rgba(0,0,0,.5)" size="20px" custom-style="line-height:30px"/>
        </div>
        <div class="item-right">
            <div class="item-right-title">{{title}}</div>
            <div class="item-right-subtitle">{{subTitle}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'SearchItem',
    props:{
        //标题文本
        title:{
            type:String,
            default:''
        },
        //副标题文本
        subTitle:{
            type:String,
            default:''
        },
        //图标类型
        icon:{
            type:String,
            default:''
        }
    },
    methods: {
        onClick(title,subTitle){
            this.$emit('onClick',title,subTitle);
        }
    },
}
</script>
<style lang="less" scoped>
    .search-item-main{
        padding: 15px 22px;
        display: flex;
        align-items: center;
        .item-left{
            width: 32px;
            height: 32px;
            background: #F7F7F9;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
        }
        .item-right{
            width: 85%;
            .item-right-title{
                font-size: 14px;
                color: #333333;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: 100%;
            }
            .item-right-subtitle{
                font-size: 12px;
                color: rgba(0,0,0,0.45);
            }
        }
    }
</style>