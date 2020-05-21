<template>
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
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    id: '',
                    userName: '',
                    userPassword: ''
                }],
                search: ''
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        },created() {
            const _this=this;
            this.axios.get('http://localhost:8097/keyanservice/user/getlist').then(function (resp) {
                console.log(resp.data.data)
                _this.tableData=resp.data.data
            })


        }
    }
</script>

<style scoped>

</style>
