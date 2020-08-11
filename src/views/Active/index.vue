<template>
    <div class="active">
        <div class="header tl">
            <el-form :inline="true" :model="form">
                <el-form-item label="活动编号" prop="active_num">
                    <el-input size="mini" v-model="form.active_num"></el-input>
                </el-form-item>
                <el-form-item label="活动名称" prop="name">
                    <el-input size="mini" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动状态">
                    <el-button v-for="(item,index) in btn_info" :key="item.name" @click="screen(item,index)" :type="btn_active==item.text?'primary':''" size="mini">{{item.name}}</el-button>
                </el-form-item>
                <br>

                <el-form-item label="活动状态">
                    <el-checkbox-group v-model="check">
                        <el-checkbox label="全部"></el-checkbox>
                        <el-checkbox label="社群团购"></el-checkbox>
                        <el-checkbox label="折扣"></el-checkbox>
                        <el-checkbox label="直降 "></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <div class="fr">
                    <el-link type="primary" @click="reset()">重置筛选条件</el-link>
                    <el-button size="mini" type="primary" @click="search()"><i class="el-icon-search"></i>查询</el-button>
                </div>
            </el-form>
        </div>

        <div class="table">
            <el-table :data="tableData2" size="mini" border max-height="440" :header-cell-style="{background:'#eaedf4'}">
                <el-table-column
                type="selection"
                width="50"
                ></el-table-column>

                <el-table-column
                label="活动类型"
                prop="type"
                ></el-table-column>

                <el-table-column
                label="活动编号"
                prop="active_num"
                ></el-table-column>

                <el-table-column
                label="活动名称"
                prop="name"
                ></el-table-column>

                <el-table-column
                label="开始时间"
                prop="start_time"
                ></el-table-column>

                <el-table-column
                label="结束时间"
                prop="end_time"
                ></el-table-column>

                <el-table-column
                label="状态"
                prop="status"
                ></el-table-column>

                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-link type="primary" @click="detail=scope.row;dialogFormVisible=true"><i class="el-icon-tickets"></i>详情</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page tr">                       
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currpage"
                :page-sizes="[5, 10, 20, 100]"
                :page-size="pagesize"
                layout="sizes, prev, pager, next"
                :total="tableData.length">
                </el-pagination>            
            </div>
        </div>


        <el-dialog title="活动详情" :visible.sync="dialogFormVisible" class="tl">
            <el-form label-width="180px">

                <el-form-item label="活动名称">
                    <div>{{detail.name}}</div>
                </el-form-item>

                <el-form-item label="活动事件">
                    <div>{{detail.start_time}}--{{detail.end_time}}</div>
                </el-form-item>

                <el-form-item label="广告语">
                    <div>好消息！好消息！本店所有商品清仓处理!</div>
                </el-form-item>

                <el-form-item label="活动类型">
                    <div>{{detail.type}}</div>
                </el-form-item>

                <el-form-item label="顾客类型">
                    <div>不限</div>
                </el-form-item>

                <el-form-item label="是否限量">
                    <div>不限</div>
                </el-form-item>

                <el-form-item label="配送方式">
                    <div>仅限自提</div>
                </el-form-item>

                <el-form-item label="提货时间">
                    <div>2020.7.30</div>
                </el-form-item>

                <el-form-item class="tr">
                    <el-button type="primary" size="small" @click="dialogFormVisible=false">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {getActive} from '@/api/goods.js'
export default {
    data(){
        return {
            btn_active:"",
            btn_info:[{text:"",name:"全部",num:100},{text:"待开始",name:"待开始",num:0},{text:"进行中",name:"进行中",num:0},{text:"已结束",name:"已结束",num:0}],
            check:["全部"],
            tableData:[],
            tableData1:[],
            pagesize:10,
            currpage:1,
            form:{
                active_num:"",
                name:""
            },
            dialogFormVisible:false,
            detail:{}
        }
    },
    methods:{
        getActiveInfo(){
            getActive().then(res=>{
                this.tableData = res.data.result;
                this.tableData1 = res.data.result;
            }).catch(err=>{
                console.log(err)
            })
        },
        handleSizeChange(v){
            this.pagesize=v
        },
        handleCurrentChange(v){
            this.currpage=v
        },
        screen(item,index){
            this.btn_active=item.text; 
            this.tableData = this.tableData1.filter(it=>{
                if(item.text==''){
                    return item
                }
                return it.status == item.text
            }).filter(item=>{
                return (item.active_num+"").includes(this.form.active_num) && item.name.includes(this.form.name)
            }).filter(item=>{
                var i = this.check.indexOf("全部");
                let flag = false;
                if(i == -1){
                    this.check.forEach(it=>{
                        if(it.trim()==item.type.trim()){
                            flag = true;
                        }
                    })
                }else{
                    flag = true;
                }
                    
                if(flag){
                    return item
                }
            })
        },
        search(){
            var i = this.check.indexOf("全部")
            if(i!=-1){
                this.tableData = this.tableData1.filter(item=>{
                    return (item.active_num+"").includes(this.form.active_num) && item.name.includes(this.form.name) && item.status.includes(this.btn_active)
                })
            }else{
                this.tableData = this.tableData1.filter(item=>{
                    return (item.active_num+"").includes(this.form.active_num) && item.name.includes(this.form.name) && item.status.includes(this.btn_active)
                }).filter(item=>{
                    let flag = false;
                    this.check.forEach(it=>{
                        if(it.trim()==item.type.trim()){
                            flag = true;
                        }
                    })
                    if(flag){
                        return item
                    }
                })
            }
            
        },
        reset(){
            this.form = {active_num:"",name:""};
            this.btn_active = "        "
            this.tableData = this.tableData1
        }
    },
    created(){
        this.getActiveInfo();
        
    },
    computed:{
        "tableData2":function(){
            return this.tableData.slice((this.currpage-1)*this.pagesize,this.currpage*this.pagesize)
        }
    }
}
</script>

<style lang="less" >
.active{
    .header{
        padding-left: 20px;
        padding-top: 20px;
    }
    .el-form-item{
        margin-bottom: 0;
    }
    .table{
        padding: 0 16px;
        i{
            font-size: 12px !important;
            margin: 0;
        }
    }
    .page{
        background-color: #eaedf4;
        padding-right: 16px;
    }
    .el-dialog{
        .el-dialog__header{
            padding: 0 20px;
            height: 30px;
            background-color: #3f78f6;
            line-height: 30px;
            
        }
        .el-dialog__title{
            color: #fff;
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
}
</style>