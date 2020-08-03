<template>
    <div>
        <el-table
                :data="tableDate"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="序号"
            >
            </el-table-column>
            <el-table-column
                    prop="laboratoryNum"
                    label="实验室"
            >
            </el-table-column>
            <el-table-column
                    prop="laboratoryIsuse"
                    label="是否被使用">
            </el-table-column>

            <el-table-column
                    prop="laboratoryUsername"
                    label="使用者">
            </el-table-column>


            <el-table-column
                    align="right">

                <template slot="header" slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="dialogFormVisible = true">新增实验室</el-button>
                </template>
                <template slot-scope="scope">
                    <el-popconfirm
                            confirmButtonText='好的'
                            cancelButtonText='不用了'
                            icon="el-icon-info"
                            iconColor="red"
                            title="这是一段内容确定删除吗？"
                            @onConfirm="handleDelete(scope.row)"
                    >
                        <el-button slot="reference"
                                   size="mini"
                                   type="danger"
                        >删除</el-button>
                    </el-popconfirm>

                </template>

            </el-table-column>
        </el-table>


        <!--        弹出的新增表单-->
        <el-dialog title="新增实验室" :visible.sync="dialogFormVisible"  >
            <el-form :model="addDate" :rules="dialogrules" ref="addDate">
                <el-form-item label="实验室号"  :label-width="formLabelWidth" prop="userName" >
                    <el-input v-model.number="addDate.laboratoryNum"  autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click=" resetForm()">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('addDate')" >确 定</el-button>
            </div>
        </el-dialog>





    </div>


</template>

<script>
    export default {
        name: "Laboratory",
        data(){
            return{
                dialogrules: {
                    userName: [
                        { required: true, message: '请输入实验室号', trigger: 'blur'},
                        {min: 4, max: 8, message: '长度在4到 8 个字符', trigger: 'blur'
                        }

                    ],
                },
                dialogFormVisible:false,
                addDate:{
                    id:'',
                    laboratoryNum:'',
                    laboratoryIsuse:'',
                    laboratoryUsername:''
                },
                tableDate:{
                    id:'',
                    laboratoryNum:'',
                    laboratoryIsuse:'',
                    laboratoryUsername:''
                }
            }
        },methods:{
            submitEditForm(addDate){
                console.log(this.addDate.laboratoryNum)
                this.addDate.laboratoryIsuse='no';
                this.addDate.laboratoryUsername='null';
                const  _this=this;
                if (this.addDate.laboratoryNum==''){
                    this.$message.error("请输入信息")
                } else {
                    this.axios.post('http://120.26.90.28:8098/cloudzuul/keyanservice/laboratory/admin/addLab',_this.addDate)
                        .then(function (resp) {
                            console.log(resp)
                            if (resp.data.code=="10000"){
                                _this.addDate.id='';
                                _this.addDate.laboratoryNum='';
                                _this.addDate.laboratoryIsuse='';
                                _this.addDate.laboratoryUsername='';
                                _this.dialogFormVisible=false;
                                _this.$message.success("添加成功")
                                _this.flushtableDate();
                            }
                        })
                    }

            },
            resetForm(){
                this.addDate.id='';
                this.addDate.laboratoryNum='';
                this.addDate.laboratoryIsuse='';
                this.addDate.laboratoryUsername='';
                this.dialogFormVisible=false;
            },flushtableDate(){
                const _this=this;
                this.axios.get('http://120.26.90.28:8098/cloudzuul/keyanservice/laboratory/getAll').then(function
                    (resp) {
                    _this.tableDate=resp.data.data
                })
            },
            handleDelete(index,row){
                const  _this=this;
                        console.log(index)
                if (index.laboratoryIsuse=='yes'){
                    this.$message.error("请先让借用者归还实验室");
                }else {
                this.axios.post('http://120.26.90.28:8098/cloudzuul/keyanservice/laboratory/admin/deleteLab',index)
                    .then(function (resp) {
                    console.log(resp)
                        if (resp.data.code=='10000'){
                            _this.$message.error("删除成功");
                            _this.flushtableDate();
                        }

                })


                }
            },
        },created() {
            const _this=this;
            this.axios.get('http://120.26.90.28:8098/cloudzuul/keyanservice/laboratory/getAll').then(function
                (resp) {
                _this.tableDate=resp.data.data
            })
        }
    }
</script>

<style scoped>

</style>
