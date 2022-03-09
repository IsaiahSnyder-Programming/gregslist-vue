<template>
    <div class="component">
        <b
        title="Create House"
        class="
        create-btn
        btn btn-success
        rounded-pill
        shadowed
        d-flex
        align-items-center
        justify-content-center"
        data-bs-toggle="modal"
        data-bs-target="#form-modal"
        >
          <i class="mdi mdi-plus"></i>  
        </b>
        <div class="row mt-1">
            <div v-for="h in houses" :key="h.id" class="col-4 p-4 mb-2">
                <House :house="h" />
            </div>
        </div>
        <Modal>
            <template #modal-title>Create House</template>
            <template #modal-body><HouseForm /></template>
        </Modal>
    </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { onMounted } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import { housesService } from '../services/HousesService'
export default {
    setup() {
        onMounted(async () => {
            try {
                await housesService.getAll()
            } catch (error) {
                logger.error(error)
            }
        })
        return {
            houses: computed(() => AppState.houses)
        }
    },
}
</script>


<style scoped>
.create-btn {
  font-size: 20px;
  height: 60px;
  width: 60px;
  z-index: 100;
  position: fixed;
  bottom: 10vh;
  right: 5vh;
}
</style>