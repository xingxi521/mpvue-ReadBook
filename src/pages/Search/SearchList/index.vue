<template>
    <div>
        <SearchItem :title="category.categoryText" subTitle="category" icon="apps-o" v-if="category" @onClick="onClickItemHandler"/>
        <SearchItem :title="author.author" subTitle="author" icon="user-o" v-if="author" @onClick="onClickItemHandler"/>
        <SearchItem :title="publisher.publisher" subTitle="publisher" icon="user-o" v-if="publisher" @onClick="onClickItemHandler"/>
        <SearchTable :data="listData" @onClick="onClickHandler"/>
    </div>
</template>
<script>
import SearchItem from './SearchItem'
import SearchTable from './SearchTable'
export default {
    components:{
        SearchItem,
        SearchTable
    },
	computed:{
        category(){
            return (this.data && this.data.category && this.data.category.length >0 && this.data.category[0]) || null;
        },
		author(){
			return this.data && this.data.author && this.data.author.length >0 && this.data.author[0] || null;
		},
		publisher(){
			return this.data && this.data.publisher && this.data.publisher.length >0 && this.data.publisher[0] || null;
		},
		listData(){
			return (this.data && this.data.book && this.data.book.length > 0 && this.data.book) || [];
		}
    },
    props:{
        data:{
            type:Object,
            default:function(){
                return {};
            }
        }
    },
    methods: {
        //点击三栏项目
        onClickItemHandler(title,subTitle){
            this.$router.push({
                path:'/pages/SearchList/main',
                query:{
                    title,
                    subTitle
                }
            });
        },
        //点击书本事件
        onClickHandler(book){
            this.$router.push({
                path:'/pages/BookDetail/main',
                query:{
                    fileName:book.fileName
                }
            });
        }
    },
}
</script>
<style lang="less" scoped>

</style>