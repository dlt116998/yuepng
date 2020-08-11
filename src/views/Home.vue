<template>
    <div class="home" >
        <el-container>
            <el-aside :width="width">
                <div class="logobox">
                    <img src="../assets/img/logo.png" alt="" class="logo"><span class="title" v-show="!isCollapse">管理后台（mvp版）</span>
                </div>
                <div class="btn">
                    <el-button :icon="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="setisCollapse()" size="mini"></el-button>
                </div>
                

                <el-menu class="el-menu-vertical-demo" mode="vertical" :unique-opened="true" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

                    <el-menu-item index="1" @click="$router.push('/rhome');editableTabsValue='/rhome'">
                        <template slot="title">
                            <i class="el-icon-house"></i>
                            <span slot="title">首页</span>
                        </template>
                    </el-menu-item>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-goods"></i>
                            <span slot="title">商品</span>
                        </template>
                        <el-submenu index="2-1">
                            <template slot="title">商品管理</template>
                            <el-menu-item index="/relese" @click="goPage($event,'发布商品')">发布商品</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2-2">
                            <template slot="title">商品配置</template>
                            <el-menu-item index="2-2-1">商品后台分类</el-menu-item>
                            <el-menu-item index="2-2-2">图片库管理</el-menu-item>
                        </el-submenu>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-odometer"></i>
                            <span slot="title">交易</span>
                        </template>
                        <el-menu-item index="/order" @click="goPage($event,'订单管理')">订单管理</el-menu-item>
                        <el-menu-item index="/refund" @click="goPage($event,'退款申请处理')">退款申请处理</el-menu-item>
                        <el-menu-item index="/setorder" @click="goPage($event,'订单设置')">订单设置</el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span slot="title">用户</span>
                        </template>
                       <el-menu-item index="/role" @click="goPage($event,'角色管理')">角色管理</el-menu-item>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-s-shop"></i>
                            <span slot="title">门店</span>
                        </template>
                        <el-menu-item index="/shop" @click="goPage($event,'门店管理')">门店管理</el-menu-item>
                        <el-menu-item index="/shopgood" @click="goPage($event,'门店商品列表')">门店商品列表</el-menu-item>
                    </el-submenu>

                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-price-tag"></i>
                            <span slot="title">营销</span>
                        </template>
                        <el-menu-item index="/active" @click="goPage($event,'活动列表')">活动列表</el-menu-item>
                    </el-submenu>

                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">设置</span>
                        </template>
                    </el-submenu>

                    <el-submenu index="8">
                        <template slot="title">
                            <i class="fa fa-diamond"></i>
                            <span slot="title">服务</span>
                        </template>
                    </el-submenu>

                    <el-submenu index="9">
                        <template slot="title">
                            <i class="fa fa-line-chart"></i>
                            <span slot="title">数据</span>
                        </template>
                    </el-submenu>

                    <el-submenu index="10">
                        <template slot="title">
                            <i class="fa fa-dollar "></i>
                            <span slot="title">结算</span>
                        </template>
                    </el-submenu>

                    <el-submenu index="11">
                        <template slot="title">
                            <i class="fa fa-file-text-o"></i>
                            <span slot="title">内容</span>
                        </template>
                    </el-submenu>

                    <el-menu-item index="/service" @click="goPage($event,'客服')">
                        <template slot="title">
                            <i class="el-icon-headset"></i>
                            <span slot="title">客服</span>
                        </template>
                    </el-menu-item>


                </el-menu>

                <img src="../assets/img/bottom-logo.png" class="bottom-logo" alt="">
                
            </el-aside>
            <el-container>
                <el-header>
                    <div class="header fr clearfix">
                        <div class="fr">
                            <el-button size="small" class="fl">
                                <el-badge is-dot class="item"><i class="fa fa-bell"></i></el-badge>
                            </el-button>
                            <el-avatar class="fl" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                            <span>{{$store.state.user.M_UserName}} <i class="el-icon-arrow-down down"></i></span>
                            <el-link :underline="false" type="primary" @click="exit()">退出登录<i class="fa fa-share-square-o"></i></el-link>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tab($event)">
                        <el-tab-pane
                            v-for="(item) in editableTabs"
                            :key="item.name"
                            :label="item.title"
                            :name="item.name"
                            :path="item.path"
                        >
                            <router-view></router-view>
                        </el-tab-pane>
                    </el-tabs> 
                </el-main>
            </el-container>
            
        </el-container>
    </div>
</template>

<script>
import Bus from '@/utils/Bus.js'
import {Exit} from '@/api/user.js'
export default {
    name: 'Home',
    data(){
        return {
            user:{},
            width:"270px",
            isCollapse:false,
            editableTabsValue: '/rhome',
            editableTabs: [{
                title: '首页',
                name: '/rhome',
                flag:false
            }],
            tabIndex: 2
        }
    },
    components: {
        
    },
    methods:{
        exit(){
            Exit().then(res=>{
                if(res.data.status==1){
                    sessionStorage.removeItem("token");
                    this.$router.push('/login')
                }
            })
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        setisCollapse(){
            this.isCollapse = !this.isCollapse;
            this.width = this.width=='270px'?"64px":"270px"
        },
        
        removeTab(targetName) {
            if(targetName=='rhome'){return}
            //console.log(targetName) 
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            sessionStorage.setItem("editableTabs",JSON.stringify(this.editableTabs));
            sessionStorage.setItem("editableTabsValue",this.editableTabsValue)
            this.$router.push(this.editableTabsValue)
        },
        tab(e){
            //console.log(e.$options.propsData,"000000");
            sessionStorage.setItem("editableTabsValue",this.editableTabsValue);
            this.$router.push(e.$options.propsData.name)
        },
        goPage(e,title){
            //console.log(e)
            var flag = true;
            this.editableTabs.forEach(item=>{
                if(item.title==title && item.name==e.$options.propsData.index){
                    flag = false; //重复判断
                }
            });
            if(flag){
                if(this.editableTabs.length<=10){
                    this.editableTabs.push({
                        title:title,
                        name:e.$options.propsData.index,
                        flag:true
                    });
                }else{
                    this.editableTabs.splice(9,1,{
                        title:title,
                        name:e.$options.propsData.index,
                        flag:true
                    })
                } 
                flag = true;
            }
            this.editableTabsValue = e.$options.propsData.index;
            
            sessionStorage.setItem("editableTabs",JSON.stringify(this.editableTabs));
            sessionStorage.setItem("editableTabsValue",this.editableTabsValue);

            if(this.$route.path!=e.$options.propsData.index){
                this.$router.push(e.$options.propsData.index)
            }
            
        }
    },
    created(){

        if(sessionStorage.getItem("editableTabs")&&sessionStorage.getItem("editableTabsValue")){
            if(JSON.parse(sessionStorage.getItem("editableTabs")).length){
                this.editableTabs = JSON.parse(sessionStorage.getItem("editableTabs"));
                this.editableTabsValue = sessionStorage.getItem("editableTabsValue");
                 
                // if(this.$route.path!=this.editableTabsValue){
                //     this.$router.push(this.editableTabsValue)
                // }
            } 
        }   
    },
    watch:{
        "$route":{
            handler:function(n,o){
                //console.log(n.path,o.path)
                if(n.path == '/active' && o.path=='/relese'){
                    this.$router.go(0)
                }
            }
        }
    }
    // computed:{
    //     "user":function(){
    //         return JSON.parse(sessionStorage.getItem("user"))
    //     }
    // }
    
}
</script>

<style lang="less" >
.home{
    height: 100vh;
    min-height: 700px;
    &>.el-container{
        height: 100vh;
        // overflow: hidden;
    }
    .logobox{
        height: 60px;
        line-height: 60px;
        .logo{
            vertical-align: text-bottom;
            margin-right: 8px;
        }
    }
    
    .title{
        font-size: 20px;
        color: #3f78f6;
        font-weight: 700;
        line-height: 70px;
    }
    .el-menu-item{
        height: 36px;
        line-height: 36px;
        text-align: left;
    }
    .el-submenu{
        font-size: 14px;
        .el-submenu__title{
            height: 36px;
            line-height: 36px;
            text-align: left;
        }
        .el-menu-item{
            height: 36px;
            line-height: 36px;
            text-align: left;
        }
    } 
    .btn{
        text-align: left;
        .el-button{
            border: none;
            &:focus{
                background-color: #fff;
            }
        }
    }
    i{
        
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;

    }
    
    .el-menu{
        border-right: none;
    }
    .el-aside {
        position: relative;
        // background-color: #D3DCE6;
        color: #333;
        text-align: center;
        // line-height: 200px;
        height: 100vh;
        min-height: 700px;
        transition: width .3s;
        box-shadow: 2px 2px 4px rgba(100,100,100,.1);
        .bottom-logo{
            position: absolute;
            bottom: 20px;
            left: 50%;
            margin-left: -30px;
            width: 30%;
            min-width: 52px;
        }
    }
    .el-header{
        padding: 0;
        padding-left: 24px;
        height: 80px;
         min-width: 1240px;
        background-color: #f0f0f0 ;
        .header{
            width: 100%;
           
            height: 40px;
            box-shadow: -2px 2px 8px rgba(100,100,100,.1);
            background-color: #fff;
            border-radius: 0 0 0 8px;
            line-height: 40px;
            .el-button{
                border: none;
                height: 40px;
                margin-right: 8px;
            }
        }
    }
    .el-main {
        position: relative;
        background-color: #f0f0f0;
        color: #333;
        text-align: center;
        padding-right: 0;
        padding-top: 0;
        padding-bottom: 0;
        min-height: 600px;
        min-width: 1260px;
        // line-height: 160px;
        .el-tabs__header{
            margin-bottom: 0;
        }
        .el-tabs__nav{
            background-color: #f0f0f0;
        }
        .el-tabs__item{
            border-radius: 6px 6px 0 0;
            margin-right: 10px;
            background-color: #fff;
        }
        .el-tabs__content{
            position: absolute;
            bottom:0;
            top: 41px;
            right: 0;
            left: 20px;
            overflow-y: scroll;
            background-color: #fff;
        }
        .el-tabs__content::-webkit-scrollbar{
            display: none;
        }
        .el-table{
            margin-bottom: 0 !important;
        }
        .el-table__row{
            td{
                height: 40px;
                line-height: 40px;
                padding: 0;
            }
        }
        .el-link--inner{
            font-size: 12px;
            .fa{
                font-size: 12px;
                margin-right: 0 !important;
            }
        }
        .fr{
            padding-top: 8px;
            .el-link--inner{
                font-size: 12px;
                line-height: 16px;
            }
            .el-button{
                margin-left: 6px;
                margin-right: 20px;
                padding: 6px 18px 6px 6px;
                .el-icon-search{
                    font-size: 12px;
                    margin: 0;
                }
            }
        }
        .el-button{
        line-height: 12px;
        i{
            font-size: 12px;
            vertical-align: top;
        }
    }
    }
    .page{
        background-color: #eaedf4;
        // border-radius: 0 0 8px 8px;
        padding-right: 16px;
    }
    .down{
        font-size: 14px;
    }
     .el-dialog{
        border-radius: 8px;
        overflow: hidden;
        margin-top: 0;
        min-width: 500px;
        .dialog-footer{
            padding-right: 150px;
        }
        .el-dialog__header{
            padding: 0 20px;
            height: 30px;
            background-color: #3f78f6;
            line-height: 30px;
            
            .el-dialog__title{
                color: #ffffff;
                font-size: 14px;
            }
            .el-dialog__headerbtn{
                display: inline-block;
                top: 5px;
                right: 8px;
                i{
                    color: #ffffff;
                    font-size: 16px;
                }
                
            }
        }
        .el-form-item{
            margin-bottom: 6px;
            .el-form-item__label,.el-form-item__content{
                line-height: 30px !important;
                height: 30px;
                width: 360px;
            }
            .el-select{
                width: 100px;
                margin-right: 8px;
                &.slt-150{
                    width: 150px;
                }
            }
            .ipt-120{
                width: 120px;
                // margin-right: 12px;
            }
            .mr-16{
                margin-right: 16px;
            }
            .fr{
                padding-top: 0;
                span{
                    margin-right: 12px;
                }
            }
            .el-date-editor{
                width: 140px;
                margin-right: 24px;
            }
            .map{
                margin-bottom: 300px !important;
            }
        }
    }
}

</style>
