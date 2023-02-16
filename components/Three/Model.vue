<template>
    <div>
        <div class="position-relative">
            <div ref="wapperThree" class="wapper-canvas">
                <canvas ref="main"></canvas>
            </div>
            <div class="lf--wapper-tool_photo">
                <button @click="CreatePhoto([0,0, 1.3],[0,0,0])" class="btn btn-outline-danger rounded-0 d-flex align-items-center me-2">
                    <img src="/img/camera-icon.svg" width="20" alt="" class="me-2"> Font
                </button>
                <button @click="CreatePhoto([0, 0, -1.3],[-3.15, 0, 3.15])" class="btn btn-outline-danger rounded-0 d-flex align-items-center me-2">
                    <img src="/img/camera-icon.svg" width="20" alt="" class="me-2"> Back
                </button>
                <button @click="CreatePhoto([-1.3,-0.05, 0],[29.7,-77,-26.8])" class="btn btn-outline-danger rounded-0 d-flex align-items-center me-2">
                    <img src="/img/camera-icon.svg" width="20" alt="" class="me-2"> Left
                </button>
                <button @click="CreatePhoto([1.3,0.05,0],[-29.7,77,-26.9])" class="btn btn-outline-danger rounded-0 d-flex align-items-center me-2">
                    <img src="/img/camera-icon.svg" width="20" alt="" class="me-2"> Right
                </button>
            </div>
        </div>
    </div>
</template>

<script setup >
import ThreeJS from '~~/model/Threejs';
const { SetListPhoto, listPhoto } = usePhoto()
const main = ref()
const wapperThree = ref()

var Three = null
onMounted(() => {
    Three = new ThreeJS(main.value, wapperThree.value);
    Three.AddModel3D('/Women T-Shirt/model/SGNTX.glb')
    window.addEventListener('export:image', (e) => {
        Three.AddTexture(e.detail)
    })
})

const CreatePhoto = (position, rotation) => {
    SetListPhoto(Three.Image3dTo2d(position, rotation));
}


</script>

<style scoped>
.wapper-canvas {
    width: 100%;
    height: 100vh;
}

.lf--wapper-tool_photo {
    position: absolute;
    width: 100%;
    height: 100px;
    bottom: 0;
    background: #ffffff00;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>