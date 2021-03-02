<template>
    <div class="tag-main" @click="onClick">
        {{text}}
    </div>
</template>
<script>
export default {
    name:'Tag',
    props:{
        text:{
            type:String,
            default:''
        }
    },
    methods: {
        //点击标签事件
        onClick(){
            this.$emit('onClick',this.text);
        }
    },
}
</script>
<style lang="less" scoped>
    .tag-main{
        padding: 5.5px 17px;
        background-color: #F7F7F9;
        border-radius: 16px;
        text-align: center;
        display: inline-block;
        font-size: 14px;
        color: #272E37;
        margin: 0 10px 10px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 90%;
    }

</style>