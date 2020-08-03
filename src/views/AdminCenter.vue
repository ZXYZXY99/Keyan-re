<template>
    <div>
        <h1>#个人中心</h1>
        <hr>
        基本资料 <br>
        管理员：{{this.$adminname}}
        <hr>
        <h1>#实验室审核记录</h1>
        <el-table
                :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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


        <hr>
        <h1>#项目审核记录</h1>

        <el-table
                :data="keyantable.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
                @size-change="projecthandleSizeChange"
                @current-change="projecthandleCurrentChange"
                :current-page="projectcurrentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="projectpagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total=keyantable.length>
        </el-pagination>




    </div>
</template>

<script>
    export default {
        name: "AdminCenter",
        data(){
            return{
                currentPage:1,
                pagesize:20,
                projectcurrentPage:1,
                projectpagesize:10,
                tableDate:{
                    id:'',
                    applayLaboratoryNum:'',
                    applayLaboratoryUser:'',
                    ispass:'',
                    reason:''
                },
                keyantable:{
                    id:'',
                    applyProjectName:'',
                    applyProjectText:'',
                    applyProjectFunds:'',
                    applyUser:'',
                    ispass:''
                }

            }
        },
        methods:{
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },

            projecthandleSizeChange(val) {
                this.projectpagesize = val;
            },
            projecthandleCurrentChange(val) {
                this.projectcurrentPage = val;
            },


        },created() {
            const _this=this;
            this.axios.get('http://120.26.90.28:8098/cloudzuul/keyanservice/laboratory-applay/admin/getApplayLog')
                .then(function (resp) {
                    if (resp.data.code=='10000'){
                        _this.tableDate=resp.data.data
                    }
                console.log(resp)
            });


            this.axios.get('http://120.26.90.28:8098/cloudzuul/keyanservice/project-applay/getApplayLog')
                .then(function (resp) {
                if (resp.data.code=='10000'){
                    _this.keyantable=resp.data.data
                }
            })








        }
    }
</script>

<style scoped>

</style>
