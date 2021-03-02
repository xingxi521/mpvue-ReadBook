<template>
    <div class="image-view-main" @click="onClick">
        <!-- 加载完成的图片 -->
        <img 
            :src="src" 
            :mode="mode"
            :lazy-load="lazyLoad"
            @load="onLoad"
            @error="onError"
            :class="round?'round image':'image'"
            v-show="!isLoading && !error"
        />
        <!-- 加载失败或者正在加载的图片 -->
        <img 

            src="/static/loading-spin.svg" 
            :mode="mode"
            :lazy-load="lazyLoad"
            :class="round?'round image':'image'"
            v-show="isLoading || error"
            :style="height?'height:'+height:''"
        />
    </div>
</template>
<script>
export default {
    name:'ImageView',
    data(){
        return{
            //图片是否处于加载状态
            isLoading:true,
            //是否加载失败
            error:false
        }
    },
    props:{
        //图片地址
        src:{
            type:String,
            default:''
        },
        //图片伸缩模式 参考微信小程序的组件
        mode:{
            type:String,
            default:'widthFix'
        },
        //是否启动懒加载
        lazyLoad:{
            type:Boolean,
            default:true
        },
        //是否为圆形图片
        round:{
            type:Boolean,
            default:false
        },
        //图片高度
        height:{
            type:String,
            default:'auto'
        }
    },
    methods: {
        //图片点击事件
        onClick(){
            this.$emit('onClick');
        },
        //图片加载成功事件
        onLoad(){
            this.isLoading = false;
            this.error = false;
        },
        //图片加载失败事件
        onError(){
            this.isLoading = false;
            this.error = true;
        }
    },
    watch: {
        src(newval,preval){
            if(newval && preval!=newval){
                this.isLoading = true;
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .image-view-main{
        width: 100%;
        image{
            width: 100%;
            &.round{
                border-radius: 50%;
            }
        }
    }
</style>