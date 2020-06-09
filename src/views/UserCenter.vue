<template>
        <div>
                <div>
                        <h1>#个人中心</h1>
                        <hr>
                        基本资料 <br>
                        用户：{{this.username}}
                        <hr>

                        <el-button @click="jumpGetface()"
                                   :disabled="isfaceinfo"
                        >完善面部信息，激活刷脸登陆</el-button>
                        <h1>#实验室申请记录</h1>

                        <el-table
                                :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                                stripe
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
                        </el-table>
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 30]"
                                :page-size="pagesize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total=tableDate.length>
                        </el-pagination>


                        <h1>#科研项目申请记录</h1>
                        <el-table

                                :data="keyantable.slice((keyancurrentPage-1)*keyanpagesize,keyancurrentPage*keyanpagesize)"
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

                        </el-table>
                        <el-pagination
                                @size-change="keyanhandleSizeChange"
                                @current-change="keyanhandleCurrentChange"
                                :current-page="keyancurrentPage"
                                :page-sizes="[10, 20, 30]"
                                :page-size="keyanpagesize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total=keyantable.length>
                        </el-pagination>







                </div>
        </div>
</template>

<script>
        // import {getToken} from "../util/TokenUtil";
    export default {
        name: "UserCenter",
            data(){
                    return{
                            tableDate:{
                                    id:'',
                                    applayLaboratoryNum:'',
                                    applayLaboratoryUser:'',
                                    ispass:'',
                                    reason:''
                            },
                            currentPage:1,
                            pagesize:20,
                            keyancurrentPage:1,
                            keyanpagesize:10,
                            username:null,
                            isfaceinfo:null,
                            keyantable:{
                                    id:'',
                                    applyProjectName:'',
                                    applyProjectText:'',
                                    applyProjectFunds:'',
                                    applyUser:'',
                                    ispass:''
                            }
                    }
            },methods:{
                    jumpGetface(){
                            this.$router.push("/getface")
                    },
                    handleSizeChange(val) {
                            this.pagesize = val;
                    },
                    handleCurrentChange(val) {
                            this.currentPage = val;
                    },

                    keyanhandleSizeChange(val) {
                            this.keyanpagesize = val;
                    },
                    keyanhandleCurrentChange(val) {
                            this.keyancurrentPage = val;
                    },


            },created() {

                    const _this=this
                    this.axios.get('http://localhost:8098/cloudzuul/keyanservice/user/getusername').then(function (resp) {
                            console.log(resp.data.data)
                            _this.username=resp.data.data;
                    })

                    this.axios.get("http://localhost:8098/cloudzuul/keyanservice/user/isfaceinfo").then(function
                            (resp) {
                            // console.log(resp)
                            _this.isfaceinfo=resp.data.data
                    })

                    this.axios.post('http://localhost:8098/cloudzuul/keyanservice/laboratory-applay/getUserLab').then(function (resp) {
                           // console.log(resp)

                            _this.tableDate=resp.data.data
                    })


                    this.axios.post('http://localhost:8098/cloudzuul/keyanservice/project-applay/applayprojectuser').then(function (resp) {
                            console.log(resp)
                            _this.keyantable=resp.data.data
                    })




            }
    }
</script>

<style scoped>

</style>
