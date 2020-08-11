<template>
    <div class="login">
        <el-card class="box-card">
            <h1><span class="blue">登录</span>欢迎使用悦朋软件</h1>
            <el-form :model="user">
                <el-form-item prop="userid">
                    <el-input v-model="user.userid">
                        <template slot="prepend"><i class="fa fa-user"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input v-model="user.pwd" type="password">
                        <template slot="prepend"><i class="fa fa-lock"></i></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="ipt" v-model="v_num"></el-input>
                    <div class="verify fr" @click="getVerifyNum">{{num}}</div>
                </el-form-item>
                <el-form-item>
                    <el-link type="primary" class="link">立即注册</el-link>
                    <div class="fr">
                        <el-link class="link">忘记密码</el-link>
                    </div>
                </el-form-item>

                <el-form-item class="tc">
                    <el-button type="primary" round class="btn" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {getVerify,Login,getUser} from '@/api/user.js'
export default {
    data(){
        return {
            num:"",
            user:{
                fmdo:"login",
                dopost:"login",
                userid:"",
                pwd:""
            },
            v_num:""
        }
    },
    methods:{
        getVerifyNum(){
            getVerify().then(res=>{
                this.num = res.data.num;
            }).catch(err=>{
                console.log(err)
            })
        },
        login(){
            Login(this.user).then(res=>{
                if(this.v_num==this.num){
                    if(res.data.status==1){
                        sessionStorage.setItem("token",res.data.token);
                        getUser().then(re=>{
                            //console.log(re)
                            this.$store.commit("gUser",re.data);
                        }).catch(err=>{
                            console.log(err)
                        })
                        this.$router.push("/")
                    }
                }else{
                    this.$message.error("验证码不正确");
                    this.getVerifyNum()
                }            
            }).catch(err=>{
                this.$message.error("用户名或密码不正确");
            })
        }
    },
    created(){
        this.getVerifyNum()
    }
}
</script>

<style lang="less" scoped>
.login{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("../../assets/img/login1.jpg");
    background-size: cover;
    min-width: 1400px;
    min-height: 700px;
    .box-card{
        position: absolute;
        right: 180px;
        top: 120px;
        width: 440px;
        height: 480px;
        padding: 16px;
        h1{
            font-size: 26px;
            margin-bottom: 40px;
            .blue{
                color:#409EFF;
                font-size: 32px;
                margin-right: 12px;
            }
        }
        .ipt{
            width: 180px;
        }
        .verify{
            width: 180px;
            height: 40px;
            border-radius: 4px;
            color: #409EFF;
            background-color: #ccc;
            text-align: center;
            padding: 0 20px;
            font-size: 28px;
            font-weight: 800;
        }
        .link{
            line-height: normal;
        }
        .btn{
            width: 80%;
        }
    }
}
</style>