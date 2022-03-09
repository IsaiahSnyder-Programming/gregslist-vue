
<template>
    <router-link :to="{name: 'HouseDetails', params: {id: house.id}}">
        <div class="house row p-3 bg-light rounded shadow selectable">
            <div class="col-12">
                <img :src="house.imgUrl" alt="" class="img-fluid" />
            </div>
            <h3 class="text-center col-12">
                ${{house.price}}
            </h3>
            <p class="text-left col-12">
                {{house.description}}
            </p>
        </div>
    </router-link>
</template>


<script>
export default {
    props: {
        house: {
            type: Object,
            required: true
        }
    },
    setup() {
        return {}
    },
}
</script>


<style lang="scss" scoped>
.house {
    transition: all 0.2s ease;
}
.house:hover {
    transform: scale(1.03);
}
</style>