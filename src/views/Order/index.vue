<template>
    <div class="good" id="good">
         <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in info" :key="item.name" :label="item.name+`(${item.num})`" :name="item.name">
                <div class="content">
                    <div class="radio">
                        配送方式：
                        <el-radio v-model="radio" label="全部">全部</el-radio>
                        <el-radio v-model="radio" label="自提">自提</el-radio>
                        <el-radio v-model="radio" label="配送">配送</el-radio>
                    </div>

                    <div class="form1">
                        
                        <el-form :inline="true"  class="demo-form-inline" ref="ruleForm" :model="Form"  >
                            <div>
                                <el-form-item label="订单编号:" prop="order_num">
                                    <el-input size="mini" v-model="Form.order_num"></el-input>
                                </el-form-item> 
                                <el-form-item label="商品编号:" prop="good_num">
                                    <el-input size="mini" v-model="Form.good_num"></el-input>
                                </el-form-item>   
                                <el-form-item label="所属门店:" prop="shop">
                                    <el-input size="mini" v-model="Form.shop"></el-input>
                                </el-form-item>  

                                <div class="fr">
                                    <el-link type="primary" @click="resetForm('ruleForm')">重置筛选条件</el-link>
                                    <el-button size="mini" icon="el-icon-search" type="primary" @click="search()">查询</el-button>
                                </div> 
                            </div>

                            <div>
                                <el-form-item label="会员账号:" prop="vip_num">
                                    <el-input size="mini" v-model="Form.vip_num"></el-input>
                                </el-form-item>
                                <el-form-item label="收货人:" prop="name">
                                    <el-input size="mini" v-model="Form.name"></el-input>
                                </el-form-item>
                                <el-form-item label="下单时间:" >
                                    <el-time-select
                                        placeholder="起始时间"
                                        v-model="start_time"
                                        size="mini"
                                        :picker-options="{
                                        start: '08:30',
                                        step: '00:15',
                                        end: '18:30'
                                        }">
                                    </el-time-select>
                                </el-form-item>
                                <el-form-item label="-" >
                                    <el-time-select
                                        placeholder="结束时间"
                                        v-model="end_time"
                                        size="mini"
                                        :picker-options="{
                                        start: '08:30',
                                        step: '00:15',
                                        end: '18:30',
                                        minTime: startTime
                                        }">
                                    </el-time-select>
                                </el-form-item>
                            </div>
                            
                        </el-form>
                    </div>

                    <el-button class="good-btn" size="mini" type="primary" @click="exportExcel()"><i class="fa fa-external-link"></i>导出选中订单</el-button>

                    <div class="table">
                        <el-table
                        :data="tableData2"
                        border
                        max-height="360"
                        size="mini"
                        :header-cell-style="{background:'#eaedf4'}"
                        style="width: 100%;text-align:center"
                        @selection-change="handleSelectionChange">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                            prop="order_num"
                            label="订单编号"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="confirmed_at"
                            label="下单时间"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="phone"
                            label="会员账号"
                            width="120">
                            </el-table-column>

                            <el-table-column
                            label="订单总额"
                            width="100">
                                <template slot-scope="scope">￥{{scope.row.total_amount}}</template>
                            </el-table-column>

                            <el-table-column
                            label="所属门店"
                            width="160">
                                <template slot-scope="scope">{{scope.row.city}}店</template>
                            </el-table-column>

                            <el-table-column
                            label="收货人"
                            prop="consignee"
                            ></el-table-column>

                            <el-table-column
                            label="配送方式"
                            prop="type"
                            ></el-table-column>

                            <el-table-column
                            label="订单状态"
                            >
                                <template slot-scope="scope" >
                                    <span :class="{'success':scope.row.order_status=='已完成'||'已退款','info':scope.row.order_status=='已拒绝','warning':scope.row.order_status=='待付款','fail':scope.row.order_status=='待收货'}">{{scope.row.order_status}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column
                            label="操作"
                            >
                                <template slot-scope="scope">
                                    <el-link type="primary" @click="detail=scope.row;dialogFormVisible=true"><i class="fa fa-search"></i>  查看订单</el-link>
                                </template>
                            </el-table-column>

                        </el-table>
                        <div class="page tr">
                            <!-- <template #append> -->
                                
                                    
                                    <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currpage"
                                    :page-sizes="[5, 10, 20, 100]"
                                    :page-size="pagesize"
                                    layout="sizes, prev, pager, next"
                                    :total="tableData.length">
                                    </el-pagination>
                                
                            <!-- </template> -->
                        </div>

                    </div>

                </div>
                <!-- 结束 -->
            </el-tab-pane>
        </el-tabs>

        <el-dialog title="订单详情" width="40%" :visible.sync="dialogFormVisible" class="tl">
            <el-form label-width="180px">
                <el-form-item label="订单编号">
                    <div>{{detail.order_num}}</div>
                </el-form-item>
                <el-form-item label="收货人">
                    <div>{{detail.consignee}}</div>
                </el-form-item>
                <el-form-item label="订单状态">
                    <div>{{detail.order_status}}</div>
                </el-form-item>
                <el-form-item label="配送方式">
                    <div>{{detail.type}}</div>
                </el-form-item>
                <el-form-item label="所属门店">
                    <div>{{detail.city}}店</div>
                </el-form-item>
                <el-form-item label="订单总金额">
                    <div>￥{{detail.total_amount}}</div>
                </el-form-item>
                <el-form-item label="下单时间">
                    <div>{{detail.confirmed_at}}</div>
                </el-form-item>
                <el-form-item label="会员账号">
                    <div>{{detail.phone}}</div>
                </el-form-item>
                <el-form-item class="tr">
                    <el-button type="primary" size="small" @click="dialogFormVisible=false">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-table
        id="outTable"
        v-if="check.length"
        :data="check1"
        border
        max-height="360"
        size="mini"
        :header-cell-style="{background:'#eaedf4'}"
        style="width: 100%;text-align:center;display:none">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="order_num"
            label="订单编号"
            width="180">
            </el-table-column>
            <el-table-column
            prop="confirmed_at"
            label="下单时间"
            width="180">
            </el-table-column>
            <el-table-column
            prop="phone"
            label="会员账号"
            width="120">
            </el-table-column>

            <el-table-column
            label="订单总额"
            width="100">
                <template slot-scope="scope">￥{{scope.row.total_amount}}</template>
            </el-table-column>

            <el-table-column
            label="所属门店"
            width="160">
                <template slot-scope="scope">{{scope.row.city}}店</template>
            </el-table-column>

            <el-table-column
            label="收货人"
            prop="consignee"
            ></el-table-column>

            <el-table-column
            label="配送方式"
            prop="type"
            ></el-table-column>

            <el-table-column
            label="订单状态"
            >
                <template slot-scope="scope" >
                    <span :class="{'success':scope.row.order_status=='已完成'||'已退款','info':scope.row.order_status=='已拒绝','warning':scope.row.order_status=='待付款','fail':scope.row.order_status=='待收货'}">{{scope.row.order_status}}</span>
                </template>
            </el-table-column>

            <el-table-column
            label="操作"
            >
                <template slot-scope="scope">
                    <el-link type="primary" @click="detail=scope.row;dialogFormVisible=true"><i class="fa fa-search"></i>  查看订单</el-link>
                </template>
            </el-table-column>

        </el-table>
        
    </div>
</template>

<script>
import FileSaver from 'file-saver';
 
import XLSX from 'xlsx';

export default {
     data() {
      return {
        startTime: '',
        endTime: '',
        activeName: '当日订单',
        list:[],
        info:[{name:"当日订单",num:100},{name:"待付款",num:0},{name:"待发货",num:0},{name:"待收货",num:0},{name:"已完成",num:0},{name:"待退款",num:0},{name:"已退款",num:0}],
        radio: '全部',
        tableData:[],
        tableData1:[], //总数据
        pagesize:5,
        currpage:1,
        Form:{
            order_num:"",
            good_num:"",
            shop:"",
            vip_num:"",
            name:"",
        },
        start_time:"",
        end_time:"",
        text:"全部",
        dialogFormVisible:false,
        detail:{},
        check:[]
      };
    },
    methods: {
        handleClick(tab, event) {  //最上方筛选
           // console.log(event.path[0].innerText);

            this.text = event.path[0].innerText.slice(0,event.path[0].innerText.indexOf("("));
            if(this.text == '当日订单'){
                this.tableData = this.tableData1.filter(item=>{
                    return item.order_num.includes(this.Form.order_num) && item.city.includes(this.Form.shop) && (item.phone+"").includes(this.Form.vip_num) && item.consignee.includes(this.Form.name)
                })
            }else{
                this.tableData = this.tableData1.filter(item=>{
                    return item.order_status == this.text;
                }).filter(item=>{
                    return item.order_num.includes(this.Form.order_num) && item.city.includes(this.Form.shop) && (item.phone+"").includes(this.Form.vip_num) && item.consignee.includes(this.Form.name)
                })
            }
            
        },
        getData(){ //异步请求
            //console.log(this.$goods)
            this.$goods.getGoods().then(res=>{
                console.log(res.data.result);
                this.tableData = res.data.result;
                this.tableData1 = res.data.result;
                this.info.forEach(item => {
                    if(item.name=="当日订单"){
                        item.num = res.data.result.length;
                    }else{
                        item.num = this.tableData1.filter(item1 => {
                            return item1.order_status == item.name  
                        }).length
                    }
                });
            }).catch(err=>{
                console.log(err)
            })
        },
        search(){
            this.tableData = this.tableData1.filter(item=>{
                return item.order_num.includes(this.Form.order_num) && item.city.includes(this.Form.shop) && (item.phone+"").includes(this.Form.vip_num) && item.consignee.includes(this.Form.name)
            }).filter(item=>{
                if(this.text == '全部'){
                    return item;
                }else{
                    return item.order_status == this.text;
                }
                
            }).filter(item=>{
                if(this.radio == "全部"){
                    return item;
                }else{
                    return item.type == this.radio
                }
                
            })
        },
        handleSizeChange(val) { //分页
            console.log(`每页 ${val} 条`);
            this.pagesize = val
        },
        handleCurrentChange(val) { //分页
            console.log(`当前页: ${val}`);
            this.currpage = val
        },
        resetForm(formName) { //重置表单
           // console.log(1)
            this.Form = {
                order_num:"",
                good_num:"",
                shop:"",
                vip_num:"",
                name:""
            };
            this.radio = '1';
            this.tableData = this.tableData1;
            this.activeName = '当日订单'
        },

        exportExcel() {
            if(this.check.length){
　　　　　　　　let vb = XLSX.utils.table_to_book(document.getElementById('outTable'));
　　　　　　　　let vbout = XLSX.write(vb, {bookType: 'xlsx', bookSST: true, type: 'array'});
　　　　　　　　try {
    　　　　　　　　FileSaver.saveAs(new Blob([vbout], {type: 'application/octet-stream'}), 'sheetjs.xlsx');
　　　　　　　　} catch (e) {
    　　　　　　　　if (typeof console !== 'undefined') console.log(e, vbout);
　　　　　　　　}
　　　　　　　　return vbout;
            }else{
                this.$message({
                    message:"请选择导出文件",
                    type:"error"
                })
            }
　　　　 },
        handleSelectionChange(a){
            this.check = a;
        }

    },
    created(){
        this.getData(); 
    },
    computed:{
        "tableData2":function(){
            return this.tableData.slice((this.currpage-1)*this.pagesize,this.currpage*this.pagesize)
        },
        "check1":function(){
            return this.check
        }
    }
}
</script>

<style lang="less">
#good.good{
    min-width: 1240px;
    .content{
        text-align: left;
        .table{
            border: none !important;
            padding-right: 16px;
            // .el-table__row{
            //     td{
            //         height: 40px;
            //         line-height: 40px;
            //         padding: 0;
            //     }
            // }
            // .el-link--inner{
            //     font-size: 12px;
            //     .fa{
            //         font-size: 12px;
            //         margin-right: 0 !important;
            //     }
            // }
        }
        .page{
            background-color: #eaedf4;
            // border-radius: 0 0 8px 8px;
            padding-right: 16px;
        }
        .good-btn{
            margin-top: 8px;
            margin-bottom: 8px;
        }
        .fa-external-link{
            font-size: 12px;
        }
        .radio{
            text-align: left;
            font-size: 14px;
            line-height: 32px;
        }
        .el-form{
            div{
                height: 40px;
                line-height: 40px;
                .fr{
                    padding-top: 12px;
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
                .el-date-editor--time-select{
                    width: 130px;
                    margin-top: 2px;
                }
            }
            
        }
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
    
}
</style>