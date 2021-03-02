<template>
    <div class="book-list-main" :class="linearBg?'bgliner':''">
        <div class="book-list-wrapper">
            <div class="list-top" v-if="showTitle">{{title}}</div>
            <div class="list-cotent">
                <!-- 行 -->
                <div class="content-row" v-for="(item,index) in dealBookData" :key="index">
                    <!-- 行里每列(mode为row) -->
                    <template v-if="mode == GET_BOOK_CONST.ROW">
                        <div class="row-item-row" :style="{flex:'0 0 '+(100/col)+'%'}" v-for="(book,idx) in item" :key="idx" @click="onClick(book)">
                            <ImageView :src="book.cover"/>
                            <div class="item-row-title">{{book.title}}</div>
                        </div>
                    </template>
                    <!-- 行里每列(mode为col) -->
                    <template v-if="mode == GET_BOOK_CONST.COL">
                        <div class="row-item-col" :style="{flex:'0 0 '+(100/col)+'%'}" v-for="(book,idx) in item" :key="idx" @click="onClick(book)">
                            <div class="item-col-left">
                                <ImageView :src="book.cover"/>
                            </div>
                            <div class="item-col-right">
                                <div class="item-col-title">{{book.title}}</div>
                                <div class="item-col-author" style="margin-top:15px">{{book.author}}</div>
                                <div class="item-col-author" style="margin-top:2px">{{book.categoryText}}</div>
                            </div>
                        </div>
                    </template>
                    <!-- 行里每列(mode为category) -->
                    <template v-if="mode == GET_BOOK_CONST.CATEGORY">
                        <div class="row-item-category" :style="{flex:'0 0 '+(100/col-2)+'%'}" v-for="(book,idx) in item" :key="idx" @click="onClick(book)">
                            <div class="item-category-title">{{book.text}}</div>
                            <div class="item-category-num">{{book.num}}本书</div>
                            <div class="item-category-img1">
                                <ImageView :src="book.cover"/>
                            </div>
                            <div class="item-category-img2">
                                <ImageView :src="book.cover2"/>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="list-bottom" v-if="showBtn">
                <button class="reload-book" hover-class="reload-book-click" @click="onMoreClickHandler">{{btnText}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import { BOOK_CONST,CATEGORY } from '../../const'
import ImageView from '../../components/ImgageView'
export default {
    name:'BookList',
    components:{
        ImageView
    },
    props:{
        //标题栏
        title:{
            type:String,
            default:''
        },
        //图书列表
        data:{
            type:Array,
            default:function(){
                return [];
            }
        },
        //按钮文本
        btnText:{
            type:String,
            default:''
        },
        //行数
        row:{
            type:Number,
            default:0
        },
        //列数
        col:{
            type:Number,
            default:1
        },
        //显示模式，row - 按行显示，col - 按列显示，category - 分类显示
        mode:{
            type:String,
            default:BOOK_CONST.ROW
        },
        //是否显示标题
        showTitle:{
            type:Boolean,
            default:true
        },
        //是否显示按钮
        showBtn:{
            type:Boolean,
            default:true
        },
        //是否显示背景
        linearBg:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        //筛选处理数据，根据行列处理方便渲染
        dealBookData(){
            const { data,row,col } = this;//解构
            const bookNum = row * col;//计算出需要多小数据
            if(data.length > 0){
                data.forEach(item=>{
                    item.text = CATEGORY[item.categoryText.toLowerCase()];
                })
                var tempBookData = data.slice(0,bookNum);//在总数据中取出需要的数据量
                var resultArrData = [];
                for(var i = 0; i < row; i++){//这里的I相当于有几行循环几次
                    resultArrData.push(tempBookData.slice(i*col,col*i+col));
                }
                return resultArrData;
            }else{
                return [];
            }
        },
        //取mode常量
        GET_BOOK_CONST(){
            return BOOK_CONST;
        }
    },
    methods: {
        //按钮事件
        onMoreClickHandler(){
            this.$emit('onMoreClick');
        },
        //点击书本事件
        onClick(book){
            this.$emit('onClick',book);
        }
    },
}
</script>
<style lang="less" scoped>
    .book-list-main{
        padding: 0 15px;
        margin-top: 20px;
        &.bgliner{
            background-image: linear-gradient(-180deg, #FFFFFF 0%, #F9F9F9 100%);
        }
        .book-list-wrapper{
            .list-top{
                font-size: 21px;
                color: #212933;
            }
            .list-cotent{
                margin-top: 22.5px;
                .content-row{
                    display: flex;
                    margin-bottom: 12px;
                    // mode为row样式
                    .row-item-row{
                        padding: 0 10px;
                        box-sizing: border-box;
                        .item-row-title{
                            font-size: 12px;
                            color: #212731;
                            word-break: break-all;
                            text-align: center;
                            max-height: 32px;
                            overflow: hidden;
                        }
                    }
                    //mode为col样式
                    .row-item-col{
                        display: flex;
                        box-sizing: border-box;
                        .item-col-left{
                            // flex: 0 0 50%;
                            flex: 1;
                        }
                        .item-col-right{
                            padding: 0 10px;
                            flex: 1;
                            .item-col-title{
                                font-size: 14px;
                                color: #1F1F1F;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 3;
                                overflow: hidden;
                                word-break: break-word;
                            }
                            .item-col-author{
                                font-size: 12px;
                                color: #868686;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 1;
                                overflow: hidden;
                                word-break: break-all;
                            }
                            
                        }
                    }
                    //mode为category样式
                    .row-item-category{
                        background-color: #F8F9FB;
                        border-radius: 5px;
                        height: 112px;
                        margin-left: 15px;
                        position: relative;
                        border-radius: 5px;
                        &:nth-child(2n-1){
                            margin-left: 0;
                        }
                        .item-category-title{
                            padding: 13.5px 0 0 16px;
                            color: #212832;
                            font-size: 16px;
                            font-weight: 600;
                        }
                        .item-category-num{
                            padding-left: 16px;
                            color: #868686;
                            font-size: 12px;
                            margin-top: 46px;
                        }
                        .item-category-img1{
                            position: absolute;
                            right: 0;
                            bottom: -4px;
                            z-index: 100;
                            width: 50px;
                            border-radius: 0 0 5px 0;
                            /deep/image,.image-view-main{
                                border-radius: 0 0 5px 0;
                            }
                        }
                        .item-category-img2{
                            position: absolute;
                            right: 30px;
                            bottom: -4px;
                            z-index: 90;
                            width: 40px;
                        }
                    }
                }
            }
            .list-bottom{
                margin-top: 21.5px;
                margin-bottom: 18.5px;
                padding-bottom: 20px;
                .reload-book{
                    background: #FFFFFF;
                    border: 1px solid #EDEEEE;
                    border-radius: 22px;
                    width: 100%;
                    height: 41px;
                    line-height: 41px;
                    color: #3696EF;
                    font-size: 14px;
                }
                .reload-book-click{
                    background-color: #f5f5f5;
                }
            }
        }
    }
</style>