<template>
    <div class="banner-main" @click="onClick">
        <div class="banner-wrapper" :style="{backgroundImage:bgurl}">
            <div class="banner-title">{{title}}</div>
            <div class="banner-btn">{{btnText}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Banner',
    props:{
        title:{
            type:String,
            default:''
        },
        btnText:{
            type:String,
            default:''
        },
        link:{
            type:String,
            default:''
        }
    },
    computed:{
        bgurl(){
            return "url('"+this.link+"')";
        }
    },
    methods: {
        onClick(){
            this.$emit('onClick');
        }
    },
}
</script>
<style lang="less" scoped>
    .banner-main{
        padding: 0 15px;
        margin-top: 20px;
        .banner-wrapper{
            // background-image: url('http://www.youbaobao.xyz/book/res/bg.jpg');
            background-size: 100% 100%;
            width: 100%;
            height: 125px;
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .banner-title{
                color: #fff;
                font-weight: 500;
                font-size: 18px;
            }
            .banner-btn{
                margin-top: 10px;
                background-color: #4586FE;
                border-radius: 30px;
                width: 85px;
                height: 25px;
                line-height: 25px;
                text-align: center;
                color: #fff;
                border: 1px solid #BACDFB;
                font-size: 14px;
            }
        }
    }
</style>