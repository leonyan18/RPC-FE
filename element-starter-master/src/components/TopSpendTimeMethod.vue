<template>
    <div>
        <ve-histogram  :data="chartData" :settings="chartSettings"></ve-histogram>
    </div>
</template>

<script>
    import Axios from "axios";
    import "echarts/lib/component/title";
    export default {
        name: "TopSpendTimeMethod",
        props: {
            value: { // 必须要使用value
                default: '',
            },
        },
        data() {
            this.chartSettings = {
                labelMap: {
                    'averageHandleTime': '平均处理时间/ms',
                    'averageNetTime': '总耗时/ms',
                    'method': '方法'
                }
            }
            return {
                interval: "DAY",
                chartData: {
                    columns: ['method', 'averageHandleTime', 'averageNetTime'],
                    rows: [
                        {'method': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 1393, 'averageNetTime': 1093},
                        {'method': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 3530, 'averageNetTime': 3230},
                        {'method': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 2923, 'averageNetTime': 2623},
                        {'method': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 1723, 'averageNetTime': 1423},
                        {'method': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 3792, 'averageNetTime': 3492},
                        {'method': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 4593, 'averageNetTime': 4293}
                    ]
                },
                title: "最近一小时耗时最长ip地址"
            }
        }, watch: {
            value: function (newinterval, oldinterval) {
                console.log("value change");
                this.interval=newinterval;
                this.refresh();
            }
        },
        mounted() {
            this.refresh()
        },methods:{
            getTitle(){
                return {text: this.title}
            },refresh(){
                Axios({
                        method: "get",
                        url: "/api/request/spend",
                        params: {
                            type: 1,
                            interval: this.value
                        }
                    }
                ).then(response => {
                    if (response.status !== 200) {
                        console.log("false");
                    } else {
                        this.chartData.rows = response.data.data;
                    }
                });
            }
        }
    }
</script>


<style scoped>

</style>
