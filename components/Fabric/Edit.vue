<template>
    <div>
        <div ref="wapperFabric" class="lf--wapper-fabric">

            <div v-if="!link_image" class="lf--wapper-fabric-upload" @click="inputFile.click()">
                <button class=" fs-4 rounded-circle ">
                    upload
                </button>
                <input type="file" ref="inputFile" accept="image/*" @change="getFile" style="display:none">
            </div>

            <canvas ref="fabricCanvas"></canvas>
        </div>
        <div class="d-none">
            <canvas ref="exportCanvas"></canvas>
        </div>
    </div>
</template>

<script setup >
import Frabric from '~~/model/Fabricjs';
// == khai bảo biến cần dùng
const { AddLayer } = useLayer()
const fabricCanvas = ref()
const wapperFabric = ref()
const exportCanvas = ref()
const inputFile = ref()
const link_image = ref()
var FABRIC
// === props vuejs
const props = defineProps({
    overlay: {
        type: String,
        default: '',
        required: true,
    },
    mesh: {
        type: String,
        default: '',
        required: true,
    },
    canvas_name: {
        type: String,
        default: '',
        required: true,
    }
})
// == hook vuejs
onMounted(() => {
    FABRIC = new Frabric(fabricCanvas.value, exportCanvas.value, props.mesh)
    FABRIC.SetOverlayImage(props.overlay)
})
// === theo dõi biến
watch(link_image, (val) => {
    FABRIC.AddImage(val)
    var data = {
        meshName: props.mesh,
        link: val,
        name: props.canvas_name
    }
    AddLayer(data)
})
// == phương thức xử lý nội bộ
const getFile = (e) => {
    if (e.target && e.target.files[0]) {
        link_image.value = URL.createObjectURL(e.target.files[0]);
    }
}
</script>

<style scoped>
.lf--wapper-fabric {
    width: 100%;
    height: 100vh;
    background: #ffffff;
    display: flex;
    padding-left: 100px;
    align-items: center;
}

.lf--wapper-fabric-upload {
    width: 800px;
    height: 800px;
    position: absolute;
    background: #ffffff28;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lf--wapper-fabric-upload button {
    width: 150px;
    height: 150px;
    background: #00000036;
    border: none;
}
</style>