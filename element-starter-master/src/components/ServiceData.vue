<template>
    <div id="dataTable">
        <div>
            <el-form ref="form" :inline="true" :model="form" label-width="80px">
                <el-form-item label="服务类名">
                    <el-input v-model="serviceName" placeholder="请输入查询的类" resize="horizontal"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getRequestData">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
                :data="tableData"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="serviceName"
                    label="服务类名">
            </el-table-column>
            <el-table-column
                    prop="producerCount"
                    label="生产者数量">
            </el-table-column>
            <el-table-column
                    prop="callCount"
                    label="累计调用">
            </el-table-column>
            <el-table-column
                    prop="handleTime"
                    label="平均处理时间">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-popover
                            placement="right"
                            trigger="hover">
                        <el-table :data="scope.row.producerList">
                            <el-table-column property="host" label="ip"></el-table-column>
                            <el-table-column property="port" label="端口"></el-table-column>
                            <el-table-column
                                    prop="handleTime"
                                    label="平均处理时间">
                            </el-table-column>
                        </el-table>
                        <el-button slot="reference" type="text">生产者列表</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <div id="page">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page=pageNo
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=pageSize
                    layout="total, sizes, prev, pager, next, jumper"
                    :total=total v-on:current-change="handleCurrentChange" v-on:size-change="handleSizeChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        data() {
            return {
                total: 400,
                pageSize: 10,
                pageNo: 1,
                tableData: null,
                serviceName: '',
                radio: '1',
                responseData: null,
                value2: ''

            };
        },
        name: "RequestData",
        methods: {
            getRequestData() {
                var startDate;
                var endDate;
                if (this.value2 != null) {
                    startDate = this.value2[0];
                    endDate = this.value2[1];
                }
                Axios({
                        method: "get",
                        url: "/api/service",
                        params: {
                            pageSize: this.pageSize,
                            pageNo: this.pageNo,
                            serviceName: this.serviceName
                        }
                    }
                ).then(response => {
                    if (response.status !== 200) {
                        console.log("false");
                    } else {
                        this.tableData = response.data.data.data;
                        this.responseData = response.data.data.data;
                        this.total = response.data.data.count;
                    }
                })
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getRequestData()
            },
            handleCurrentChange(val) {
                this.pageNo = val;    //动态改变
                this.getRequestData()
            },
            handleClick(val) {
                console.log(val.producerList);
            }
        },

        mounted() {
            this.getRequestData();
        }
    }
</script>

<style scoped>
    #dataTable {
        margin-top: 20px;
        margin-left: 5%;
        margin-right: 5%;
    }

    #page {
        margin-top: 20px;
        float: right;
    }

    #opButton {
        margin: 5px;
    }
</style>
