<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="序号"
            >
            </el-table-column>
            <el-table-column
                    prop="applyProjectName"
                    label="项目名"
            >
            </el-table-column>
            <el-table-column
                    prop="applyUser"
                    label="项目负责人">
            </el-table-column>

            <el-table-column
                    prop="applyProjectText"
                    label="项目简介">
            </el-table-column>


            <el-table-column
                    prop="applyProjectFunds"
                    label="资金需求">
            </el-table-column>
            <el-table-column
                    prop="ispass"
                    label="是否通过">
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


        <!--        弹出的修改学生信息表单-->
        <el-dialog title="查看详情" :visible.sync="dialogeditFormVisible"  >
            <el-form :model="dialogDate" :rules="dialogrules" ref="dialogDate">
                <el-form-item label="项目负责人" :label-width="formLabelWidth" prop="applyUser">
                    <el-input v-model="dialogDate.applyUser" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="项目名" :label-width="formLabelWidth" prop="applyProjectName" disabled >
                    <el-input v-model="dialogDate.applyProjectName" autocomplete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="项目介绍" :label-width="formLabelWidth" prop="applyProjectText">
                    <el-input
                            type="textarea"
                            rows="5"
                            disabled
                            v-model="dialogDate.applyProjectText">
                    </el-input>
                </el-form-item>
                <el-form-item label="资金需求" :label-width="formLabelWidth" prop="applyProjectFunds">
                    <el-input v-model="dialogDate.applyProjectFunds" autocomplete="off"
                              @keyup.native="number" disabled></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click=" resetForm()">取消</el-button>
                <el-button type="primary" @click="nosubmitEditForm('dialogDate')" >不通过</el-button>
                <el-button type="primary" @click="submitEditForm('dialogDate')" >通过</el-button>
            </div>
        </el-dialog>





    </div>
</template>

<script>
    export default {
        name: "Project_SH",
        data(){
            return{
                formLabelWidth: '120px',
                dialogeditFormVisible:false,
                tableData:{
                    id:'',
                    applyProjectName:'',
                    applyProjectText:'',
                    applyProjectFunds:'',
                    applyUser:'',
                    ispass:''
                },
                dialogDate:{
                    id:'',
                    applyProjectName:'',
                    applyProjectText:'',
                    applyProjectFunds:'',
                    applyUser:'',
                    ispass:''
                }

            }

        },methods:{
            submitEditForm(dialogDate){
                console.log(this.dialogDate)
                this.dialogDate.ispass='yes'
                const _this=this;
                this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/project-applay/updateproject',_this.dialogDate)
                    .then(function (resp) {
                    console.log(resp)
                        if (resp.data.code=='10000'){
                            _this.dialogeditFormVisible=false
                            _this.$message.success("成功")
                            _this.flushTableDate();
                        }
                })



            },
            nosubmitEditForm(dialogDate){
                console.log(this.dialogDate)
                this.dialogDate.ispass='no';
                const _this=this;
                this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/project-applay/updateproject',_this.dialogDate)
                    .then(function (resp) {
                        console.log(resp)
                        if (resp.data.code=='10000'){
                            _this.dialogeditFormVisible=false
                            _this.$message.success("成功")
                            _this.flushTableDate();
                        }
                    })



            },
            handleEdit(index,row){
                this.dialogeditFormVisible=true
                this.dialogDate=row

                // this.dialogDate.id=row.id
              console.log(row)
            },
            resetForm(){
                this.dialogeditFormVisible=false
                this.dialogDate='';
            },
            flushTableDate(){
                const _this=this;
                this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/project-applay/getlistByisuse').then(function
                    (resp) {
                    _this.tableData=resp.data.data;
                })
            },
        },created() {
            const _this=this;

            this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/project-applay/getlistByisuse').then(function
                (resp) {
                _this.tableData=resp.data.data;
            })


        }
    }
</script>

<style scoped>

</style>
