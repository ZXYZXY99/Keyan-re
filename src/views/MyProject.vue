<template>
        <div>
            <el-table
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="序号"
                >
                </el-table-column>
                <el-table-column
                        prop="projectName"
                        label="项目名"
                >
                </el-table-column>
                <el-table-column
                        prop="projectUser"
                        label="项目负责人">
                </el-table-column>

                <el-table-column
                        prop="funds"
                        label="资金">
                </el-table-column>


                <el-table-column
                        align="right">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=tableData.length>
            </el-pagination>


            <!--        弹出的修改学生信息表单-->
            <el-dialog title="查看详情" :visible.sync="dialogeditFormVisible"  >
                <el-form :model="dialogData" :rules="dialogrules" ref="dialogData">
                    <el-form-item label="项目负责人" :label-width="formLabelWidth" prop="projectUser">
                        <el-input v-model="dialogData.projectUser" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="项目名" :label-width="formLabelWidth" prop="projectName" disabled >
                        <el-input v-model="dialogData.projectName" autocomplete="off" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="项目介绍" :label-width="formLabelWidth" prop="projectDescribe">
                        <el-input
                                type="textarea"
                                rows="5"
                                v-model="dialogData.projectDescribe">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="资金需求" :label-width="formLabelWidth" prop="funds">
                        <el-input v-model="dialogData.funds" autocomplete="off"
                                  @keyup.native="number" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="科研成果" :label-width="formLabelWidth" prop="achievements">
                        <el-input type="textarea"
                                  rows="5" v-model="dialogData.achievements" autocomplete="off" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click=" resetForm()">取 消</el-button>
                    <el-button type="primary" @click="submitEditForm('dialogData')" >确 定</el-button>
                </div>
            </el-dialog>


        </div>
</template>

<script>
    export default {
        name: "MyProject",
        data(){
            return{
                dialogeditFormVisible:false,
                formLabelWidth: '120px',
                currentPage:1,
                pagesize:20,
                tableData:{
                    id:'',
                    projectName:'',
                    projectUser:'',
                    projectDescribe:'',
                    funds:'',
                    achievements:''
                },
                dialogData:{
                    id:'',
                    projectName:'',
                    projectUser:'',
                    projectDescribe:'',
                    funds:'',
                    achievements:''
                },
                username:'',
                dialogrules: {
                    projectDescribe: [
                        {required: true, message: '请输入项目介绍', trigger: 'blur'},
                        {min: 50, max: 500, message: '长度在 50~500个字符', trigger: 'blur'}
                    ],

                },

            }

        },methods:{
            handleEdit(row){
                this.dialogData.id=row.id
                this.dialogData.projectName=row.projectName
                this.dialogData.projectUser=row.projectUser
                this.dialogData.projectDescribe=row.projectDescribe
                this.dialogData.funds=row.funds
                this.dialogData.achievements=row.achievements
                this.dialogeditFormVisible = true;
                // this.dialogData=row

            },
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            submitEditForm(editform){
                console.log(editform)
                const  _this=this;
                this.$refs[editform].validate((valid) => {
                    if (valid) {
                        this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/project-sys/updateproject'
                            ,_this.dialogData).then(function (resp) {
                            console.log(resp)
                            if (resp.data.code=='10000'){
                                _this.dialogeditFormVisible=false;
                                _this.$message.success("修改成功")
                                _this.regetData();
                            } else {
                                _this.dialogeditFormVisible=false;
                                _this.$message.error("修改失败")
                            }
                        })
                    }
                });
            },
            regetData(){
                const _this=this
                // _this.username=this.$username
                this.axios.get("http://121.41.93.145:8098/cloudzuul/keyanservice/project-sys/getuserproject").then(function (resp) {
                    console.log(resp)
                    _this.tableData=resp.data.data
                })
            },
            resetForm(){
                this.dialogeditFormVisible=false
            }

        },created() {


            const _this=this
            // _this.username=this.$username
            this.axios.get("http://121.41.93.145:8098/cloudzuul/keyanservice/project-sys/getuserproject").then(function (resp) {
                console.log(resp)
                _this.tableData=resp.data.data
            })


        }
    }
</script>

<style scoped>

</style>
