<template>
    <div>
    <h1>人员管理</h1>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="id"
                label="序号"
                >
        </el-table-column>
        <el-table-column
                prop="userName"
                label="用户名"
                >
        </el-table-column>
        <el-table-column
                prop="userPassword"
                label="密码">
        </el-table-column>

        <el-table-column
                align="right">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>


        <!--        弹出的修改学生信息表单-->
        <el-dialog title="查看详情" :visible.sync="dialogeditFormVisible"  >
            <el-form :model="userdialogData" :rules="dialogrules" ref="userdialogData">
                <el-form-item label="用户名"  :label-width="formLabelWidth" prop="userName" >
                    <el-input v-model.trim="userdialogData.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码"  :label-width="formLabelWidth" prop="userPassword" >
                    <el-input v-model.trim="userdialogData.userPassword" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click=" resetForm()">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('userdialogData')" >确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                formLabelWidth: '120px',
                dialogeditFormVisible:false,
                tableData: [{
                    id: 'sdasd',
                    userName: 'asdasd',
                    userPassword: 'sdasd'
                }],
                userdialogData:[{
                    id: 'asd',
                    userName: 'asd',
                    userPassword: 'asd'
                }],
                search: '',
                dialogrules: {
                    userName: [
                        { required: true, message: '请输入电话号码'},
                        {validator:function(rule,value,callback){
                                if(/^1[34578]\d{9}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur'}
                    ],
                    userPassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 5, max: 14, message: '长度在5 到 14 个字符', trigger: 'blur'
                        }
                    ],
                }
            }
        },
        methods: {
            submitEditForm(userdialogData){
                const  _this=this;
                this.$refs[userdialogData].validate((valid) => {
                    if (valid) {
                        this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/admin/updateUser',_this.userdialogData)
                            .then(function (resp) {
                            console.log(resp.data.code)
                                if (resp.data.code=='10000'){
                                    _this.$message.success('修改成功');
                                    _this.dialogeditFormVisible=false
                                }
                        })
                    }
                })





            },
            resetForm(){
                this.dialogeditFormVisible=false

            },
            handleEdit(index, row) {
                console.log(index, row);
                const _this=this;
                _this.userdialogData=row
                this.dialogeditFormVisible=true
            },
            handleDelete(index, row) {
                const  _this=this
                console.log(index, row);
                this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/admin/deleteUser',row).then(function (resp) {
                    console.log(resp)
                    if (resp.data.code=='10000'){
                        _this.$message.success("删除成功")
                        _this.regetTableDate();
                    }


                })
            },
            regetTableDate(){
                const _this=this;
                this.axios.get('http://121.41.93.145:8098/cloudzuul/keyanservice/user/getlist').then(function (resp) {
                    console.log(resp.data.data)
                    _this.tableData=resp.data.data
                })
            },



        },created() {
            const _this=this;
            this.axios.get('http://121.41.93.145:8098/cloudzuul/keyanservice/user/getlist').then(function (resp) {
                console.log(resp.data.data)
                _this.tableData=resp.data.data
            })


        }
    }
</script>

<style scoped>

</style>
