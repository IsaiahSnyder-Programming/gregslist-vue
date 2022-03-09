<template>
    <form>
        <div class="form-group">
            <label for="bedrooms">Bedrooms:</label>
            <input
                v-model="editable.bedrooms"
                type="number"
                class="form-control"
                placeholder="Bedrooms..."
                name="bedrooms"
                id="bedrooms"
                required
                >
        </div>
        <div class="form-group">
            <label for="bathrooms">Bathrooms:</label>
            <input
                v-model="editable.bathrooms"
                type="number"
                class="form-control"
                placeholder="Bathrooms..."
                name="bathrooms"
                id="bathrooms"
                required
                >
        </div>
        <div class="form-group">
            <label for="levels">Levels:</label>
            <input
                v-model="editable.levels"
                type="number"
                class="form-control"
                placeholder="Levels..."
                name="levels"
                id="levels"
                required
                >
        </div>
        <div class="form-group">
            <label for="year">Year:</label>
            <input
                v-model="editable.year"
                type="number"
                class="form-control"
                placeholder="Year..."
                name="year"
                id="year"
                required
                >
        </div>
        <div class="form-group">
            <label for="price">Price:</label>
            <input
                v-model="editable.price"
                type="number"
                class="form-control"
                placeholder="Price..."
                name="price"
                id="price"
                required
                >
        </div>
        <div class="form-group">
            <label for="description">Description:</label>
            <input
                v-model="editable.description"
                type="text"
                class="form-control"
                placeholder="Description..."
                name="description"
                id="description"
                >
        </div>
        <div class="form-group">
            <label for="img">Image:</label>
            <input
                v-model="editable.imgUrl"
                type="url"
                class="form-control"
                placeholder="https://imgurl.com"
                name="img"
                id="img"
                required
                >
        </div>

        <div class="d-flex justify-content-between my-3">
            <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                class="btn text-dark text-uppercase selectable"
            >
                <b> cancel </b>
            </button>
            <button
                v-if="!houseData.id"
                @click="createHouse"
                type="button"
                class="btn text-dark text-uppercase selectable"
            >
                <b> Create House </b>
            </button>
            <button
                v-else
                @click="editHouse"
                type="button"
                class="btn text-dark text-uppercase selectable"
            >
                <b> Edit House </b>
            </button>
        </div>
    </form>
</template>



<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router';
import { watchEffect } from '@vue/runtime-core';
import { logger } from '../utils/Logger';
import { housesService } from '../services/HousesService';
import { Modal } from 'bootstrap';
export default {
    props: {
        houseData: {
            type: Object,
            required: false,
            default: {}
        }
    },
    setup(props) {
        const editable = ref({});
        const router = useRouter();
        watchEffect(() => {
            logger.log('Watch Effect Triggured')
            editable.value = props.houseData
        });
        return {
            editable,
            async createHouse() {
                try {
                    let newHouse = await housesService.create(editable.value)
                    editable.value = {}
                    Modal.getOrCreateInstance(document.getElementById("form-modal")).hide();
                    router.push({name: "HouseDetails", params: {id: newHouse.id}})
                } catch (error) {
                    logger.log(error)
                }
            },
            async editHouse() {
                try {
                    await housesService.update(editable.value);
                    Modal.getOrCreateInstance(document.getElementById("form-modal")).hide();
                } catch (error) {
                    logger.log(error)
                }
            }
        }
    },
}
</script>