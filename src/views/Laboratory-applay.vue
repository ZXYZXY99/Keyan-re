<template>
    <div>
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


            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">审核</el-button>

                </template>
            </el-table-column>
        </el-table>

    </div>

</template>

<script>
    export default {
        name: "Laboratory-applay",
        data(){
            return{
                tableDate:{
                    id:'',
                    applayLaboratoryNum:'',
                    applayLaboratoryUser:'',
                    ispass:'',
                    reason:''
                }


            }
        },methods:{

        },created() {
            const _this=this

            this.axios.get('http://localhost:8098/cloudzuul/keyanservice/laboratory-applay/getlist').then(function (resp) {
                _this.tableDate=resp.data.data
            })

        }
    }
</script>

<style scoped>

</style>
