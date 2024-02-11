<script setup>
import MainLayout from '../Layout/MainLayout.vue';
import dataProvince from '../assets/js/province'
import dataCity from '../assets/js/city'
import { ref, computed, reactive, watch } from 'vue';
import Modal from '../components/modal.vue';

const filtereData = reactive({
    province: dataProvince,
    city: dataCity,
})


//get province by cities province id
const modalCityData = ref({})
const modalProvinceData = ref({})
const searchQuery = ref('');
const searchQueryCity = ref('');
function getProvinceByCityId(cityId, provinceData) {
    const filteredProvince = provinceData.filter(province => province.id === cityId);
    modalCityData.value = filteredProvince
    return filteredProvince
}

//get cities by province id
function getCitiesByProvinceId(provinceId, citiesData) {
    const filteredCities = citiesData.filter(city => city.provinsi_id === provinceId);
    modalProvinceData.value = filteredCities
    return filteredCities;
}


const currentPageCity = ref(1);
const pageSizeCity = ref(5);
const totalCities = computed(() => dataCity.length);

const filteredCities = () => {
    const searchTerm = searchQueryCity.value.toLowerCase();
    if (searchTerm) {
        return filtereData.city = dataCity.filter(
            (city) =>
                city.name.toLowerCase().includes(searchTerm) ||
                city.provinsi_id.toString().includes(searchTerm)
        )
    } else {
        return filtereData.city = dataCity
    }
}

//paginate and sort nih
const startCity = computed(() => (currentPageCity.value - 1) * pageSizeCity.value);
const isDscCity = ref(false);
const isSortNameCity = ref(false);
const handleDscCity = () => {
    isDscCity.value = !isDscCity.value;
    filtereData.city.sort((a, b) => b.id - a.id);
}
const handleAscCity = () => {
    isDscCity.value = !isDscCity.value;
    filtereData.city.sort((a, b) => a.id - b.id);
}

const handleSortNameCity = () => {
    isSortNameCity.value = !isSortNameCity.value;
    if (isSortNameCity.value) {
        filtereData.city.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filtereData.city.sort((a, b) => b.name.localeCompare(a.name));
    }
}



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
//paginate and sort nih

const start = computed(() => (currentPage.value - 1) * pageSize.value);
const isDsc = ref(false);
const isSortName = ref(false);

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
//change tab nih
const isCityView = ref(true)
const handleButtonViewCity = () => {
    isCityView.value = true
    searchQueryCity.value = ''
    filteredCities()
}
const handleButtonViewProvince = () => {
    isCityView.value = false
    searchQuery.value = ''
    filteredProvinces()
}
//modal

const modalCity = ref(false)
const modalProvince = ref(false)
const closeModal = () => {
    modalCity.value = false
    modalProvince.value = false
}
const handleViewProvince = (selectedCityId, dataProvince) => {
    modalCity.value = true
    getProvinceByCityId(selectedCityId, dataProvince)
}

const handleViewCity = (selectedProviceId, dataCity) => {
    modalProvince.value = true
    getCitiesByProvinceId(selectedProviceId, dataCity)
}

watch(searchQueryCity, () => {
    currentPageCity.value = 1
    filteredCities()
})
watch(searchQuery, () => {
    currentPage.value = 1
    filteredProvinces()
})


</script>

<template>
    <MainLayout>
        <div class="container px-4 mx-auto">
            <div class="inline-flex gap-4 mb-4 rounded-md shadow-sm" role="group">
                <button type="button" @click="handleButtonViewCity"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    City View
                </button>
                <button type="button" @click="handleButtonViewProvince"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    Province View
                </button>
            </div>
            <h1 class="mb-3 text-3xl font-bold text-gray-900" v-if="!isCityView">List of Provinces</h1>
            <h1 class="mb-3 text-3xl font-bold text-gray-900" v-else>List of Cities</h1>
            <div class="mb-4" v-if="!isCityView">
                <input v-model="searchQuery" type="text" placeholder="Search provinces..."
                    class="w-full px-3 py-2 text-black bg-white border rounded-md text--700 grayborder-gray-300 focus:outline-none focus:ring ring-blue-500 focus:ring-opacity-50" />
            </div>
            <div class="mb-4" v-else>
                <input v-model="searchQueryCity" type="text" placeholder="Search cities..."
                    class="w-full px-3 py-2 text-black bg-white border rounded-md text--700 grayborder-gray-300 focus:outline-none focus:ring ring-blue-500 focus:ring-opacity-50" />
            </div>
            <div class="text-black bg-white rounded-lg shadow">
                <table class="w-full border border-gray-300" v-if="!isCityView">
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
                            <th class="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="province in filtereData.province.slice(start, start + pageSize)" :key="province.id">
                            <td class="px-4 py-2">{{ province.id }}</td>
                            <td class="px-4 py-2">{{ province.name }}</td>
                            <td class="px-4 py-2">{{ province.wilayah_id }}</td>
                            <td class="px-4 py-2"><button
                                    @click="handleViewCity(province.id, filtereData.city)"
                                    class="px-4 py-2 bg-white rounded-md shadow hover:border hover:border-gray-300">View
                                    Cities</button></td>
                        </tr>
                    </tbody>
                </table>
                <table class="w-full border border-gray-300" v-else>
                    <thead class="bg-gray-100">
                        <tr>
                            <th v-if="!isDscCity" class="flex justify-between px-4 py-2 text-left">
                                ID<span class="cursor-pointer" @click="handleDscCity">&#9660;</span>
                            </th>
                            <th v-else class="flex justify-between px-4 py-2 text-left">
                                ID<span class="cursor-pointer" @click="handleAscCity">&#9650;</span>
                            </th>
                            <th class="px-4 py-2 text-left">Ref ID</th>
                            <th v-if="!isSortNameCity" class="px-4 py-2 text-left">Name <span
                                    class="float-right ml-5 text-right cursor-pointer"
                                    @click="handleSortNameCity">&#9660;</span></th>
                            <th v-else class="px-4 py-2 text-left">Name <span
                                    class="float-right ml-5 text-right cursor-pointer"
                                    @click="handleSortNameCity">&#9650;</span></th>
                            <th class="px-4 py-2 text-left">Province ID</th>
                            <th class="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="cities in filtereData.city.slice(startCity, startCity + pageSizeCity)" :key="cities.id">
                            <td class="px-4 py-2">{{ cities.id }}</td>
                            <td class="px-4 py-2">{{ cities.ref_id }}</td>
                            <td class="px-4 py-2">{{ cities.name }}</td>
                            <td class="px-4 py-2">{{ cities.provinsi_id }}</td>
                            <td class="px-4 py-2"><button
                                    @click="handleViewProvince(cities.provinsi_id, filtereData.province)"
                                    class="px-4 py-2 bg-white rounded-md shadow hover:border hover:border-gray-300">View
                                    Province</button></td>
                        </tr>
                    </tbody>
                </table>

                <nav class="flex items-center justify-between px-5 py-3 mt-4" v-if="!isCityView">
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
                <nav class="flex items-center justify-between px-5 py-3 mt-4" v-else>
                    <span class="text-gray-700">
                        Showing {{ startCity + 1 }} - {{ Math.min(startCity + pageSizeCity, totalCities) }} of {{
                            totalCities }}
                        cities
                    </span>
                    <div class="flex items-center">
                        <button :disabled="currentPageCity === 1" @click="currentPageCity -= 1"
                            class="px-2 py-1 mr-2 text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                            Previous
                        </button>
                        <span class="px-2 py-1 mr-2 text-gray-700" v-if="searchQueryCity.length > 1">{{ currentPageCity = 1
                        }}</span>
                        <span class="px-2 py-1 mr-2 text-gray-700" v-else>{{ currentPageCity }}</span>
                        <button :disabled="currentPageCity === Math.ceil(totalCities / pageSizeCity)"
                            @click="currentPageCity += 1"
                            class="px-2 py-1 text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300">
                            Next
                        </button>
                    </div>
                </nav>
        </div>
    </div>
    <Modal :closeModal="closeModal" :isCity="isCityView" :isModalVisible="modalCity" :cityData="modalCityData" />
    <Modal :closeModal="closeModal" :isProvince="!isCityView" :isModalVisible="modalProvince" :provinceData="modalProvinceData" />
</MainLayout></template>