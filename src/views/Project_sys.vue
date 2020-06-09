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
                    prop="projectDescribe"
                    label="项目简介">
            </el-table-column>


            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">详情</el-button>
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
            <el-form :model="dialogDate" :rules="dialogrules" ref="dialogDate">
                <el-form-item label="项目负责人" :label-width="formLabelWidth" prop="projectUser">
                    <el-input v-model="dialogDate.projectUser" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="项目名" :label-width="formLabelWidth" prop="projectName" disabled >
                    <el-input v-model="dialogDate.projectName" autocomplete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="项目介绍" :label-width="formLabelWidth" prop="projectDescribe">
                    <el-input
                            type="textarea"
                            rows="5"
                            disabled
                            v-model="dialogDate.projectDescribe">
                    </el-input>
                </el-form-item>
                <el-form-item label="资金需求" :label-width="formLabelWidth" prop="funds">
                    <el-input v-model="dialogDate.funds" autocomplete="off"
                              @keyup.native="number" disabled></el-input>
                </el-form-item>
                <el-form-item label="科研成果" :label-width="formLabelWidth" prop="achievements">
                    <el-input type="textarea"
                              rows="5" v-model="dialogDate.achievements" autocomplete="off" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click=" resetForm()">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('dialogDate')" >确 定</el-button>
            </div>
        </el-dialog>






    </div>
</template>

<script>
    export default {
        name: "Project_sys",
        data(){
            return{
                dialogeditFormVisible:false,
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
                dialogDate:{
                    id:'',
                    projectName:'',
                    projectUser:'',
                    projectDescribe:'',
                    funds:'',
                    achievements:''
                }


            }
        },methods:{
            handleEdit(index,row){
                this.dialogeditFormVisible=true;
                console.log(row);
                this.dialogDate=row;


            },
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            resetForm(){
              this.dialogeditFormVisible=false;
                this.dialogDate='';
            },
            submitEditForm(){
                this.dialogDate='';
                this.dialogeditFormVisible=false;
            },
        },created() {
            const _this=this;


            this.axios.get('http://localhost:8098/cloudzuul/keyanservice/project-sys/getlist').then(function
                (resp) {
                _this.tableData=resp.data.data
            })
        }
    }
</script>

<style scoped>

</style>
