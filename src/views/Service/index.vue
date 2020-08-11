<template>
    <div class="service">
        <div class="window">
            <div v-if="list.length">
                <div v-for="item in list" :key="item.userid">
                    <div v-if="item.userid != userid" class="tl">
                        <span class="name">{{item.username}}：</span>
                        <span class="msg">{{item.message}}</span>
                    </div>
                     <div v-else-if="item.userid == userid" class="tr">
                        <span class="rmsg">{{item.message}}</span>
                        <span class="name">:{{item.username}}</span>
                     </div>
                </div>
            </div>
           
        </div>
        <el-form :model="form">
            <el-form-item prop="msg">
                <el-input v-model="form.msg">
                    <el-button slot="append" type="primary" @click="send()">发送</el-button>   
                </el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import * as io from 'socket.io-client'
let socket = io.connect("ws://localhost:5050");

let slist = []
socket.on("login",data=>{
    console.log(data)
})
socket.on("logout",data=>{
    console.log(data)
})
socket.on("message",data=>{
    //console.log(data)
    slist.push(data)
})

export default {
    
    data(){
        return {
            socket:null,
            userid:null,
            username:null,
            form:{
                msg:""
            },
            list:slist
        }
    },
    created(){
        this.userid = new Date().getTime();
        this.username = this.$store.state.user.M_UserName;
          

        socket.emit("login",{
            userid:this.userid,
            username:this.username
        })

       
        
    },
    methods:{
        send(){
            socket.emit("message",{message:this.form.msg,userid:this.userid,username:this.username});
            this.form.msg = ""
        }
    },
    beforeRouteLeave(to,from,next){
        socket.emit("logout",{
            userid:this.userid,
            username:this.username
        });
        next()
    }
}
</script>

<style lang="less" scoped>
.service{
    padding: 30px;
    .window{
        width: 100%;
        height: 400px;
        background-color: #c0c0c0;
        margin-bottom: 20px;
        padding: 12px;
        
        .tl,.tr{
            margin-bottom: 6px;
        }
        
        .name{
            font-weight: 800;
            font-size: 18px;
            margin-left: 8px;
            margin-right: 8px;
        }
        .msg{
            position: relative;
            display: inline-block;
            max-width: 500px;
            background-color: #fff;
            border-radius: 4px;
            padding: 8px;
        }
        .msg::before{
            content: "";
            position: absolute;
            border: 5px solid transparent;
            border-right-color: #fff;
            top: 10px;
            left: -10px;
        }
        .rmsg{
            position: relative;
            display: inline-block;
            max-width: 500px;
            background-color: #07f;
            border-radius: 4px;
            padding: 8px;
            color: #fff;
        }
        .rmsg::before{
            content: "";
            position: absolute;
            border: 5px solid transparent;
            border-left-color: #07f;
            bottom: 14px;
            right: -10px;
        }
    }
}
</style>