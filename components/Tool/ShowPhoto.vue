<template>
    <div class="tool--wapper-show_photo">
        <div class="row g-0">
            <div class="nav nav-tabs bg-dark" id="nav-tab" role="tablist">
                <button class="nav-link active fw-bold" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                    aria-selected="true">Ảnh Đã Chụp</button>
                <button class="nav-link fw-bold" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                    aria-selected="false">Layer</button>
            </div>
        </div>
        <div class="tab-content pt-3" id="nav-tabContent" style="height: 90vh; overflow-y:auto">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
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
                   <h1 class="text-center">
                    Chưa Có ảnh chụp
                   </h1>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                <h1 class="text-center">
                    Đang Chờ
                </h1>
            </div>
        </div>

    </div>
</template>

<script setup>
const { listPhoto, RemovePhoto } = usePhoto()
</script>

<style scoped>
.tool--wapper-show_photo {
    position: absolute;
    right: 0;
    height: 100vh;
    width: 380px;
    top: 0;
    background: #adbeff;
    padding: 3px;
}
</style>