<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<style>
div{
    display: flex;
    flex-direction: column;
}
div>*{
    display: flex;
    flex-direction: column;
}
</style>