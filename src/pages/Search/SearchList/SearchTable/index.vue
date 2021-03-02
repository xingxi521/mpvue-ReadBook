<template>
    <div class="search-table-main">
        <div class="search-table-wrapper" @click="onClick(item)" v-for="(item,index) in data" :key="index">
            <div class="search-table-left">
                <div class="table-left-img">
                    <ImageView :src="item.cover"/>
                </div>
            </div>
            <div class="search-table-right">
                <div class="table-right-title">{{item.title}}</div>
                <div class="table-right-author">{{item.author}}</div>
                <div class="table-right-category">{{item.categoryText}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import ImageView from '../../../../components/ImgageView'
export default {
    components:{
        ImageView
    },
    props:{
        //列表数据
        data:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    methods: {
        onClick(data){
            this.$emit('onClick',data);
        }
    },
}
</script>
<style lang="less" scoped>
    .search-table-main{
        padding: 15px 22px;
        .search-table-wrapper{
            display: flex;
            align-items: center;
            margin-top: 15.5px;
            &:first-child{
                margin-top: 0;
            }
            .search-table-left{
                .table-left-img{
                    width: 47px;
                    height: 68.5px;
                    margin-right: 15.5px;
                }
            }
            .search-table-right{
                width: 84%;
                .table-right-title{
                    color: #333333;
                    font-size: 16px;
                    font-weight: 500;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100%;
                }
                .table-right-author{
                    color: rgba(0,0,0,0.65);
                    font-size: 13px;
                    line-height: 18px;
                    margin-top: 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100%;
                }
                .table-right-category{
                    color: rgba(0,0,0,0.45);
                    font-size: 13px;
                    line-height: 18px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 100%;
                }
            }
        }
    }
</style>