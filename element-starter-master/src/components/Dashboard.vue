<template>
    <div>
        <div class="choose">
            <el-select v-model="interval" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div id="dashboard">
            <el-card class="defaultChart">
                <span>最耗费时间的方法排名</span>
                <div>
                    <TopSpendTimeMethod v-model="interval"></TopSpendTimeMethod>
                </div>
            </el-card>
            <el-card class="defaultChart">
                <span>最耗费时间的ip排名</span>
                <div>
                    <TopSpendTimeIp v-model="interval"></TopSpendTimeIp>
                </div>
            </el-card>
            <el-card class="defaultChart">
                <span>调用次数最多的方法排名</span>
                <div>
                    <TopCallTimeMethod v-model="interval"></TopCallTimeMethod>
                </div>
            </el-card>
            <el-card class="defaultChart">
                <span>调用次数最多的ip排名</span>
                <div>
                    <TopCallTimeIp v-model="interval"></TopCallTimeIp>
                </div>
            </el-card>
        </div>
    </div>


</template>

<script>
    import TopSpendTimeIp from "~/components/TopSpendTimeIp";
    import TopSpendTimeMethod from "~/components/TopSpendTimeMethod";
    import TopCallTimeMethod from "~/components/TopCallTimeMethod";
    import TopCallTimeIp from "~/components/TopCallTimeIp";

    export default {
        name: "Dashboard",
        components: {TopSpendTimeIp, TopCallTimeMethod, TopCallTimeIp, TopSpendTimeMethod},
        data() {
            return {
                options: [{
                    value: 'HOUR',
                    label: '最近一小时'
                }, {
                    value: 'DAY',
                    label: '最近一天'
                }, {
                    value: 'WEEK',
                    label: '最近一周'
                }, {
                    value: 'MONTH',
                    label: '最近一个月'
                }],
                interval: "DAY"
            }
        }
    }
</script>

<style scoped>
    #dashboard {
        display: flex;
        margin: auto;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .defaultChart {
        text-align: center;
        width: 40%;
        margin: 20px;
    }

    .choose {
        display: flex;
        margin: auto;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
</style>
