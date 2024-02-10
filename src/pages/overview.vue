<script setup>
import MainLayout from '../Layout/MainLayout.vue';
import dataProvince from '../assets/js/province'
import dataCity from '../assets/js/city'
import { ref, computed, reactive, watch } from 'vue';

const filtereData = reactive({
    province: dataProvince,
})
function getCitiesByProvinceId(provinceId, citiesData) {
    const filteredCities = citiesData.filter(city => city.provinsi_id === provinceId);
    return filteredCities;
}
const selectedProvinceId = 1;
const citiesForProvince = getCitiesByProvinceId(selectedProvinceId, dataCity);


citiesForProvince.forEach(city => {
    console.log(`City name: ${city.name}`);
});

const currentPage = ref(1);
const pageSize = ref(5);
const totalProvinces = computed(() => dataProvince.length);

const filteredProvinces = () => {
    const searchTerm = searchQuery.value.toLowerCase();
    if (searchTerm) {
        return filtereData.province = dataProvince.filter(
            (province) =>
                province.name.toLowerCase().includes(searchTerm) ||
                province.wilayah_id.toString().includes(searchTerm)
        );
    } else {
        return filtereData.province = dataProvince
    }
}


const start = computed(() => (currentPage.value - 1) * pageSize.value);
const isDsc = ref(false);
const isSortName = ref(false);
const searchQuery = ref('');
const handleDsc = () => {
    isDsc.value = !isDsc.value;
    filtereData.province.sort((a, b) => b.id - a.id);
}
const handleASC = () => {
    isDsc.value = !isDsc.value;
    filtereData.province.sort((a, b) => a.id - b.id);
}
const handleSortName = () => {
    isSortName.value = !isSortName.value;
    if (isSortName.value) {
        filtereData.province.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filtereData.province.sort((a, b) => b.name.localeCompare(a.name));
    }
}
watch(searchQuery, () => {
    currentPage.value = 1
    filteredProvinces()
})
</script>

<template>
    <MainLayout>
        <div class="container px-4 mx-auto">
            <div class="mb-4">
                <input v-model="searchQuery" type="text" placeholder="Search provinces..."
                    class="w-full px-3 py-2 text-black bg-white border rounded-md text--700 grayborder-gray-300 focus:outline-none focus:ring ring-blue-500 focus:ring-opacity-50" />
            </div>
            <div class="text-black bg-white rounded-lg shadow">
                <table class="w-full border border-gray-300">
                    <thead class="bg-gray-100">
                        <tr>
                            <th v-if="!isDsc" class="flex justify-between px-4 py-2 text-left">
                                ID<span class="cursor-pointer" @click="handleDsc">&#9660;</span>
                            </th>
                            <th v-else class="flex justify-between px-4 py-2 text-left">
                                ID<span class="cursor-pointer" @click="handleASC">&#9650;</span>
                            </th>
                            <th v-if="!isSortName" class="px-4 py-2 text-left">Name <span
                                    class="float-right ml-5 text-right cursor-pointer"
                                    @click="handleSortName">&#9660;</span></th>
                            <th v-else class="px-4 py-2 text-left">Name <span
                                    class="float-right ml-5 text-right cursor-pointer"
                                    @click="handleSortName">&#9650;</span></th>
                            <th class="px-4 py-2 text-left">Region ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="province in filtereData.province.slice(start, start + pageSize)" :key="province.id">
                            <td class="px-4 py-2">{{ province.id }}</td>
                            <td class="px-4 py-2">{{ province.name }}</td>
                            <td class="px-4 py-2">{{ province.wilayah_id }}</td>
                        </tr>
                    </tbody>
                </table>

                <nav class="flex items-center justify-between px-5 py-3 mt-4">
                    <span class="text-gray-700">
                        Showing {{ start + 1 }} - {{ Math.min(start + pageSize, totalProvinces) }} of {{ totalProvinces }}
                        provinces
                    </span>
                    <div class="flex items-center">
                        <button :disabled="currentPage === 1" @click="currentPage -= 1"
                            class="px-2 py-1 mr-2 text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                            Previous
                        </button>
                        <span class="px-2 py-1 mr-2 text-gray-700" v-if="searchQuery.length > 1">{{ currentPage = 1
                        }}</span>
                        <span class="px-2 py-1 mr-2 text-gray-700" v-else>{{ currentPage }}</span>
                        <button :disabled="currentPage === Math.ceil(totalProvinces / pageSize)" @click="currentPage += 1"
                            class="px-2 py-1 text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                            Next
                        </button>
                    </div>
                </nav>
        </div>
    </div>
</MainLayout></template>