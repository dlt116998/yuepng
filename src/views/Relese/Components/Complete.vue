<template>
    <div class="complete tc">
        <img src="../../../assets/img/success.png" alt="">
        <p class="title">创建活动成功</p>
        <el-button size="mini" @click="goAct()">活动列表</el-button>
        <el-button size="mini" type="primary">活动详情</el-button>
    </div>
</template>

<script>
import Bus from '@/utils/Bus.js'
export default {
    methods:{
        goAct(){
            sessionStorage.setItem("editableTabsValue",'/active');
            var arr = JSON.parse(sessionStorage.getItem("editableTabs"));
            var arr1 = arr.filter(item=>{
                return item.name == '/active'
            });
            if(arr1.length==0){
                arr.push({
                    title:"活动列表",
                    name:"/active",
                    flag:true
                });
                sessionStorage.setItem("editableTabs",JSON.stringify(arr))
            }
            this.$router.push('/active');
        }
    },
    created(){
        this.$emit("sact",2)
    }
}
</script>

<style lang="less" scoped>
.complete{
    width: 100%;
    height: 100%;
    padding-top: 20px;
    .title{
        margin-top: 20px;
    }
}
</style>