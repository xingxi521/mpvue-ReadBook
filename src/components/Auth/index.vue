<template>
    <div class="auth-main">
        <div class="auth-wrapper">
            <div class="auth-log">
                <ImageView src="https://www.youbaobao.xyz/mpvue-res/logo.jpg" round/>
            </div>
            <div class="auth-title">登录星系书城</div>
            <div class="auth-desc">全场免费阅读各种好书</div>
            <button 
                class="auth-btn"
                @getuserinfo="getUserInfo"
                open-type="getUserInfo"
            >授权登录</button>
        </div>
    </div>
</template>
<script>
import ImageView from '../ImgageView'
export default {
    name:'Auth',
    components: {
        ImageView
    },
    methods: {
        getUserInfo(){
            this.$emit('onGetUserInfo');
        }
    },
}
</script>
<style lang="less" scoped>
    .auth-main{
        background-color: #999;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        .auth-wrapper{
            width: 270px;
            height: 248px;
            border-radius: 18px;
            background-color: #f5f5f5;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            .auth-log{
                width: 74px;
                height: 74px;
            }
            .auth-title{
                font-size: 13px;
                color: #999;
                margin-top: 15px;
            }
            .auth-desc{
                font-size: 16px;
                font-weight: 600;
                color: #333;
                margin-top: 6px;
            }
            .auth-btn{
                width: 100%;
                height: 49px;
                background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
                border-radius: 0 0 18px 18px;
                color: #fff;
                font-size: 15px;
                line-height: 49px;
                position: absolute;
                bottom: 0;
            }
        }
    }
</style>