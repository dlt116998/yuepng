<template>
    <div class="shopgood">
        <div class="form tl">
            <el-form :inline="true" :model="form">
                <el-form-item label="门店名称" class="fi" prop="shop">
                    <el-input size="mini" v-model="form.shop"></el-input>
                </el-form-item>
                <el-form-item label="门店编码" class="fi" prop="good_num">
                    <el-input size="mini" v-model="form.good_num"></el-input>
                </el-form-item>
                <el-form-item label="商品码" class="fi" prop="sku">
                    <el-input size="mini" v-model="form.sku"></el-input>
                </el-form-item>

                <div class="fr">
                    <el-link type="primary" @click="rest()">重置筛选条件</el-link>
                    <el-button type="primary" size="mini" @click="search()"><i class="el-icon-search"></i>查询</el-button>
                </div>
            </el-form>
            <el-button size="mini" type="primary" @click="up(true)"><i class="fa fa-upload"></i>批量上架</el-button>
            <el-button size="mini" type="primary" @click="up(false)"><i class="fa fa-download"></i>批量下架</el-button>
            <el-button size="mini" type="danger" @click="del()"><i class="fa fa-trash"></i>批量删除</el-button>
            <el-button size="mini" type="info" @click="gear(false)"><i class="fa fa-gear"></i>设置门店库存</el-button>
        </div>

        <div class="table">
            <el-table :data="tableData2" border size="mini" :header-cell-style="{background:'#eaedf4'}" max-height="450px" @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="50"
                ></el-table-column>
                <el-table-column
                label="商品图片"
                width="70"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.img_url" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="商品名称"
                ></el-table-column>
                <el-table-column
                label="价格"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.price" :disabled="scope.row.disabled" @change="gear(true)">
                            <template slot="prepend">
                                ￥
                            </template>
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                label="库存"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.num" :disabled="scope.row.disabled" @change="gear(true)">
                            <template slot="append">
                                件 
                            </template>
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                label="月销量"
                prop="moon"
                ></el-table-column>
                <el-table-column
                label="SKU编码"
                prop="sku"
                ></el-table-column>
                <el-table-column
                label="门店名称"
                >
                    <template slot-scope="scope">
                        {{scope.row.shop}}店
                    </template>
                </el-table-column>
                <el-table-column
                label="门店编码"
                prop="good_num"
                ></el-table-column>
                <el-table-column
                label="是否上架"
                >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.flag"></el-switch>
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
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData:[],
            tableData1:[],
            checkList:[],
            currpage:1,
            pagesize:10,
            form:{
                shop:"",
                sku:"",
                good_num:""
            }
        }
    },
    methods:{
        handleSelectionChange(s){
            this.checkList = s
        },
        up(e){
            this.checkList.forEach(item=>{
                item.flag = e
            })
        },
        gear(e){
            this.checkList.forEach(item=>{
                item.disabled = e
            })
        },
        del(){
            this.$confirm('确认删除？').then(_=>{
                this.checkList.forEach(item=>{
                    let index = this.tableData.indexOf(item);
                    this.tableData.splice(index,1)
                });
                this.$message({
                    message:"删除成功",
                    type:"success"
                })
            }).catch(_=>{

            })
            
        },
        handleSizeChange(v){
            this.pagesize = v
        },
        handleCurrentChange(v){
            this.currpage = v
        },
        search(){
            this.tableData = this.tableData1.filter(item=>{
                return item.shop.includes(this.form.shop) && (item.sku+"").includes(this.form.sku) && (item.good_num+"").includes(this.form.good_num)
            })
        },
        rest(){
            this.form = {
                shop:"",
                sku:"",
                good_num:""
            };
            this.tableData = this.tableData1
        }
    },
    created(){
        this.$goods.sGood().then(res=>{
            console.log(res.data.result);
            this.tableData = res.data.result;
            this.tableData1 = res.data.result;
        })
    },
    computed:{
        "tableData2":function(){
            return this.tableData.slice((this.currpage-1)*this.pagesize,this.currpage*this.pagesize)
        }
    }
}
</script>

<style lang="less" scoped>
.shopgood{
    .form{
        padding: 16px ;
        .fi{
            margin-bottom: 8px;
        }
    }
    .table{
        padding: 0 16px;
    }
}
</style>