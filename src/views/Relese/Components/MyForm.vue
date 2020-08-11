<template>
    <div class="form">
        <div><span class="ib"></span> <b>基本信息</b></div>
        <el-form label-width="200px" :model="form">
            <el-form-item label="活动名称" required prop="name">
                <el-input size="small" v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="活动时间" required prop="value1">
                <el-time-picker
                size="small"
                is-range
                v-model="form.value1"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
                </el-time-picker>
            </el-form-item>

            <el-form-item label="广告语" required prop="adver">
                <el-input size="small" v-model="form.adver"></el-input>
            </el-form-item>

            <el-form-item label="活动类型" required prop="type">
                <el-select size="small" v-model="form.type">
                    <el-option value="110" label="110"></el-option>
                </el-select>
            </el-form-item>

            <div><span class="ib"></span> <b>规则设置</b></div>

            <el-form-item label="活动预告时间" prop="time">
                <el-time-select
                size="small"
                v-model="form.time"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                }"
                placeholder="选择时间">
                </el-time-select>
            </el-form-item>

            <el-form-item label="活动对象" required prop="radio">
                <el-radio v-model="form.radio" :label="1">不限</el-radio>
                <el-radio v-model="form.radio" :label="2">限新用户</el-radio>
            </el-form-item>

            <el-form-item label="购买限定" required prop="radio1">
                <el-radio v-model="form.radio1" :label="1">不限</el-radio>
                <el-radio v-model="form.radio1" :label="2">每人活动期限量</el-radio>
                <el-radio v-model="form.radio1" :label="3">每日每天限量</el-radio>
            </el-form-item>

            <el-form-item label="门店限定" required prop="radio2">
                <el-radio v-model="form.radio2" :label="1">不限</el-radio>
                <el-radio v-model="form.radio2" :label="2">指定门店</el-radio>
                <el-button size="mini" type="primary">选择门店</el-button>
            </el-form-item>

            <el-form-item label="配送方式" required prop="radio3">
                <el-radio v-model="form.radio3" :label="1">不限</el-radio>
                <el-radio v-model="form.radio3" :label="2">仅自提</el-radio>
                <el-radio v-model="form.radio3" :label="3">仅配送</el-radio>
            </el-form-item>

            <el-form-item label="提货时间" required prop="pick"> 
                <el-date-picker
                v-model="form.pick"
                size="small"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <div class="tr">
                <el-button type="primary" size="mini" @click="goNext()">下一步，添加活动商品</el-button>
            </div>

        </el-form>

        
    </div>

</template>

<script>
export default {
    data(){
        return {
            form:{...this.form1}
        }
    },
    props:{
        form1:{
            type:Object,
            default:{
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
    methods:{
        goNext(){
            let flag = true;
            for(var i in this.form){
                if(this.form[i].length==0){
                    flag = false;
                }
            }
            if(flag){
                this.$emit("next",this.form)
            }else{
                this.$message.error("信息不完整，请检查表单")
            }
        }
    },
    created(){
        this.$emit("sact",0)
    }
}
</script>

<style lang="less" scoped>
.form{
    min-height: 480px;
    .tr{
        margin-top: 30px;
        margin-bottom: 20px;
    }
}
</style>