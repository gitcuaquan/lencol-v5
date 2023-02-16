<template>
    <div class="tool--wapper-show_photo">
        <div class="row g-0">
            <div class="nav nav-tabs bg-light" id="nav-tab" role="tablist">
                <button class="nav-link active fw-bold" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                    aria-selected="true">Layer</button>
                <button class="nav-link fw-bold" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                    aria-selected="false">Save photo</button>
            </div>
        </div>
        <div class="tab-content pt-3" id="nav-tabContent" style="height: 90vh; overflow-y:auto">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                <div class="lf--collap mb-3" v-for="item, index in layers" :key="index">
                    <button class="btn text-start btn-secondary w-100 rounded-0" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse-${item.meshName}`" aria-expanded="false">
                        🖼️ {{ item.name }}
                    </button>
                    <div class="collapse" :id="`collapse-${item.meshName}`">
                        <div class="card  rounded-0 card-body">
                           <div class="d-flex align-items-center " v-for="img,iImg in item.images" :key="iImg">
                            <div style="width: 40px; object-fit: cover;" class="ratio ratio-1x1">
                                <img :src="img" class="w-100"  alt="">
                            </div>
                            <h5 class="ms-3">
                                Image {{ iImg }}
                            </h5>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                <div class="row g-0" v-if="listPhoto.length">
                    <div v-for="item, index in listPhoto" :key="index" class="col-6 p-2">
                        <div class="position-relative">
                            <button @click="RemovePhoto(index)" class="btn-danger rounded-circle btn position-absolute mt-2">
                                x
                            </button>
                            <a :href="item" :download="`lencol image version ${index + 1}`" class="btn-success rounded-circle btn position-absolute btn-sm mt-5">
                                <img src="/img/dw-icon.svg" style="width:20px" alt="">
                            </a>
                            <div class="card-body ">
                                <img :src="item" class="img-thumbnail" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <h4 class="text-center">
                        No photos have been taken yet
                    </h4>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
const { listPhoto, RemovePhoto } = usePhoto()
const { meshList, meshSelected } = useMesh()
const { layers } = useLayer()
</script>

<style scoped>
.tool--wapper-show_photo {
    position: absolute;
    right: 0;
    height: 100vh;
    width: 380px;
    top: 0;
    background: #f0f0f0;

}
</style>