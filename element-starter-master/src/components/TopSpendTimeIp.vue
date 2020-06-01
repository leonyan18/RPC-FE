<template>
    <div>
        <ve-histogram  :data="chartData" :settings="chartSettings"></ve-histogram>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "TopSpendTimeIp",
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
                    'ip': '地址'
                }
            }
            return {
                interval: "DAY",
                chartData: {
                    columns: ['ip', 'averageHandleTime', 'averageNetTime'],
                    rows: [
                        {'ip': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 1393, 'averageNetTime': 1093},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 3530, 'averageNetTime': 3230},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 2923, 'averageNetTime': 2623},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 1723, 'averageNetTime': 1423},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 3792, 'averageNetTime': 3492},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'averageHandleTime': 4593, 'averageNetTime': 4293}
                    ]
                }
            }
        }, watch: {
            value: function (newinterval, oldinterval) {
                console.log("value change");
                this.interval=newinterval;
                this.refresh();
            }
        },
        mounted() {
            this.refresh();
        },methods:{
            getTitle(){
                return {text: this.title}
            },refresh(){
                Axios({
                        method: "get",
                        url: "/api/request/spend",
                        params: {
                            type: 0,
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
