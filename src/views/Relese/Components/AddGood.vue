<template>
    <div class="addgood">
        <div>
            <span class="ib"></span>  <b>添加活动商品</b> 
        </div>
        <div class="f">
            <el-form :inline="true" :model="form">
                <el-form-item label="商品编码" prop="good_num">
                    <el-input size="mini" v-model="form.good_num"></el-input>
                </el-form-item>

                <el-form-item label="SKU码" prop="sku">
                    <el-input size="mini" v-model="form.sku"></el-input>
                </el-form-item>

                <el-form-item label="商品名称" prop="name">
                    <el-input size="mini" v-model="form.name"></el-input>
                </el-form-item>

                <div class="fr">
                    <el-link type="primary" @click="resset()">重置筛选条件</el-link>
                    <el-button size="mini" type="primary" @click="search()"><i class="el-icon-search"></i>搜索</el-button>
                </div>
            </el-form>
            <div>
                <el-button type="primary" size="mini" @click="dialogFormVisible=true"><i class="el-icon-plus"></i>添加活动商品</el-button>
                <el-button type="danger" size="mini" @click="del()"><i class="el-icon-delete"></i>删除所选</el-button>
            </div>
            <br>

            <el-table :data="tableData" border size="mini" :header-cell-style="{background:'#eaedf4'}" @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="40"
                ></el-table-column>

                <el-table-column
                prop="good_num"
                label="商品编码"
                width="80"
                ></el-table-column>

                <el-table-column
                prop="sku"
                label="SKU码"
                width="120"
                ></el-table-column>

                <el-table-column
                label="商品图片"
                width="82"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.img_url" alt="" width="60">
                    </template>
                </el-table-column>

                <el-table-column
                label="商品名称"
                prop="good_name"
                width="110"
                ></el-table-column>

                <el-table-column
                label="原价（元）"
                width="80"
                >
                    <template slot-scope="scope">
                        <span>￥{{scope.row.price}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                label="促销价（元）"
                width="80"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.z_price" :disabled="scope.row.flag"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                label="佣金比例%"
                width="100"
                >
                    <template slot-scope="scope">
                        <el-input class="price" v-model="scope.row.bili" :disabled="scope.row.flag"></el-input> %
                    </template>
                </el-table-column>

                <el-table-column
                label="限购量（件）"
                width="80"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.buy" :disabled="scope.row.flag"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                label="活动总库存"
                width="100"
                >
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.all" :disabled="scope.row.flag"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                label="操作"
                >
                    <template slot-scope="scope">
                        <el-link type="primary"  @click="$message({message:'保存成功',type:'success'});scope.row.flag=false"><i class="el-icon-folder"></i>保存</el-link>
                        <el-link type="danger"  @click="scope.row.flag=true;$message({message:'禁用成功',type:'success'})"><i class="el-icon-delete"></i>停用</el-link>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="f">
            <div class="fr">
                <el-button size="mini" class="cz" @click="$emit('goOut')">返回上一步</el-button>
                <el-button size="mini" class="cz" type="primary" @click="$emit('next')">完成</el-button>
            </div>
        </div>

        <el-dialog :visible.sync="dialogFormVisible" title="新增活动商品" width="40%">
            <el-form label-width="120px" :model="form1">
                <el-form-item label="商品编码"  prop="good_num">
                    <el-input v-model="form1.good_num"></el-input>
                </el-form-item>
                <el-form-item label="SKU码" prop="sku">
                    <el-input v-model="form1.sku"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" prop="good_name">
                    <el-input v-model="form1.good_name"></el-input>
                </el-form-item>
                <el-form-item label="商品原价" prop="price">
                    <el-input v-model="form1.price"></el-input>
                </el-form-item>
            </el-form>
            <div class="footer tr">
                <el-button type="primary" @click="add()">添加</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getActivity} from '@/api/goods.js'
export default {
    data(){
        return{
            tableData:[],
            tableData1:[],
            form:{
                good_num:"",
                sku:"",
                name:""
            },
            check_list:[],
            dialogFormVisible:false,
            form1:{
                good_num:"",
                sku:"",
                good_name:"",
                price:""
            }
        }
    },
    created(){
        this.getData();
        this.$emit("sact",1)
    },
    methods:{
        getData(){
            getActivity().then(res=>{
                //console.log(res)
                this.tableData = res.data.result;
                this.tableData1 = res.data.result;
            }).catch(err=>{
                console.log(err)
            })
        },
        search(){
            this.tableData = this.tableData1.filter(item=>{
                return item.good_num.includes(this.form.good_num) && item.sku.includes(this.form.sku) && item.good_name.includes(this.form.name)
            })
        },
        resset(){
            this.form = {
                good_num:"",
                sku:"",
                name:""
            }
            this.tableData = this.tableData1
        },
        handleSelectionChange(e){
            //console.log(e)
            this.check_list = e
        },
        del(){
            if(this.check_list.length>0){
                this.$confirm("确认要移除商品").then(_=>{
                    this.check_list.forEach(item=>{
                        var index = this.tableData.indexOf(item);
                        this.tableData.splice(index,1)
                    })
                }).catch(_=>{

                })
            }else{
                this.$message.error("请选择要移除的商品")
            }       
        },
        add(){
            this.tableData.unshift({...this.tableData[1],...this.form1});
            this.dialogFormVisible = false
        }
    }
}
</script>

<style lang="less" >
.addgood{
    .f{
        padding-left: 50px;
        .el-input{
            display: inline-block;
            &.price{
                width: 50px;
            }
        }
        .el-button.cz{
            padding: 7px 15px;
        } 
        i{
            font-size: 12px;
            margin: 0;
        }
    }
}
</style>