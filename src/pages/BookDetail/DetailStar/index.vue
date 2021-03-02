<template>
    <div class="detail-star-main">
        <div class="star-top">
            <div class="star-top-left">
                <span class="fenshu">{{rankAvg}}</span>
                <van-rate disabled :value="rankAvg" custom-class="rate" size="20" allow-half color="#717882" void-color="#DEE0E2"/>
            </div>
            <div class="star-top-right">
                <span>{{readerNum}}</span>万人在此读书
            </div>
        </div>
        <div class="star-bottom">
            <div class="star-bottom-left">{{rankNum}}人点评</div>
            <div class="star-bottom-right">
                <div class="bottom-right-img" v-for="(item,index) in readers" :key="index">
                    <ImageView :src="item.avatarUrl" round/>
                </div>
                
            </div>
        </div>
    </div>
</template>
<script>
import ImageView from '../../../components/ImgageView'
export default {
    components:{
        ImageView
    },
    props:{
        //近期阅读者信息
        readers:{
            type:Array,
            default:function(){
                return[];
            }
        },
        //阅读人数
        readerNum:{
            type:Number,
            default:0
        },
        //评分人数
        rankNum:{
            type:Number,
            default:0
        },
        //平均得分
        rankAvg:{
            type:Number,
            default:0
        }
    }
}
</script>
<style lang="less" scoped>
    .detail-star-main{
        padding: 16px 20px;
        .star-top{
            display: flex;
            justify-content: space-between;
            .star-top-left{
                display: flex;
                align-items: flex-end;
                .fenshu{
                    font-size: 24px;
                    color: #5E5E5E;
                }
            }
            .star-top-right{
                color: #99A0AA;
                font-size: 11px;
                span{
                    color: #5E5E5E;
                    font-size: 24px;
                    margin-right: 5px;
                }
            }
        }
        .star-bottom{
            margin-top: 3px;
            display: flex;
            justify-content: space-between;
            .star-bottom-left{
                font-size: 11px;
                color: #99A0AA;
            }
            .star-bottom-right{
                display: flex;
                // max-width: 120px;
                .bottom-right-img{
                    width: 20px;
                    height: 20px;
                    margin-left: -8px;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                    box-shadow: 0 4px 4px rgba(0, 0, 0, .3);
                    // border: 0.5px solid rgba(255,255,255,0.50);
                    // transform: translate(-6px, 0);
                }
            }
        }
    }
</style>