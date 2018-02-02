<template>
    <div id="app">
        <div class="cover"></div>
        <Header></Header>
        <todo></todo>
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from "./todo/header.vue";
    import Footer from "./todo/footer.jsx";
    
    import Todo from './todo/todo.vue'
    export default {
        components: {
            Header,
            Footer,
            Todo
        },
        data() {
            return {
                text: "abc23"
            };
        }
    };
</script>

<style lang="less" scope>
    .full {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    #app {
        .full;
    }

    .cover {
        .full;
        opacity: 0.3;
        background-color: #999;
        z-index: -1;
    }
</style>
