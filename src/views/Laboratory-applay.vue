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
                    <el-popconfirm
                            confirmButtonText='好的'
                            cancelButtonText='不用了'
                            icon="el-icon-info"
                            iconColor="red"
                            title="是否通过审核？"
                            @onConfirm="handleEdit(scope.row)"
                    >
                        <el-button slot="reference"
                                   size="mini"

                        >通过</el-button>
                    </el-popconfirm>
                    <el-button

                            size="mini"
                            type="danger"
                            @click="nohandleEdit(scope.$index, scope.row)">不通过</el-button>

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
            handleEdit(index){
                console.log(index)
                index.ispass='yes';

                this.axios.post('http://localhost:8098/cloudzuul/keyanservice/laboratory-applay/admin/updateLab',index)
                    .then(function (resp) {
                    console.log(resp)
                })



            },
            nohandleEdit(index,row){
                console.log(row)

            }
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
