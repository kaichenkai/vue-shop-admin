<template>
    <div class="login-view">
        <login/>
    </div>
</template>

<script>
    import login from "../components/login/login"
    export default {
        name: "Login",
        components: {
            login
        }
    };
</script>

<style scoped>
    .login-view {
        height: 100%;
        width: 100%;
    }
</style>