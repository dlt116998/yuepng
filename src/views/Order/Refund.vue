<template>
    <div class="refund" id="refund">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in info" :key="index" :label="item.name+`(${item.num})`" :name="item.name">
                <div class="form tl">
                    <el-form :model="form" :inline="true" class="demo-form-inline">

                        <el-form-item label="输入搜索:" prop="ipt">
                            <el-input v-model="form.ipt" size="mini"></el-input>
                        </el-form-item>

                        <el-form-item label="申请时间:" prop="time">
                            <el-time-select
                                v-model="form.time"
                                size="mini"
                                :picker-options="{
                                start: '08:30',
                                step: '00:15',
                                end: '18:30'
                                }">
                            </el-time-select>
                        </el-form-item>

                        <el-form-item label="处理状态:" prop="status">
                            <el-select v-model="form.status" placeholder="请选择" size="mini">
                                <el-option
                                v-for="item in form.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <div class="fr">
                            <el-link type="primary" @click="reset()">重置筛选条件</el-link>
                            <el-button size="mini" icon="el-icon-search" type="primary" @click="search()">查询</el-button>
                        </div>
                    </el-form>
                </div>

                <div class="table">

                    <el-table size="mini" :data="tableData2" border max-height="420" :header-cell-style="{background:'#eaedf4'}">

                        <el-table-column
                        type="selection"
                        width="55"
                        style="width: 100%;text-align:center"
                        ></el-table-column>

                        <el-table-column
                        label="退款单号"
                        prop="order_num"
                        ></el-table-column>

                        <el-table-column
                        label="申请时间"
                        prop="start_time"
                        ></el-table-column>

                        <el-table-column
                        label="用户账号"
                        prop="user_num"
                        ></el-table-column>

                        <el-table-column
                        label="退款金额"
                        >
                            <template slot-scope="scope">
                                ￥{{scope.row.price}}
                            </template>
                        </el-table-column>

                        <el-table-column
                        label="申请状态"
                        >
                            <template slot-scope="scope">
                                <span :class="{'success':scope.row.status=='已处理','fail':scope.row.status=='已拒绝','warning':scope.row.status=='待处理'}">{{scope.row.status}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                        label="处理时间"
                        prop="end_time"
                        ></el-table-column>

                        <el-table-column
                        label="操作"
                        >
                            <template slot-scope="scope">
                                <el-link type="primary" @click="dialogVisible=true;table_row=scope.row"><i class="fa fa-search"></i>查看订单</el-link>
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
            </el-tab-pane>
        </el-tabs>

<!-- 退款对话框 -->
        <el-dialog
            title="服务单详情"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">

            <el-form label-width="200px">
                <el-form-item label="退款单号" >{{table_row.order_num}}</el-form-item>

                <el-form-item label="申请状态">
                    <span :class="{'success':table_row.status=='已处理','fail':table_row.status=='已拒绝','warning':table_row.status=='待处理'}">{{table_row.status}}</span>
                </el-form-item>

                <el-form-item label="订单编号">{{table_row.num}}</el-form-item>

                <el-form-item label="申请时间">{{table_row.start_time}}</el-form-item>

                <el-form-item label="用户账号">{{table_row.user_num}}</el-form-item>

                <el-form-item label="订单金额">{{table_row.price}}</el-form-item>

                <el-form-item label="确认退款金额">{{table_row.price}}</el-form-item>

                <el-form-item label="退款方式">退回到原支付渠道</el-form-item>
                <el-form-item label="退款类型">取消订单</el-form-item>
                <el-form-item label="退款原因">原因描述：巴拉巴拉</el-form-item>

                <el-form-item label="备注">
                    <el-input size="mini"></el-input>
                </el-form-item>

            </el-form>
            
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="refund('已处理')" size="mini"><i class="el-icon-check"></i>确认退款</el-button>
                <el-button @click="refund('已拒绝')" size="mini" type="primary"><i class="el-icon-close"></i>拒绝退款</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    data(){
        return {
            activeName:'全部申请',
            currpage:1,
            pagesize:10,
            info:[{name:'全部申请',num:0},{name:'待处理',num:0},{name:'已处理',num:0},{name:'已拒绝',num:0}],
            form:{
                ipt:"",
                time:"",
                status:"",
                options:[{
                    value:"待处理",
                    label:"待处理"
                },{
                    value:"已处理",
                    label:"已处理"
                },{
                    value:"已拒绝",
                    label:"已拒绝"
                }]  
            },
            tableData:[],
            tableData1:[],
            dialogVisible:false,
            table_row:{}
        }
    },
    methods:{
        refund(e){
            var index = this.tableData.indexOf(this.table_row);
            this.table_row.status = e;
            this.dialogVisible = false;
            this.info.forEach(item=>{
                if(item.name=='全部申请'){
                    item.num = this.tableData.length;
                }else{
                    item.num = this.tableData.filter(item1=>{
                        return item.name == item1.status
                    }).length
                }
            })
        },
        getRefundInfo(){
            this.$goods.getRefund().then(res=>{
                console.log(res);
                this.tableData = res.data.result;
                this.tableData1 = res.data.result;
                this.info.forEach(item=>{
                    if(item.name=='全部申请'){
                        item.num = res.data.result.length;
                    }else{
                        item.num = res.data.result.filter(item1=>{
                            return item.name == item1.status
                        }).length
                    }
                })
            }).catch(err=>{
                console.log(err)
            })
        },
        handleSizeChange(val){
            this.pagesize = val;
        },
        handleCurrentChange(val){
            this.currpage = val;
        },
        search(){
            this.tableData = this.tableData1.filter(item=>{
                return ((item.order_num+"").includes(this.form.ipt) || (item.user_num+"").includes(this.form.ipt)) && item.status.includes(this.form.status)
            })
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
        reset(){
            this.form = {
                ipt:"",
                time:"",
                status:"",
                options:[{
                    value:"待处理",
                    label:"待处理"
                },{
                    value:"已处理",
                    label:"已处理"
                },{
                    value:"已拒绝",
                    label:"已拒绝"
                }]  
            };
            this.tableData = this.tableData1;
            this.activeName = "全部申请";
        },
        handleClick(tab,event){
            var text = event.path[0].innerText.slice(0,event.path[0].innerText.indexOf("("));
            if(text == '全部申请'){
                this.tableData = this.tableData1
            }else{
                this.tableData = this.tableData1.filter(item=>{
                    return item.status == text;
                })
            }
        }
    },
    created(){
        this.getRefundInfo()
    },
    computed:{
        "tableData2":function(){
            return this.tableData.slice((this.currpage-1)*this.pagesize,this.currpage*this.pagesize)
        }
    }
}
</script>

<style lang="less">
#refund.refund{
    .el-date-editor--time-select{
        width: 130px;
        margin-top: 2px;
    }
    .el-select--mini{
        width: 150px;
    }
    .el-tabs{
        padding: 0 8px;
    }
    .el-tabs__nav-wrap::after{
        z-index: 5;
    }
    .el-tabs__nav{
        background-color: #fff;
    }
    .el-tabs__item.istop{
        border-radius: 0;
        margin-right: 0px;
        background-color: #fff;
    }
    .page{
        background-color: #eaedf4;
        // border-radius: 0 0 8px 8px;
        padding-right: 16px;
    }
    .el-dialog{
        border-radius: 8px;
        overflow: hidden;
        margin-top: 0;
        min-height: 200px;
        min-width: 600px;

        .el-dialog__header{
            padding: 0 20px;
            height: 30px;
            background-color: #3f78f6;
            line-height: 30px;
            text-align: left;
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
            div.el-form-item__content{
                text-align: left;
                .el-input{
                    width: 200px;
                }
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