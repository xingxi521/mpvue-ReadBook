<template>
    <div class="book-info-main">
        <div class="book-info-wrapper">
            <div class="info-left">
                <div class="info-left-img">
                    <ImageView :src="data.cover"/>
                </div>
            </div>
            <div class="info-right">
                <div class="info-right-title">{{data.title}}</div>
                <div class="info-right-author">{{data.author}}</div>
                <div class="info-right-category">{{data.categoryText}}</div>
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
        //图书详情
        data:{
            type:Object,
            default:function(){
                return{};
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .book-info-main{
        padding: 16px 20px;
        .book-info-wrapper{
            display: flex;
            align-items: center;
            .info-left{
               .info-left-img{
                   width: 108px;
                   height: 157px;
               } 
            }
            .info-right{
                width: 60%;
                margin-left: 22.5px;
                .info-right-title{
                    font-size: 22px;
                    color: #333333;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    // white-space: nowrap;
                    max-height: 90px;
                    word-break: break-all;
                }
                .info-right-author{
                    font-size: 16px;
                    color: #333333;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    margin-top: 5px;
                }
                .info-right-category{
                    color: #868686;
                    font-size: 14px;
                    margin-top: 12px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
    }
</style>