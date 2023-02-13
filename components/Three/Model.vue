<template>
    <div ref="wapperThree" class="wapper-canvas">
        <canvas ref="main"></canvas>
    </div>
</template>

<script setup >
import ThreeJS from '~~/model/Threejs';

const main = ref()
const wapperThree = ref()
onMounted(() => {
    const Three = new ThreeJS(main.value, wapperThree.value);
    Three.AddModel3D('/Women T-Shirt/model/SGNTX.glb')
    window.addEventListener('export:image', (e) => {
        Three.AddTexture(e.detail)
    })
})

</script>

<style scoped>
.wapper-canvas {
    width: 100%;
    height: 100vh;
}
</style>