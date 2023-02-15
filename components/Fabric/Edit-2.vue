<template>
    <div>
        <div ref="wapperFabric" class="lf--wapper-fabric">
            <canvas ref="fabricCanvas"></canvas>
        </div>
        <div class="d-none">
            <canvas ref="exportCanvas"></canvas>
        </div>
    </div>
</template>

<script setup lang="ts">
import Frabric from '~~/model/Fabricjs-2';
const fabricCanvas = ref()
const wapperFabric = ref()
const exportCanvas = ref()

const { meshSelected } = useMesh()

onMounted(() => {
    const FABRIC = new Frabric(fabricCanvas.value, exportCanvas.value)
    watch(meshSelected,()=>{
        FABRIC.SetOverlayImage(meshSelected.value.link)
        FABRIC.AddImage(meshSelected.value.image)
    })
})
</script>

<style scoped>
.lf--wapper-fabric {
    width: 100%;
    height: 100vh;
    background: #8780ac;
    display: flex;
    padding-left: 160px;
    align-items: center;
}
</style>