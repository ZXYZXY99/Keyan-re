<template>
    <div>
        <h1>科研项目申请</h1>

        <hr>


        <el-form :model="keyan" :rules="rules" ref="keyan" label-width="100px" class="demo-ruleForm">
            <el-form-item label="项目名称" prop="applyProjectName">
            <el-input v-model="keyan.applyProjectName"></el-input>
            </el-form-item>
            <el-form-item label="请输入项目介绍(50-500字)" prop="applyProjectText">
                <el-input
                        type="textarea"
                        prop="applyProjectText"
                        rows="5"
                placeholder="请输入内容"
                v-model="keyan.applyProjectText">
                </el-input>
            </el-form-item>

            <el-form-item label="科研资金(RMB)" prop="applyProjectFunds" number>
                <el-input  v-model.number="keyan.applyProjectFunds"
                        type='number'></el-input>
            </el-form-item>



            <el-form-item>
                <el-button type="primary" @click="submitForm('keyan')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>

<script>
    export default {
        name: "UserProject",
        data(){
              return{
                  ruleForm:{
                      projectname:'',

                  },
                  keyan:{
                      applyProjectName:'',
                      applyProjectText:'',
                      applyProjectFunds:'',
                      applyUser:'',
                      ispass:''
                  },
                  rules: {
                      applyProjectName: [
                          {required: true, message: '请输入项目名', trigger: 'blur'},
                          {min: 5, max: 12, message: '长度在 5到12个字符', trigger: 'blur'}
                      ],
                      applyProjectText: [
                          {required: true, message: '字段不能为空', trigger: 'blur'},
                          {min: 50, max: 500, message: '长度在50 到500 个字符', trigger: 'blur'}
                      ],
                  },

              }
        },methods:{
            submitForm(keyan){
                this.keyan.applyUser=this.$username
                const _this=this;
                this.$refs[keyan].validate((valid) => {
                    if (valid) {
                            this.axios.post('http://120.26.90.28:8098/cloudzuul/keyanservice/project-applay/applayproject',_this.keyan).then(function
                                (resp) {
                                console.log(resp)
                                if (resp.data.code=='10000'){
                                    _this.$message.success("申请发送成功")
                                    _this.keyan.applyProjectName=''
                                    _this.keyan.applyProjectText=''
                                    _this.keyan.applyProjectFunds=''

                                }else {
                                    _this.$message.error("申请发送失败")
                                }
                            });
                    }
                });


            }

        }
    }
</script>

<style scoped>

</style>
