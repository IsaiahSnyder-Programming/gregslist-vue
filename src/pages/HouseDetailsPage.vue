<template>
    <div class="container">
        <div class="row mt-3 bg-light shadow p-4">
            <div class="col-md-6">
                <img :src="house.imgUrl" class="img-fluid" alt="">
            </div>
            <div class="col-md-6">
                <h2>${{house.price}}</h2>
                <h1>Bedrooms: {{house.bedrooms}} | Bathrooms: {{house.bathrooms}}</h1>
                <h2>Levels: {{house.levels}} | Year Built: {{house.year}}</h2>
                <p>{{house.description}}</p>
            </div>
            <div class="text-end selectable" @click="openModal">
                <i class="mdi mdi-pencil"></i>
            </div>
        </div>
        <Modal>
            <template #modal-title>Edit House</template>
            <template #modal-body><HouseForm :houseData="house" /></template>
        </Modal>
    </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { housesService } from '../services/HousesService'
import { Modal } from 'bootstrap'
export default {
    setup() {
        const route = useRoute()
        onMounted(async () => {
            try {
                AppState.activeHouse = {}
                await housesService.getById(route.params.id)
            } catch (error) {
                logger.log(error)
            }
        })
        return {
            house: computed(() => AppState.activeHouse),
            openModal() {
                Modal.getOrCreateInstance(document.getElementById("form-modal")).show();
            }
        }  
    }
}
</script>