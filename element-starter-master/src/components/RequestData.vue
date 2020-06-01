<template>
    <div id="dataTable">
        <div>
            <el-form ref="form" :inline="true" :model="form" label-width="80px">
                <el-form-item label="全类名">
                    <el-input v-model="clazz" placeholder="请输入查询的类" resize="horizontal"></el-input>
                </el-form-item>
                <el-form-item label="生产者">
                    <el-input v-model="toAddress" placeholder="请输入查询的ip" resize="horizontal"></el-input>
                </el-form-item>
                <el-form-item label="消费者">
                    <el-input v-model="fromAddress" placeholder="请输入查询的ip" resize="horizontal"></el-input>
                </el-form-item>
                <el-form-item label="方法名">
                    <el-input v-model="useMethod" placeholder="请输入查询的方法" resize="horizontal"></el-input>
                </el-form-item>
                <el-form-item label="日期范围">
                    <el-date-picker
                            v-model="value2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
                    </el-date-picker>
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
                    prop="requestId"
                    label="请求id"
            >
            </el-table-column>
            </el-table-column>
            <el-table-column
                    prop="clazz"
                    label="类型">
            </el-table-column>
            <el-table-column
                    prop="method"
                    label="方法">
            </el-table-column>
            <el-table-column
                    prop="fromAddress"
                    label="消费者">
            </el-table-column>
            <el-table-column
                    prop="toAddress"
                    label="生产者">
            </el-table-column>
            <el-table-column
                    prop="requestTime"
                    label="请求时间">
            </el-table-column>
            <el-table-column
                    prop="handleTime"
                    label="处理时间/ms">
            </el-table-column>
            <el-table-column
                    prop="spendTime"
                    label="总耗时/ms">
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
                clazz: '',
                fromAddress: '',
                toAddress: '',
                useMethod: '',
                requestTime: '',
                receiveTime: '',
                handleStartTime: '',
                handleEndTime: '',
                radio: '1',
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                            console.log(this.value2)
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value2: ''

            };
        },
        name: "RequestData",
        methods: {
            getRequestData() {
                console.log("send-request");
                var startDate;
                var endDate;
                if (this.value2 != null) {
                    startDate = this.value2[0];
                    endDate = this.value2[1];
                }
                Axios({
                        method: "get",
                        url: "/api/request",
                        params: {
                            pageSize: this.pageSize,
                            pageNo: this.pageNo,
                            startDate: startDate,
                            endDate: endDate,
                            clazz: this.clazz,
                            method: this.useMethod,
                            fromAddress: this.fromAddress,
                            toAddress: this.toAddress,
                            requestTime: this.requestTime,
                            receiveTime: this.receiveTime,
                            handleStartTime: this.handleStartTime,
                            handleEndTime: this.handleEndTime,
                            spendTime: this.spendTime,
                            handleTime: this.handleTime,

                        }
                    }
                ).then(response => {
                    if (response.status !== 200) {
                        console.log("false");
                    } else {
                        this.tableData = response.data.data.data;
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
</style>
