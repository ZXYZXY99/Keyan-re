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

    </div>
</template>

<script>
    export default {
        name: "Project_SH",
        data(){
            return{
                tableData:{
                    id:'',
                    applyProjectName:'',
                    applyProjectText:'',
                    applyProjectFunds:'',
                    applyUser:'',
                    ispass:''
                }

            }

        },methods:{

        },created() {
            const _this=this;

            this.axios.get('http://localhost:8098/cloudzuul/keyanservice/project-applay/getlist').then(function
                (resp) {
                _this.tableData=resp.data.data;
            })


        }
    }
</script>

<style scoped>

</style>
