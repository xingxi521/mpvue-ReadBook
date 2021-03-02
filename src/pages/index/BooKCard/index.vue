<template>
    <div class="book-card-main">
        <div class="book-card-wrapper">
            <div class="wrapper-top">
                <div class="head-logo">
                    <ImageView :src="userInfo.avatarUrl" :round="true" height="20px"/>
                </div>
                <div class="top-nickname">{{userInfo.nickName}}</div>
                <div class="top-booknum">书架共{{data?data.num:'0'}}本好书</div>
                <div class="top-circle"></div>
                <div class="top-tebie">特别精选</div>
            </div>
            <div class="wrapper-bottom">
                <div class="wrapper-bottom-left">
                    <div class="left-img" v-for="(item,index) in data.bookList" :key="index" @click="onClick(item)">
                        <ImageView :src="item.cover" height="101px"/>
                    </div>
                </div>
                <div class="wrapper-bottom-right" @click="onClickBookShelf">
                    书架
                    <van-icon name="arrow" custom-style="width:5px;height:9px;line-height:9px;line-height: 29px;margin-left:4.5px" color="#828489"/>
                </div>
            </div>
            <div class="feeback" @click="feebackHandler">反馈</div>
            <van-dialog id="van-dialog" />
        </div>
    </div>
</template>
<script>
import ImageView from '../../../components/ImgageView'
import Dialog from 'vant-weapp/dist/dialog/dialog';
export default {
    name:'BookCard',
    components:{
        ImageView
    },
    props:{
        //展示数据
        data:{
            type:Object,
            default:function(){
                return {}
            }
        },
        //今天是否签到
        hasSign:{
            type:Boolean,
            default:false
        },
        //连续签到天数
        signDay:{
            type:Number,
            default:0
        }
    },
    computed:{
        userInfo() {
            return (this.data && this.data.userInfo) || {}
        }
    },
    methods: {
        feebackHandler(){
            Dialog.alert({
                message:'功能正在开发中...'
            }).then(()=>{
                
            });
        },
        //点击书本事件
        onClick(book){
            this.$emit('onClick',book);
        },
        //点击书架
        onClickBookShelf(){
            this.$emit('onClickBookShelf');
        }
    }
    
}
</script>
<style lang="less" scoped>
    .book-card-main{
        padding: 0 15px;
        margin-top: 37px;
        .book-card-wrapper{
            position: relative;
            padding: 20px 21px 17px 20px;
            background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
            border-radius: 15px;
            .wrapper-top{
                display: flex;
                align-items: center;
                .head-logo{
                    width: 20px;
                    height: 20px;
                }
                .top-nickname{
                    margin: 0 8.5px;
                    font-size: 12px;
                    color: #FFFFFF;
                    text-align: center;
                }
                .top-booknum,.top-tebie{
                   font-size: 12px; 
                   color: #FFFFFF;
                   opacity: .7;
                }
                .top-circle{
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #A2A2A2;
                    margin: 0 8px;
                }
            }
            .wrapper-bottom{
                display: flex;
                align-items: center;
                margin-top: 17px;
                .wrapper-bottom-left{
                    display: flex;
                    align-items: center;
                    justify-content:space-between;
                    flex: 1;
                    .left-img{
                        width: 71px;
                        height: 101px;
                    }
                }
                .wrapper-bottom-right{
                    display: flex;
                    width: 15px;
                    height: 29px;
                    word-break: break-all;
                    font-size: 11px;
                    color:#fff;
                    opacity: .8;
                    margin-left: 20px;
                }
            }
            .feeback{
                position: absolute;
                top: 19.5px;
                right: 0;
                background: rgba(216,216,216,.3);
                border-radius: 100px 0 0 100px;
                width: 45px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                font-size: 11px;
                color:rgba(255,255,255,.8);
            }
        }
    }
</style>