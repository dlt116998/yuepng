<template>
    <div class="setorder">
        <div class="form">
            <el-form :model="form" label-width="140px">
                <el-form-item class="item" label="秒杀订单超过" required prop="value1">
                    <el-input size="mini" class="ipt" v-model="form.value1">
                        <template slot="append">分</template>
                    </el-input>
                    <el-link class="link" type="primary">未付款，订单自动关闭</el-link>
                </el-form-item>

                <el-form-item class="item" label="拼团订单开团超过" required prop="value2">
                    <el-input size="mini" class="ipt" v-model="form.value2">
                        <template slot="append">时</template>
                    </el-input>
                    <el-link class="link" type="primary">未成团，订单自动退款</el-link>
                </el-form-item>

                <el-form-item class="item" label="普通订单超过" required prop="value3">
                    <el-input size="mini" class="ipt" v-model="form.value3">
                        <template slot="append">时</template>
                    </el-input> 
                    <el-link class="link" type="primary">未付款，订单自动关闭</el-link>
                </el-form-item>

                <el-form-item class="item" label="代提货超过" required prop="value4">
                    <el-input size="mini" class="ipt" v-model="form.value4">
                        <template slot="append">天</template>
                    </el-input>
                    <el-link class="link" type="primary">未提货，订单自动退款</el-link>
                </el-form-item>

                <el-form-item class="item" label="订单完成超过" required prop="value5">
                    <el-input size="mini" class="ipt" v-model="form.value5">
                        <template slot="append">天</template>
                    </el-input>
                    <el-link class="link" type="primary">自动结束交易，不能申请售后</el-link>
                </el-form-item>
                <el-form-item class="tl">
                    <el-button size="mini" type="primary" @click="msg()"><i class="el-icon-check"></i>提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form:{
                value1:"20",
                value2:"1",
                value3:"1",
                value4:"1",
                value5:"1"
            }
        }
    },
    methods:{
        msg(){
            this.$message({
                message:"设置成功",
                type:"success"
            })
        }
    }
}
</script>

<style lang="less" scoped>
.setorder{
    .form{
        padding: 100px 360px 0;
        text-align: left;
        .ipt{
            text-align: left;
            vertical-align: middle;
            width: 200px;
            margin-right: 6px;
        }
        .link{
            line-height: normal;
        }
    }
}
</style>