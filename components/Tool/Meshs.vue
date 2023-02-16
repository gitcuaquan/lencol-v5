<template>
    <div class="lf--tool-mesh">
        <ul>
            <li v-for="item, index in meshList" class="btn btn-primary" :key="index" @click="selectMesh(item)">
                <img :src="item.link" class="w-100" alt="">
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { Mesh } from '~~/model/Type';
const {setMeshSelected,meshSelected, meshList } = useMesh()

const selectMesh = (item: Mesh) => {
    setMeshSelected(item)
}
</script>

<style scoped>
.lf--tool-mesh {
    position: absolute;
    width: 70px;
    height: 100%;
    background: #ffffff;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

ul {
    list-style: none;

    padding: 0 5px;
    margin: 0;
}

ul li {
    margin: 5px 0;
}
</style>