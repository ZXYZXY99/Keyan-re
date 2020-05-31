<template>
    <el-row :gutter="10" align="middle">
        <el-col :xs="{span:24,offset:0}" :sm="{span:16,offset:4}" :md="{span:8,offset:8}">

            <div class="login">
                <el-card>
                    <h1>科研系统</h1>
                    <h2>LOGIN</h2>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="adminName" >
                            <el-input placeholder="请输入你的手机号" v-model="ruleForm.adminName"></el-input>
                        </el-form-item>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="密码" prop="adminPassword">
                                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.adminPassword"></el-input>
                            </el-form-item>


                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')"
                                           v-loading.fullscreen.lock="fullscreenLoading">登陆</el-button>
<!--                                <el-button type="primary" @click="findpass()">找回密码</el-button>-->
                                <el-button >重置</el-button>
                                <el-button  @click="loginjumpface()">刷脸登陆</el-button>
                                <el-switch
                                        v-model="switch_vlue"
                                        active-text="管理员登陆"
                                        >
                                </el-switch>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </el-card>
                <!--            <h1 style="color: crimson">维护中</h1>-->
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import {setToken} from "../util/TokenUtil";
    export default {

        data() {
            return {
                switch_vlue:false,
                fullscreenLoading:false,
                // loading:false,
                ruleForm: {
                    adminName: '',
                    adminPassword:''
                },
                userForm:{
                    userName:'',
                    userPassword: ''
                },
                rules: {
                    adminName: [
                        { required: true, message: '请输入电话号码'},
                        {validator:function(rule,value,callback){
                                if(/^1[34578]\d{9}$/.test(value) == false){
                                    callback(new Error("请输入正确的手机号"));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur'}
                    ],
                    adminPassword: [
                        { required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 5, max: 14, message: '长度在5 到 14 个字符', trigger: 'blur'
                        }
                    ],
                }
            };
        },
        methods: {
            submitForm(ruleForm) {
                this.fullscreenLoading = true;
                    const _this=this;
                this.$refs[ruleForm].validate((valid) => {
                        if (valid) {
                            if (_this.switch_vlue){
                                this.axios.post('http://localhost:8098/cloudzuul/keyanservice/admin/login',this.ruleForm).then(function
                                    (resp) {
                                    console.log(resp)
                                    if (resp.data.success){

                                        setToken(resp.data.data)
                                        _this.fullscreenLoading = false;
                                        _this.$router.push("/aside")
                                    } else {
                                        _this.$message.error("账号或密码错误")
                                        _this.fullscreenLoading = false;
                                    }
                                })
                            }else {
                                _this.userForm.userName=_this.ruleForm.adminName
                                _this.userForm.userPassword=_this.ruleForm.adminPassword
                                this.axios.post('http://localhost:8098/cloudzuul/keyanservice/user/login',this.userForm).then(function
                                    (resp) {
                                    console.log(resp)
                                    if (resp.data.success){

                                        setToken(resp.data.data)
                                        _this.fullscreenLoading = false;
                                        _this.$router.push("/useraside")
                                    } else {
                                        _this.$message.error("账号或密码错误")
                                        _this.fullscreenLoading = false;
                                    }
                                })
                            }

                    } else {
                        _this.$message.error("登陆失败")
                            _this.fullscreenLoading = false;
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            loginjumpface(){
                this.$router.push("/facelogin")
            }
        }
    }
</script>
