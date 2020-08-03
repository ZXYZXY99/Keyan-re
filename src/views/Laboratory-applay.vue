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
                    prop="applayLaboratoryNum"
                    label="实验室"
            >
            </el-table-column>
            <el-table-column
                    prop="applayLaboratoryUser"
                    label="申请人">
            </el-table-column>

            <el-table-column
                    prop="ispass"
                    label="是否通过">
            </el-table-column>


            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-popconfirm
                            confirmButtonText='好的'
                            cancelButtonText='不用了'
                            icon="el-icon-info"
                            iconColor="red"
                            title="是否通过审核？"
                            @onConfirm="handleEdit(scope.row)"
                    >
                        <el-button slot="reference"
                                   size="mini"

                        >通过</el-button>
                    </el-popconfirm>
                    <el-button

                            size="mini"
                            type="danger"
                            @click="nohandleEdit(scope.$index, scope.row)">不通过</el-button>

                </template>
            </el-table-column>
        </el-table>

        <!--        弹出的原因-->
        <el-dialog title="新增实验室" :visible.sync="dialogFormVisible"  >
            <el-form :model="dialogDate" :rules="dialogrules" ref="dialogDate">
                <el-form-item label="实验室号"  :label-width="formLabelWidth" prop="userName" >
                    <el-input v-model="dialogDate.reason"  autocomplete="off"></el-input>
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
        name: "Laboratory-applay",
        data(){
            return{
                dialogFormVisible:false,
                dialogrules: {
                    userName: [
                        { required: true, message: '请输入原因', trigger: 'blur'},
                        {min:5, max: 50, message: '长度在5到 50个字符', trigger: 'blur'
                        }

                    ],
                },
                tableDate:{
                    id:'',
                    applayLaboratoryNum:'',
                    applayLaboratoryUser:'',
                    ispass:'',
                    reason:''
                },
                dialogDate:{
                    id:'',
                    applayLaboratoryNum:'',
                    applayLaboratoryUser:'',
                    ispass:'',
                    reason:''
                },


            }
        },methods:{
            handleEdit(index){
                const _this=this;
                index.ispass='yes';
                this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/laboratory-applay/admin/updateLab',index)
                    .then(function (resp) {
                    console.log(resp)
                        console.log(resp.data.code)
                        if (resp.data.code=='10000'){
                            _this.$message.success("修改成功")
                            _this.flushTableDate();

                        }
                    })
            },
            nohandleEdit(index,row){
                // console.log(row)
                this.dialogFormVisible=true;
                this.dialogDate.id=row.id
                this.dialogDate.applayLaboratoryNum=row.applayLaboratoryNum
                this.dialogDate.applayLaboratoryUser=row.applayLaboratoryUser
                this.dialogDate.ispass='no'
                console.log(this.dialogDate)
            },
            resetForm(){
                this.dialogDate='';
              this.dialogFormVisible=false;
            },
            submitEditForm(reson){
                const _this=this;
                console.log(this.dialogDate)
                this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/laboratory-applay/admin/updateLab',_this.dialogDate)
                    .then(function (resp) {
                        console.log(resp)
                        if (resp.data.code=="10000"){
                            _this.dialogFormVisible=false;
                            _this.flushTableDate();
                            _this.$message.success("修改成功")
                        }
                    })
            },
            flushTableDate(){
                const _this=this
                this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/laboratory-applay/admin/getapplaying').then(function (resp) {
                    _this.tableDate=resp.data.data
                })
            },

        },created() {
            const _this=this

            this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/laboratory-applay/admin/getapplaying').then(function (resp) {
                _this.tableDate=resp.data.data
            })

        }
    }
</script>

<style scoped>

</style>
