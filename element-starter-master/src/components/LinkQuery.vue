<template>
    <div class="container">
        <div>
            <el-form ref="form" :inline="true" :model="form" label-width="80px">
                <el-form-item label="请求id">
                    <el-input v-model="requestId" placeholder="请输入查询的类" resize="horizontal"
                              @click="getPathData"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getPathData">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
            <div id="main" style="height:400px;"></div>
        <el-table
                :data="tableData"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="requestId"
                    label="请求Id"
            >
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
                    prop="fromRequestId"
                    label="前驱请求Id">
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
    </div>
</template>

<script>
    import echarts from 'echarts'
    import Axios from "axios";

    export default {
        name: "LinkQuery",
        data() {
            return {
                nodes: [{
                    name: '节点1',
                    x: 300,
                    y: 300
                }],
                links: [{
                    source: 0,
                    target: 1,
                },],
                requestId: '',
                tableData: null
            };
        },
        methods: {
            getPathData() {
                console.log(this.requestId);
                Axios({
                        method: "get",
                        url: "/api/request/path",
                        params: {
                            requestId: this.requestId,
                        }
                    }
                ).then(response => {
                    if (response.status !== 200) {
                        console.log("false");
                    } else {
                        this.nodes = response.data.data.nodes;
                        this.links = response.data.data.links;
                        this.tableData = response.data.data.requestDataList;
                        console.log(this.nodes);
                        console.log(this.links);
                    }
                    // 基于准备好的dom，初始化echarts实例
                    var myChart = echarts.init(document.getElementById('main'));
                    // 绘制图表
                    myChart.setOption({
                        tooltip: {},
                        animationDurationUpdate: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [
                            {
                                type: 'graph',
                                layout: 'none',
                                symbolSize: 50,
                                roam: true,
                                label: {
                                    show: true
                                },
                                edgeSymbol: ['circle', 'arrow'],
                                edgeSymbolSize: [4, 10],
                                edgeLabel: {
                                    fontSize: 20
                                },
                                data: this.nodes,
                                // links: [],
                                links: this.links
                            }
                        ]
                    });
                });
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-top: 20px;
        margin-left: 5%;
        margin-right: 5%;
    }

</style>
