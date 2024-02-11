<script setup>
import { computed, watch } from 'vue'
const propsModal = defineProps({
    isModalVisible: {
        type: Boolean,
        default: false
    },
    closeModal: Function,
    dataModal: {
        type: Object,
        default: {
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
            profile_picture: '',
        }
    },
    isCity: {
        type: Boolean,
        default: false
    },
    cityData: {
        type: Object,
        default: {}
    },
    isProvince: {
        type: Boolean,
        default: false
    },
    provinceData: {
        type: Object,
        default: {}
    },
    isDashboard: {
        type: Boolean,
        default: false
    }
})

watch(() => propsModal.provinceData, (initial, final) => {
    console.log(propsModal.provinceData, 'ini province data')
})

watch(() => propsModal.cityData, (initial, final) => {
    console.log(propsModal.cityData, 'ini city data')
})

</script>
<template>
    <transition>
        <div v-if="propsModal.isModalVisible && propsModal.isDashboard">
            <div @click="propsModal.closeModal"
                class="fixed inset-0 top-0 bottom-0 z-10 h-full min-h-screen overflow-auto bg-[#D9D9D9] opacity-70">
            </div>
            <div v-if="propsModal.isDashboard"
                class="fixed top-[30%] left-[40%] z-20 w-[555px] h-[436px] p-3 mx-auto my-auto bg-white shadow-lg rounded-xl">
                <div class="flex justify-end">
                    <div class="w-5 h-2 text-2xl text-red-500 cursor-pointer hover::border-red-500 hover::border-2"
                        @click="propsModal.closeModal">x</div>
                </div>
                <div class="z-20 flex flex-wrap items-center justify-center gap-5 p-4 mt-5">
                    <img :src="propsModal.dataModal.profile_picture" alt="user picture"
                        class="w-[150px] h-[150px] rounded-full">
                    <div class="flex flex-col gap-3">
                        <h1 class="text-[40px] font-bold text-[#080808]">{{ propsModal.dataModal.first_name + ' ' +
                            propsModal.dataModal.last_name }}</h1>
                        <h1 class="text-[20px] font-bold text-[#080808]">{{ propsModal.dataModal.email }}</h1>
                        <h1 class="text-[20px] font-bold text-[#080808]">{{ propsModal.dataModal.phone }}</h1>
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <transition>
        <div v-if="propsModal.isCity && propsModal.isModalVisible">
            <div @click="propsModal.closeModal"
                class="fixed inset-0 top-0 bottom-0 z-10 h-full min-h-screen overflow-auto bg-[#D9D9D9] opacity-70">
            </div>

            <div class="fixed top-[30%] left-[40%] z-20 w-[555px] p-3 mx-auto my-auto bg-white shadow-lg rounded-xl">
                <div class="flex justify-end">
                    <div class="w-5 h-2 text-2xl text-red-500 cursor-pointer hover::border-red-500 hover::border-2"
                        @click="propsModal.closeModal">x</div>
                </div>
                <div class="flex flex-col flex-wrap gap-3 p-5 mt-8" v-for="province in propsModal.cityData">
                    <h1 class="text-3xl text-black">Kota Ini Berada di provinsi {{
                        province.name }}</h1>
                    <h1 class="text-3xl text-black">dengan Id {{
                        province.id }}</h1>
                    <h1 class="text-3xl text-black">Dan wilayah id {{
                        province.wilayah_id }}</h1>
                </div>
                <div class="flex w-full p-5">
                    <button @click="propsModal.closeModal"
                        class="w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600">Close</button>
                </div>
            </div>
        </div>
    </transition>
    <transition>
        <div v-if="propsModal.isProvince && propsModal.isModalVisible">
            <div @click="propsModal.closeModal"
                class="fixed inset-0 top-0 bottom-0 z-10 h-full min-h-screen overflow-auto bg-[#D9D9D9] opacity-70">
            </div>


            <div
                class="fixed top-[20%] left-[40%] z-20 w-[555px] h-[536px] p-3 mx-auto my-auto bg-white shadow-lg rounded-xl overflow-auto">
                <div class="flex justify-end">
                    <div class="w-5 h-2 text-2xl text-red-500 cursor-pointer hover::border-red-500 hover::border-2"
                        @click="propsModal.closeModal">x</div>
                </div>
                <div class="flex flex-col flex-wrap gap-3 p-5 mt-8">
                    <h1 class="text-3xl text-black">Provinsi Ini Memiliki beberapa kota</h1>
                    <div class="flex flex-col flex-wrap gap-3">
                        <h1 class="text-base text-black" v-for="city in propsModal.provinceData">{{ city.name + ',' +
                            city.id +
                            ',' + city.ref_id }}</h1>
                    </div>
                </div>
                <div class="flex justify-end p-5">
                    <button @click="propsModal.closeModal"
                        class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600">Close</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>