<template>
    <div class="lf--main-view_edit">
        <ToolMeshs />
        <pre>
            {{meshList}}
        </pre>
    </div>
</template>

<script setup lang="ts">
const { meshSelected,meshList } = useMesh()
</script>

<style scoped>
.lf--main-view_edit {
    position: relative;
    height: 100vh;
    background: #4b6b77;
    width: 100vw;
}
</style>