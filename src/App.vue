<template>
    <div id="home">
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,body{
    background-color: #eee;
    height:100%;
    overflow:hidden;
}
a{
    text-decoration: none;
}
#home {
    height: 100%;
}
</style>
