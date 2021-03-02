<template>
    <div>
        <web-view :src="src"></web-view>
    </div>
</template>
<script>
export default {
    data(){
        return{
            src:''
        }
    },
    mounted() {
        let url = 'https://www.youbaobao.xyz/book/#/ebook/';
        const { fileName,opf,href } = this.$route.query;
        if(fileName && opf){
            if(href){
                url+=`${fileName}?navigation=${href}&opf=${opf}`
            }else{
                url+=`${fileName}?opf=${opf}`
            }
            this.src = url;
        }
    },
}
</script>