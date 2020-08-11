<template>
    <div class="role">
        <div class="header">
            <el-button size="mini" type="primary" @click="type='add';dialogVisible=true"><i class="el-icon-plus"></i>新增</el-button>
            <el-button size="mini" type="primary" @click="edit()"><i class="el-icon-edit-outline"></i>编辑</el-button>
            <el-button size="mini" type="danger" @click="remove()"><i class="el-icon-delete"></i>批量删除</el-button>
        </div>
        <div class="table">
            <el-table
                :data="tableData2"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                border
                :header-cell-style="{background:'#eaedf4'}"
                @selection-change="handleSelectionChange"
                size="mini"
                max-height="500"
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>

                <el-table-column
                label="数据列"
                width="150"
                >
                    <template slot-scope="scope">
                        <span>{{scope.$index+1}}</span>
                    </template>    
                </el-table-column>

                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>

                <el-table-column
                prop="id_num"
                label="序号"
                 width="50"
                ></el-table-column>

                <el-table-column
                label="图标"
                width="60"
                >
                    <template slot-scope="scope">
                        <i :class="scope.row.icon"></i>
                    </template>
                </el-table-column>

                <el-table-column
                label="URL"
                prop="url"
                width="120"
                ></el-table-column>

                <el-table-column
                label="描述"
                prop="text"
                ></el-table-column>

                <el-table-column
                label="类型"
                prop="type"
                width="100"
                ></el-table-column>

                <el-table-column
                label="Key"
                prop="key"
                width="120"
                ></el-table-column>

            </el-table>
            <div class="page tr">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currpage"
                :page-sizes="[5,10,20,50]"
                :page-size="pagesize"
                layout="sizes, prev, pager, next"
                :total="tableData.length">
                </el-pagination>
            </div>
        </div>

        <!-- 添加编辑对话框 -->
       <el-dialog
        :title="type=='change'?'编辑角色':'新增角色'"
        :visible.sync="dialogVisible"
        width="20%"
        :before-close="handleClose">

            <el-form :model="form" label-width="120px">
                <el-form-item label="名称" prop="name">
                    <el-input size="mini" v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="请求URL" prop="url">
                    <el-input size="mini" v-model="form.url"></el-input>
                </el-form-item>

                <el-form-item label="键值" prop="key">
                    <el-input size="mini" v-model="form.key"></el-input>
                </el-form-item>

                <el-form-item label="序号" prop="id_num">
                    <el-input size="mini" v-model="form.id_num"></el-input>
                </el-form-item>

                <el-form-item label="图标">
                    <i :class="form.icon"></i>
                </el-form-item>

                <el-form-item label="描述" prop="text">
                    <el-input size="mini" v-model="form.text"></el-input>
                </el-form-item>

                <el-form-item label="类型" prop="type">
                    <el-select size="mini" v-model="form.type">
                        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="submit()"><i class="el-icon-check"></i>提交</el-button>
                
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {getRole} from '@/api/goods.js'
export default {
    data(){
        return {
            tableData:[],
            tableData1:[],
            pagesize:10,
            currpage:1,
            check_list:[],
            dialogVisible:false,
            type:'',
            form:{
                name:"",
                url:"",
                key:0,
                id_num:0,
                icon: ["el-icon-s-home","el-icon-setting","el-icon-price-tag"][Math.floor(Math.random()*3)],
                text:"",
                type:""
            },
            options:[{
                label:"应用",
                value:"应用"
            },{
                label:"菜单",
                value:"菜单"
            }]
        }
    },
    methods:{
        submit(){
            if(this.type == 'change'){
                var index = this.tableData.indexOf(this.check_list[this.check_list.length-1]); 
                this.tableData.splice(index,1,{...this.form})
            }
            if(this.type == 'add'){
                let flag = true;
                for(var i in this.form){
                    if(this.form[i].length==0){
                        flag = false;
                    }
                }
                if(flag){
                    this.tableData.unshift({...this.form});
                }else{
                    this.$message.error("请检查表单");
                    return false
                }
            }
            this.dialogVisible = false;
            this.form = {
                name:"",
                url:"",
                key:0,
                id_num:0,
                icon:["el-icon-s-home","el-icon-setting","el-icon-price-tag"][Math.floor(Math.random()*3)],
                text:"",
                type:""
            }
        },
        edit(){
            this.type='change';
            this.dialogVisible=true;
            this.form = {...this.check_list[this.check_list.length-1]}
        },
        handleClose(done){
            done()
        },
        handleSelectionChange(sel){
            //console.log(sel)
            this.check_list = sel;
        },
        getRoleData(){
            getRole().then(res=>{
                console.log(res.data)
                if(res.data.code==200){
                    this.tableData = res.data.result;
                    this.tableData1 = res.data.result;
                }
               
            }).catch(err=>{
                console.log(err)
            })
        },
        handleSizeChange(val){
            this.pagesize = val
        },
        handleCurrentChange(val){
            this.currpage = val
        },
        remove(){
            //console.log(this.check_list)
            if(this.check_list.length<=0){
                this.$message.error('请选择要删除的角色信息');
            }else{
                this.$confirm('确认删除？')
                .then(_ => {
                   this.check_list.forEach(item=>{
                       var index = this.tableData.indexOf(item);
                       this.tableData.splice(index,1)
                    })
                    this.$message({
                        message:"删除成功！",
                        type:'success'
                    })
                    done();
                })
                .catch(_ => {});
            }
        }
    },
    created(){
        this.getRoleData()
    },
    computed:{
        "tableData2":function(){
            return this.tableData.slice((this.currpage-1)*this.pagesize,this.currpage*this.pagesize)
        }
    }
}
</script>

<style lang="less" >
.role{
    .header{
        padding: 10px 12px 0 12px;
        text-align: left;
    }
    .table{
        padding: 18px;
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
        min-width: 440px;

        .el-dialog__header{
            padding: 0 20px;
            height: 30px;
            background-color: #3f78f6;
            line-height: 30px;
            text-align: left;
            
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
        .el-form-item{
            margin-bottom: 6px;
            .el-form-item__label,.el-form-item__content{
                line-height: 30px !important;
                height: 30px;
                width: 150px;
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
        }
    }
}
</style>