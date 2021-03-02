<template>
    <div class="tag-group-main">
        <div class="tag-group-header">
            <div class="header-title">{{headerText}}</div>
            <div class="header-btn" @click="btnClickHandler">{{btnText}}</div>
        </div>
        <div class="tag-group-content">
            <div v-for="(item,index) in tagData" :key="index" class="content-wrapper">
                <Tag :text="item.title" @onClick="onClick"/>
            </div>
        </div>
    </div>
</template>
<script>
import Tag from './Tag'
export default {
    name:'TagGroup',
    data(){
        return{
        }
    },
    components: {
        Tag
    },
    props:{
        //标题文本
        headerText:{
            type:String,
            default:''
        },
        //按钮文本
        btnText:{
            type:String,
            default:''
        },
        //标签数据
        tagData:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    methods: {
        //换一批按钮事件
        btnClickHandler(){
            this.$emit('onBtnClick');
        },
        //标签按钮事件
        onClick(text){
            this.$emit('onTagClick',text);
        }
    },
}
</script>
<style lang="less" scoped>
    .tag-group-main{
        padding: 0 16px;
        .tag-group-header{
            margin-top: 35px;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            .header-title{
                font-size: 14px;
                color: #333333;
            }
            .header-btn{
                color: #3696EF;
                font-size: 14px;
            }
        }
        .tag-group-content{
           .content-wrapper{
               width: 100%;
           } 
        }
    }
</style>