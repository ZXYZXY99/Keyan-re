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
                    prop="laboratoryNum"
                    label="实验室"
            >
            </el-table-column>
            <el-table-column
                    prop="laboratoryUsername"
                    label="申请人">
            </el-table-column>

            <el-table-column
                    prop="laboratoryIsuse"
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
                            title="是否归还？"
                            @onConfirm="handleEdit(scope.row)"
                    >
                        <el-button slot="reference"
                                   size="mini"

                        >归还</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "UserLab",
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
                const _this=this;
                console.log(row)
                this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/laboratory/returnLab',row)
                    .then(function (resp) {
                        console.log(resp)
                        if (resp.data.code=='10000'){
                            _this.flushTable();
                        }
                    })

            },
            flushTable(){
                const  _this=this;
                this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/laboratory/getmyLab')
                    .then(function (resp) {
                        console.log(resp)
                        if (resp.data.code=='10000'){
                            _this.tableDate=resp.data.data;

                        }
                    })
            }


        },created() {
            const  _this=this;

            this.axios.post('http://121.41.93.145:8098/cloudzuul/keyanservice/laboratory/getmyLab')
                .then(function (resp) {
                    console.log(resp)
                    if (resp.data.code=='10000'){
                        _this.tableDate=resp.data.data;

                    }
                })

        }
    }
</script>

<style scoped>

</style>
