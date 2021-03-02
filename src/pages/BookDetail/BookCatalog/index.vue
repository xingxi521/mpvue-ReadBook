<template>
    <div class="book-catalog-main">
        <div class="catalog-title">目录</div>
        <div class="catalog-content" v-for="(item,index) in data" :key="index" :style="'padding-left:'+item.level*15+'px'" @click="onClick(item.href)">{{item.label}}</div>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Array,
            default:function(){
                return[];
            }
        }
    },
    methods: {
        //点击目录
        onClick(href){
            this.$emit('onClick',href);
        }
    },
}
</script>
<style lang="less" scoped>
    .book-catalog-main{
        padding: 7px 20px;
        .catalog-title{
            font-size: 22px;
            color: #333333;
        }
        .catalog-content{
            padding: 19px 0;
            border-bottom: 1px solid #EBEBEB;
            font-size: 15px;
            color: #868686; 
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
</style>