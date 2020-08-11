<template>
    <div class="relese">
        <div class="header tl">
            <el-steps :active="active" finish-status="success" :align-center="true">
                <el-step title="活动信息"></el-step>
                <el-step title="添加活动商品"></el-step>
                <el-step title="创建成功"></el-step>
            </el-steps>
        </div>
        <div class="content tl">
            <component :is="cmpt" @next="setActive($event)" @goOut="goOut()" @sact="sact($event)" :form1="form"></component>   
        </div>    
    </div>
</template>

<script>
import MyForm from './Components/MyForm'
import Bus from '@/utils/Bus.js'
export default {
    data(){
        return {
            active:0,
            cmpt1:["MyForm","AddGood","Complete"],
            form:{
                name:"",
                value1: [new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 20, 0)],
                radio:1,
                radio1:1,
                radio2:1,
                radio3:1,
                adver:"",
                type:"",
                time:"",
                pick:""
            }
        }
    },
    components:{
        MyForm,
        AddGood:()=>import( /* webpackPrefetch:true */ "./Components/AddGood"),
        Complete:()=>import( /* webpackPrefetch:true */ "./Components/Complete")
    },
    methods:{
        setActive(e){
            this.active++;
            this.form = {...e}
        },
        sact(e){
            this.active = e
        },
        goOut(){
            this.active--;
        }
    },
    beforeRouteLeave(to,from,next){
        if(this.active==0){
            this.$confirm('确认离开当前页面？离开后表单内容将不会被保存')
            .then(_ => {
                
                next();
                done();
            })
            .catch(_ => { 

                next(false) 
            });
        }else{
            let obj = {
                title:"活动列表",
                name:"/active",
                flag:true
            }
            Bus.$emit("go",obj)
            next()
        } 
    },
    computed:{
        "cmpt":function(){
            return this.cmpt1[this.active]
        }
    }
}
</script>

<style lang="less">
.relese{
    min-height: 560px;
    .header{
        padding: 20px 200px;
    }
    .content{
        padding: 0 100px;
        .form{
            width: 560px;
            margin: 0 auto;
            .el-form-item{
                margin-bottom: 0;
            }
        }
        .ib{
            display: inline-block;
            height: 16px;
            width: 4px;
            background-color: #409EFF;
            vertical-align: middle;
        }
    }
}
</style>