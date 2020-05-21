<template>
    <div>
        <h1>实验室申请</h1>
        <el-table
                :data="tableDate"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="序号"
            >
            </el-table-column>
            <el-table-column
                    prop="laboratoryNum"
                    label="实验室"
            >
            </el-table-column>
            <el-table-column
                    prop="laboratoryIsuse"
                    label="是否已被使用">
            </el-table-column>

            <el-table-column
                    prop="laboratoryUsername"
                    label="使用者">
            </el-table-column>


            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">申请</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        name: "Laboratory-User",
        data(){
            return{
                tableDate:{
                    id:'',
                    laboratoryNum:'',
                    laboratoryIsuse:'',
                    laboratoryUsername:''
                }
            }
        },methods:{
            handleEdit(row){
                console.log(row)
            }
        },created() {
            const _this=this;

            this.axios.get('http://localhost:8098/cloudzuul/keyanservice/laboratory/getlist').then(function
                (resp) {
                _this.tableDate=resp.data.data
            })


        }
    }
</script>

<style scoped>

</style>
