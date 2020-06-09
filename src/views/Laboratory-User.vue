<template>
    <div>
        <h1>实验室申请</h1>
        <el-table
                :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)"
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
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total=tableDate.length>
        </el-pagination>



    </div>
</template>

<script>
    export default {
        name: "Laboratory-User",
        data(){
            return{
                currentPage:1,
                pagesize:20,
                tableDate:{
                    id:'',
                    laboratoryNum:'',
                    laboratoryIsuse:'',
                    laboratoryUsername:''
                }
            }
        },methods:{
            handleEdit(index,row){
                console.log(row.id,this.$username);
                const _this=this;
                this.axios.post('http://localhost:8098/cloudzuul/keyanservice/laboratory/applayupdate',null,{params:{
                    id:row.id,
                    username:this.$username
                    }}).then(function (resp) {
                        _this.$message.success('申请成功')
                        _this.reget();
                })


            },
            handleSizeChange(val) {
                this.pagesize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            reget(){
                const _this=this;
                this.axios.get('http://localhost:8098/cloudzuul/keyanservice/laboratory/getlist').then(function
                    (resp) {
                    _this.tableDate=resp.data.data
                })
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
