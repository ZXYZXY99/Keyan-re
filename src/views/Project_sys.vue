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

    </div>
</template>

<script>
    export default {
        name: "Project_sys",
        data(){
            return{
                tableData:{
                    id:'',
                    projectName:'',
                    projectUser:'',
                    projectDescribe:'',
                    funds:'',
                    achievements:''
                },


            }
        },methods:{

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
