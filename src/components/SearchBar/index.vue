<template>
    <div class="search-bar-main">
        <div class="search-bar-wrapper">
            <van-icon name="search" size="16px" color="#858C96" class="search-ico"/>
            <input type="text"
            :focus="focus"
            :disabled="disabled"
            :maxlength="strlength"
            :placeholder="hotSearch.length > 0 ? hotSearch:'搜索'"
            v-model="searchText"
            placeholder-class="input-place"
            @click="onSearchBarClick"
            @input="onChange"
            @confirm="onConfirm"
            confirm-type="search"
            >
            <van-icon name="clear" size="16px" color="#000" class="clear-ico" v-if="searchText.length > 0" @click="onClearClick"/>
        </div>
    </div>
</template>
<script>
export default {
    name:'SearchBar',
    data(){
        return{
            searchText:''
        }
    },
    props:{
        //搜索框是否获得焦点
        focus:{
            type:Boolean,
            default:false
        },
        //搜索框是否可交互
        disabled:{
            type:Boolean,
            default:false
        },
        //搜索框最大可输入字符数
        strlength:{
            type:Number,
            default:50
        },
        //热门搜索词
        hotSearch:{
            type:String,
            default:'' 
        }
    },
    methods: {
        //搜索框点击事件
        onSearchBarClick(){
            this.$emit('onClick');
        },
        //点击清空事件
        onClearClick(){
            this.searchText = '';
            this.$emit('onClear');
        },
        //输入监听事件
        onChange(e){
            this.$emit('onChange',e.mp.detail);
        },
        //点击虚拟键盘搜索事件
        onConfirm(e){
           this.$emit('onConfirm',e.mp.detail); 
        },
        //获取当前输入的搜索词
        getNowText(){
            return this.searchText;
        },
        //设置当前搜索词
        setNowText(text){
            this.searchText = text;
        }
    },
}
</script>
<style lang="less" scoped>
    .search-bar-main{
        padding: 0 15px;
        .search-bar-wrapper{
            background: #F5F7F9;
            border-radius: 40px;
            display: flex;
            align-items: center;
            padding: 12px 15px;
            height: 40px;
            box-sizing:border-box;
            .search-ico,.clear-ico{
                display: flex;
                align-items: center;
            }
            input{
                flex: 1;
                margin-left: 10px;
            }
            /deep/.input-place{
                color: #ADB4BE;
                font-size: 15px;
            }
        }
    }
</style>