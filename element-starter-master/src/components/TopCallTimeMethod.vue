<template>
    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "TopCallTimeMethod",
        props: {
            value: { // 必须要使用value
                default: '',
            },
        },
        data() {
            this.chartSettings = {
                labelMap: {
                    'callTime': '调用次数',
                    'method': '方法'
                }
            }
            return {
                interval: "DAY",
                test: 're',
                chartData: {
                    columns: ['method', 'callTime'],
                    rows: [
                        {'ip': '127.0.0.1', 'clazz': 'test', '调用次数': 1393},
                        {'ip': '127.0.0.1', 'clazz': 'test', '调用次数': 3530},
                        {'ip': '127.0.0.1', 'clazz': 'test', '调用次数': 2923},
                        {'ip': '127.0.0.1', 'clazz': 'test', '调用次数': 1723},
                        {'ip': '127.0.0.1', 'clazz': 'test', '调用次数': 3792},
                        {'ip': '127.0.0.1', 'clazz': 'test', '调用次数': 4593}
                    ]
                }
            }
        }, watch: {
            value: function (newinterval, oldinterval) {
                console.log("value change");
                this.interval = newinterval;
                this.refresh();
            }
        },
        mounted() {
            this.refresh();
        }, methods: {
            getTitle() {
                return {text: this.title}
            },
            refresh() {
                Axios({
                        method: "get",
                        url: "/api/request/call",
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
