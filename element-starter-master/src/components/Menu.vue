<template>
    <div id="topBar">
        <el-menu id="headMenu" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect" router>
            <el-menu-item index="/">
                <div id="imgDiv">
                    <img src="../assets/logo.png" height="60px" width="60px">
                </div>
            </el-menu-item>
            <el-menu-item index="dashboard" >仪表板</el-menu-item>
            <el-menu-item index="requestData">请求数据</el-menu-item>
            <el-menu-item index="serviceData">服务列表</el-menu-item>
            <el-menu-item index="linkQuery">链路查询</el-menu-item>
            <el-menu-item index="4"><a href="https://github.com/leonyan18/RpcDemo" target="_blank">Star</a>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'my_menu',
        data() {
            return {
                activeName: "",
                activeIndex: '',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClick(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted() {
            console.log(this.activeIndex);

        }
    }
</script>

<style>
    #headMenu {
        font-family: Helvetica, sans-serif;
        text-align: center;
        border-bottom: solid 0
    }

    #topBar {
        height: 60px;
        border-bottom: solid 1px #e6e6e6
    }

    #imgDiv {
        display: block;
        text-align: center;
        height: 80px;
    }
</style>
