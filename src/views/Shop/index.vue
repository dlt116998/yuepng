<template>
    <div class="shop">
        <el-form :inline="true" :model="form" class="demo-form-inline clearfix" ref>
            <el-form-item label="门店名:">
                <el-input size="mini" v-model="form.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="门店地址:">
                <el-input size="mini" v-model="form.shop_address"></el-input>
            </el-form-item>
            <el-form-item label="业态:">
                <el-input size="mini" v-model="form.formats"></el-input>
            </el-form-item>

            <div class="fr">
                <el-link type="primary" @click="resetForm('ruleForm')">重置筛选条件</el-link>
                <el-button size="mini" icon="el-icon-search" type="primary" @click="search()">查询</el-button>
            </div>
        </el-form>

        <el-button size="mini" type="primary" @click="dialogFormVisible=true;type='add'"><i class="el-icon-plus"></i>新增门店</el-button>

        <div class="table">
            <el-table :data="tableData2" border size="mini" max-height="410" :fit="true" :header-cell-style="{background:'#eaedf4'}" header-row-class-name="table-header">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>

                <el-table-column
                label="店名"
                width="150"
                >
                    <template slot-scope="scope">{{scope.row.shop_name}} </template>
                </el-table-column>

                <el-table-column
                label="业态"
                prop="formats"
                ></el-table-column>

                <el-table-column
                label="地址"
                prop="address"
                width="220"
                ></el-table-column>

                <el-table-column
                label="开始营业时间"
                prop="start_time"
                ></el-table-column>

                <el-table-column
                label="结束营业时间"
                prop="end_time"
                ></el-table-column>

                <el-table-column
                label="是否上线"
                >
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.inline"
                        active-color="#427af6"
                        inactive-color="#909399">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-link type="primary" @click="edit(scope.row)"><i class="el-icon-edit-outline"></i>编辑</el-link>
                        <el-link type="warning" @click="remove(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tr page">
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




<!-- 新增门店对话框 -->
        <el-dialog :title="type=='add'?'新增门店':'编辑门店'" :visible.sync="dialogFormVisible">
            <el-form :model="form1" label-width="200px">

                <el-form-item label="所属商家" >
                    <div>山东悦朋智能科技有限公司</div>
                </el-form-item>

                <el-form-item label="门店所在区域" :required="true">
                    <el-select v-model="province" size="mini" placeholder="省">
                        <el-option v-for="(pro,index) in form1.address" :key="index" :value="pro.province"></el-option>
                    </el-select>   

                    <el-select v-model="city" size="mini" placeholder="市">
                        <el-option v-for="(ci,index) in address_city" :key="index" :value="ci.name"></el-option>
                    </el-select>

                    <el-select v-model="county" size="mini" placeholder="区/县">
                        <el-option v-for="(co,index) in address_county" :key="index" :value="co"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="详细住址" :required="true" prop="detail_address">
                    <el-input size="mini" v-model="form1.detail_address"></el-input>
                </el-form-item>

                <el-form-item label="门店名称" :required="true" prop="shop_name">
                    <el-input size="mini" class="ipt-120" v-model="form1.shop_name"></el-input>
                    <div class="fr">
                        <span>邮政编码</span>
                        <el-input size="mini" class="ipt-120" v-model="form1.zip"></el-input>
                    </div>
                </el-form-item>

                <el-form-item label="配送属性" :required="true" prop="radio">
                    <el-radio-group v-model="form1.radio">
                        <el-radio label="到店自提">到店自提</el-radio>
                        <el-radio label="门店配送">门店配送</el-radio>
                        <el-radio label="第三方配送">第三方配送</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="营业时间" :required="true">
                    <el-time-select
                        placeholder="起始时间"
                        size="mini"
                        v-model="form1.startTime"
                        :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30'
                        }">
                    </el-time-select>
                    <el-time-select
                        placeholder="结束时间"
                        size="mini"
                        v-model="form1.endTime"
                        :picker-options="{
                        start: '08:30',
                        step: '00:15',
                        end: '18:30',
                        minTime: form1.startTime
                        }">
                    </el-time-select>
                </el-form-item>

                <el-form-item label="支持预定" prop="value" :required="true">
                    <el-switch
                    v-model="form1.value"
                    active-color="#427af6"
                    inactive-color="#909399">
                    </el-switch>
                </el-form-item>

                <el-form-item label="接受预定时间范围" :required="true" prop="day">
                    <el-select v-model="form1.day" size="mini" placeholder="请选择天数" class="slt-150">
                        <el-option v-for="item in days" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="预定间隔时间" :required="true" prop="interval">
                    <el-select v-model="form1.interval" size="mini" placeholder="10-60分钟" class="slt-150">
                        <el-option v-for="item in interval" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备货时长" :required="true" prop="prepare">
                    <el-select v-model="form1.prepare" size="mini" placeholder="10-60分钟" class="slt-150">
                        <el-option v-for="item in interval" :key="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="坐标位置" :required="true" class="map" :style="{marginBottom:'310px'}">
                    <el-input class="ipt-120 mr-16" size="mini" v-model="center.lng" disabled></el-input>
                    <el-input class="ipt-120" size="mini" v-model="center.lat" disabled></el-input>
                    <baidu-map class="bm-view"
                     ak="HcFqrgfQDKFgcsqIUas46SumOZSkYLn6"
                    :center="center" :zoom="zoom"
                    @ready="handler"
                    :scroll-wheel-zoom="true"
                    @moving="syncCenterAndZoom"
                    @moveend="syncCenterAndZoom"
                    @zoomend="syncCenterAndZoom"
                    :style="{marginTop:'8px'}">
                        <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                        </bm-marker>
                    </baidu-map>
                </el-form-item>

                <el-form-item label="门店logo" :required="true" :style="{marginBottom:'50px'}">
                    <img :src="pic_logo" alt="" style="height:24px;margin-bottom:6px">
                    <el-upload
                    class="upload-demo"
                    action="https://www.520mg.com/ajax/file.php"
                    :on-success="handleSuccess"
                    :show-file-list="false"
                    ref="file"
                    >
                         <el-button size="mini" type="primary"  plain>上传</el-button>
                    </el-upload>
                </el-form-item>

                <el-form-item label="联系人" :required="true" prop="name">
                    <el-input size="mini" v-model="form1.name"></el-input>
                </el-form-item>

                <el-form-item label="联系电话" :required="true" prop="phone">
                    <el-input size="mini" v-model="form1.phone"></el-input>
                </el-form-item>

                <el-form-item label="是否上线" :required="true">
                    <el-switch
                    v-model="form1.value1"
                    active-color="#427af6"
                    inactive-color="#909399">
                    </el-switch>
                </el-form-item>

<!-- HcFqrgfQDKFgcsqIUas46SumOZSkYLn6 -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addShop()" size="mini">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getShops} from '@/api/goods.js'
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import {BmMarker,BmLabel} from 'vue-baidu-map'

export default {
    data(){
        return {
            tableData:[],
            tableData1:[], //总数据
            currpage:1,
            pagesize:10,
            form:{
                shop_name:"",
                shop_address:"",
                formats:""
            },
            form1:{
                address:[
                    {
                        province:"河南",
                        city:[
                            {name:"郑州",county:["二七区","金水区"]},
                            {name:"洛阳",county:["汝阳县","栾川县","伊川县"]},
                            {name:"信阳",county:["商城县","固始县"]}
                        ],
                    },
                    {
                        province:"河北",
                        city:[
                            {name:"邯郸",county:["邯山区","永年区"]},
                            {name:"石家庄",county:["无极县","元氏县"]}
                        ]
                    }
                ],
                radio:"",
                startTime:"",
                endTime:"",
                value:false,
                value1:false,
                day:"",
                interval:"",
                prepare:"",
                detail_address:"",
                shop_name:"",
                zip:"",
                name:"",
                phone:""
            },
            dialogFormVisible:false,
            province:"",
            city:"",
            county:"",
            days:[
                {
                    value:'1',
                    label:'1'
                },
                {
                    value:'3',
                    label:'3'
                },
                {
                    value:'7',
                    label:'7'
                }
            ],
            interval:[{
                value:'10',
                label:'10'
            },{
                value:'20',
                label:'20'
            },{
                value:'30',
                label:'30'
            },{
                value:'40',
                label:'40'
            },{
                value:'50',
                label:'50'
            },{
                value:'60',
                label:'60'
            }],
            center: {lng: 543.22, lat: 23.4},
            zoom: 5,
            show: false,
            pic_logo:"",
            type:"",
            dang_title:"",
            index:0
        }

    },
    methods:{
        handleSuccess(e){
            console.log("成功",e)
            this.pic_logo = "https://www.520mg.com"+e.pic
        },
        handleSizeChange(val){
            this.pagesize = val;
        },
        handleCurrentChange(val){
            this.vurrpage = val;
        },
        edit(row){
            this.dialogFormVisible=true;
            this.type='change';
            this.form1.shop_name = row.shop_name;
            this.form1.startTime = row.start_time;
            this.form1.endTime = row.end_time;
            this.form1.value1 = row.inline;
            this.index = this.tableData.indexOf(row)
        },
        addShop(){
            let obj = {
                shop_name:this.form1.shop_name,
                formats:"大卖场",
                address:this.province+" "+this.city+" "+this.county,
                start_time:this.form1.startTime,
                end_time:this.form1.endTime,
                inline:this.form1.value1
            };
            let flag = true
            for(var i in obj){
                if(obj[i].length==0){
                    flag = false;
                }
            }

            if(this.type=='add'){
                if(flag){
                    this.tableData.unshift(obj);
                    this.dialogFormVisible = false;
                }else{
                    this.$message.error('信息不完整，请重新检查表单  ');
                }
            }else if(this.type=='change'){
               if(flag){
                   this.tableData.splice(this.index,1,obj);
                   this.dialogFormVisible = false;
               }else{
                    this.$message.error('信息不完整，请重新检查表单  ');
                } 
            }

            this.form1 = {
                address:[
                    {
                        province:"河南",
                        city:[
                            {name:"郑州",county:["二七区","金水区"]},
                            {name:"洛阳",county:["汝阳县","栾川县","伊川县"]},
                            {name:"信阳",county:["商城县","固始县"]}
                        ],
                    },
                    {
                        province:"河北",
                        city:[
                            {name:"邯郸",county:["邯山区","永年区"]},
                            {name:"石家庄",county:["无极县","元氏县"]}
                        ]
                    }
                ],
                radio:"",
                startTime:"",
                endTime:"",
                value:false,
                value1:false,
                day:"",
                interval:"",
                prepare:"",
                detail_address:"",
                shop_name:"",
                zip:"",
                name:"",
                phone:""
            }
            
        },
    
        getShopsInfo(){
            getShops().then(res=>{
                console.log(res)
                this.tableData = res.data.result;
                this.tableData1 = res.data.result
            }).catch(err=>{
                console.log(err)
            })
        },
        handler ({BMap, map}) {
            console.log(BMap, map)
            this.center.lng = 116.404
            this.center.lat = 39.915
            this.zoom = 15
        },
        infoWindowClose () {
            this.show = false
        },
        infoWindowOpen () {
            this.show = true
        },
        syncCenterAndZoom (e) {
            const {lng, lat} = e.target.getCenter()
            this.center.lng = lng
            this.center.lat = lat
            this.zoom = e.target.getZoom()
        },
        remove(row){
            this.$confirm('确认移除该门店?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var index = this.tableData.indexOf(row);
                this.tableData.splice(index,1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        search(){
            this.tableData = this.tableData1.filter(item=>{
                return item.shop_name.includes(this.form.shop_name) && item.address.includes(this.form.shop_address) && item.formats.includes(this.form.formats);
            })
        },
        resetForm(e){
            this.form = {
                shop_name:"",
                shop_address:"",
                formats:""
            };
            this.tableData = this.tableData1;
        }
    },
    created(){
        this.getShopsInfo()
    },
    computed:{
        "tableData2":function(){
            return this.tableData.slice((this.currpage-1)*this.pagesize,this.currpage*this.pagesize)
        },
        "address_city":function(){
            return this.form1.address.filter(item=>{
                return item.province.includes(this.province)
            })[0].city
        },
        "address_county":function(){
            return this.address_city.filter(item=>{
                return item.name.includes(this.city)
            })[0].county
        }
    },
    watch:{
        "province":function(){
            this.city = "";
            this.county = ""
        },
        "city":function(n,o){
            this.county = "";
            //console.log(this.address_county)
        }
    },
    components:{
        BaiduMap,BmMarker,BmLabel
    }
}
</script>

<style lang="less" >
.shop{
    text-align: left;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    i{
        font-size: 12px;
        margin: 0;
    }
    .table{
        margin-top: 8px;
        
        .el-table{
           
            .el-table__header{
                border-collapse: separate;
            }
            .el-link{
                margin-right: 12px;
                i{
                    margin: 0;
                    font-size: 12px;
                }
            }
        }
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
        min-height: 1000px;
        min-width: 750px;
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
    .bm-view{
        width: 100%;
        height: 300px;
        .anchorBL{
            display:none;
        }
    }
}
</style>