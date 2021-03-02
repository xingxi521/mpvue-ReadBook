<template>
    <div>
        <BookList :data="category" :row="category.length/2" :col="2" mode="category" :showTitle="false" :showBtn="false" @onClick="onClickBookHandler"/>
    </div>
</template>
<script>
import BookList from '../../components/BookList'
export default {
    components:{
        BookList
    },
    data(){
        return{
            category:[]
        }
    },
    mounted() {
        this.getCatagoryListRequest();
    },
    methods: {
        //获取分类列表数据请求
        getCatagoryListRequest(){
            this.$api.getCatagoryList().then(res=>{
                this.category = res;
            });
        },
        //点击分类
        onClickBookHandler(book){
            this.$router.push({
                path:'/pages/SearchList/main',
                query:{
                    title:book.categoryText,
                    subTitle:'category'
                }
            });
        }
    },
}
</script>
<style lang="less" scoped>

</style>