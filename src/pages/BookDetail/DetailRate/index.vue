<template>
    <div class="detail-rate-main">
        <div class="detail-rate-wrapper">
            <div class="rate-left">轻点评分</div>
            <div class="rate-right">
                <van-rate value="0" size="22" color="#1D89EE" void-color="#DEE0E2" void-icon="star" @change="onChange"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        onChange(e){
            this.$emit('onChange',e.mp.detail);
        }
    },
}
</script>
<style lang="less" scoped>
    .detail-rate-main{
        padding: 0 20px;
        .detail-rate-wrapper{
            border-bottom: 1px solid #DCDCDC;
            padding-bottom: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .rate-left{
                font-size: 12.5px;
                color: #99A0AA;
            }
        }
    }
</style>