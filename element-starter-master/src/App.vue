<template>
    <el-container>
        <el-header>
            <el-aside></el-aside>
            <my-menu ></my-menu>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer></el-footer>
    </el-container>
</template>

<script>
    import MyMenu from './components/Menu'

    export default {
        name: 'app',
        components: {MyMenu},
        methods: {
            startHacking() {
                this.$notify({
                    title: 'It works!',
                    type: 'success',
                    message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
                    duration: 5000
                })
            }
        }
    }
</script>

<style>
    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }
</style>
