<template>
    <div class="container-fluid px-lg-0">
        <div class="row g-0">
            <div class="col-lg-4">
                <ThreeModel />
            </div>
            <div class="col-lg-8 position-relative">
                <ToolMeshs />
                <div v-for="item,index in meshList" :key="index">
                    <div v-show="item.meshName == meshSelected.meshName">
                        <FabricEdit :overlay="item.link" :mesh="item.meshName" :canvas_name="item.name" />
                    </div>
                </div>
            </div>
        </div>
        <ToolShowPhoto />
    </div>
</template>

<script setup >
        const {meshList,meshSelected} = useMesh()
</script>

<style scoped>

</style>