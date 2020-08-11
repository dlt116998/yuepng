<template>
    <div class="notfind">
        <div class="btn">
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </div>
    </div>
</template>

<script>
export default {
    created(){

    }
}
</script>

<style lang="less" scoped>
.notfind{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("../assets/img/404.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    min-width: 1400px;
    min-height: 700px;
    overflow: hidden;
    .btn{
        position: absolute;
        top: 60%;
        width: 103.5%;
        text-align: center;
    }
}
</style>