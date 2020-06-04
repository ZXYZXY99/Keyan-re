<template>
    <div>
        <h1>#个人中心</h1>
        <hr>
        基本资料 <br>
        管理员：{{this.$adminname}}
        <hr>
        <h1>#实验室审核记录</h1>
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
        </el-table>

        <hr>
        <h1>#项目审核记录</h1>

        <el-table
                :data="keyantable"
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
    </div>
</template>

<script>
    export default {
        name: "AdminCenter",
        data(){
            return{
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

        },created() {
            const _this=this;
            this.axios.get('http://localhost:8098/cloudzuul/keyanservice/laboratory-applay/admin/getApplayLog')
                .then(function (resp) {
                    if (resp.data.code=='10000'){
                        _this.tableDate=resp.data.data
                    }
                console.log(resp)
            });


            this.axios.get('http://localhost:8098/cloudzuul/keyanservice/project-applay/getApplayLog')
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
