<template>
    <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
</template>

<script>
    import Axios from "axios";

    export default {
        name: "TopCallTimeIp",
        props: {
            value: {
                default: '',
            },
        },
        data() {
            this.chartSettings = {
                labelMap: {
                    'callTime': '调用次数',
                    'ip': '地址'
                }
            }
            return {
                interval: "DAY",
                chartData: {
                    columns: ['ip', 'callTime'],
                    rows: [
                        {'ip': '127.0.0.1', 'clazz': 'test', 'callTime': 1393},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'callTime': 3530},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'callTime': 2923},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'callTime': 1723},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'callTime': 3792},
                        {'ip': '127.0.0.1', 'clazz': 'test', 'callTime': 4593}
                    ]
                },
            }
        }, watch: {
            value: function (newinterval, oldinterval) {
                console.log("value change");
                this.interval=newinterval;
                this.refresh();
            }
        }, methods: {
            getTitle() {
                return {text: this.title}
            },
            refresh() {
                Axios({
                        method: "get",
                        url: "/api/request/call",
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
        }, mounted() {
            this.refresh();
        }
    }
</script>


<style scoped>

</style>
