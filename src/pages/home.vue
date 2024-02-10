<script setup>
import { ref, onMounted, reactive, watch } from 'vue'
import MainLayout from '../Layout/MainLayout.vue';
import DashboardCard from '../components/Card/dashboardCard.vue';
import axios from 'axios';
import dayjs from 'dayjs';


const dataCard = [
    {
        title: 'Pending',
        value: 2480.30,
        isIncrease: true,
        isDecrease: false,
        percentage: 2.15,
    },
    {
        title: 'Paid',
        value: 84310,
        isIncrease: false,
        isDecrease: true,
        percentage: 1.10,
    },
    {
        title: 'Rejected',
        value: 12155,
        isIncrease: true,
        isDecrease: false,
        percentage: 2.15,
    }
]

const dataState = reactive({
    users: [],
    message: '',
    isLoading: false,
    total_users: 0,
    page: 1,
    limit: 6,
    offset: 0,
    error: false,
})

const dataModal = reactive({
    users: {},
})

const isModalVisible = ref(false)

async function getData() {
    dataState.isLoading = true
    try {
        const res = await axios.get(`https://api.slingacademy.com/v1/sample-data/users?limit=${dataState.limit}&offset=${dataState.offset}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'GET',
        })
        dataState.message = await res.data.message
        dataState.total_users = await res.data.total_users
        dataState.limit = await res.data.limit
        dataState.offset = await res.data.offset
        dataState.total_pages = await res.data.total_pages
        dataState.users = await res.data.users
    } catch (error) {
        dataState.error = error
    } finally {
        dataState.isLoading = false
    }
}

onMounted(() => {
    getData()
})

const handleDetail = (id) => {
    console.log(id)
    const findDetail = dataState.users.find(user => user.id === id)
    isModalVisible.value = true
    dataModal.users = findDetail
    console.log(dataModal.users)
}

const closeModal = () => {
    isModalVisible.value = false
}

</script>

<template>
    <MainLayout>
        <div class="flex flex-col w-full h-full gap-5">
            <div class="grid w-full grid-cols-3 gap-4 mt-4">
                <div v-for="(card, index) in dataCard" :key="index">
                    <DashboardCard :title="card.title" :isIncrease="card.isIncrease" :percentage="card.percentage"
                        :value="card.value" />
                </div>
            </div>
            <div class="box-border w-full h-full mt-4 overflow-hidden border-2 border-gray-300 rounded-lg shadow">
                <div class="p-6 bg-white">
                    <h1 class="text-[24px] font-bold text-[#080808]">User List</h1>
                </div>
                <div class="overflow-x-auto ">
                    <table class="w-full text-sm text-left text-gray-500 table-auto rtl:text-right dark:text-gray-400"
                        style="border-radius: 50%;">
                        <thead class="text-base text-[#7C7C7C] uppercase bg-[#FAFBFC]">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    User
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Date Of Birth
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Job
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Contry
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-justify bg-white border-b" v-for="(data, index) in dataState.users"
                                :key="index">
                                <td scope="row" class="px-6 py-4 font-medium text-[#686868] whitespace-nowrap">
                                    {{ data.id }}
                                </td>
                                <td class="flex flex-wrap items-center gap-3 px-6 py-4">
                                    <img :src="data.profile_picture" alt="user picture" class="w-10 h-10 rounded-full">
                                    <span class="font-semibold text-[#080808] whitespace-nowrap">{{ data.first_name + ' ' +
                                        data.last_name }}</span>
                                </td>
                                <td class="px-6 py-4 font-semibold text-[#686868] whitespace-nowrap">
                                    {{ dayjs(data.date_of_birth).format('DD / MM / YYYY') }}
                                </td>
                                <td class="px-6 py-4 font-semibold text-[#080808] whitespace-nowrap">
                                    {{ data.email }}
                                </td>
                                <td class="px-6 py-4 font-semibold text-[#686868] whitespace-nowrap">
                                    {{ data.job }}
                                </td>
                                <td class="px-6 py-4 font-semibold text-[#080808] whitespace-nowrap">
                                    {{ data.country }}
                                </td>
                                <td
                                    class="px-6 py-4 font-semibold text-[#080808] whitespace-nowrap flex justify-start gap-3">
                                    <button
                                        class="px-4 py-2 bg-white rounded-md shadow hover:border hover:border-gray-300">Select</button>
                                    <button class="px-4 py-2 bg-white rounded-md shadow hover:border hover:border-gray-300"
                                        @click="handleDetail(data.id)">View Detail</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <transition>
            <div v-if="isModalVisible">
                <div @click="closeModal"
                    class="fixed inset-0 top-0 bottom-0 z-10 h-full min-h-screen overflow-auto bg-[#D9D9D9] opacity-70">
                </div>
                <div
                    class="fixed top-[30%] left-[40%] z-20 w-[555px] h-[436px] p-3 mx-auto my-auto bg-white shadow-lg rounded-xl">
                    <div class="flex justify-end">
                        <div class="w-5 h-2 text-2xl text-red-500 cursor-pointer hover::border-red-500 hover::border-2"
                            @click="closeModal">x</div>
                    </div>
                    <div class="z-20 flex flex-wrap items-center justify-center gap-5 p-4 mt-5">
                        <img :src="dataModal.users.profile_picture" alt="user picture"
                            class="w-[150px] h-[150px] rounded-full">
                        <div class="flex flex-col gap-3">
                            <h1 class="text-[40px] font-bold text-[#080808]">{{ dataModal.users.first_name + ' ' +
                                dataModal.users.last_name }}</h1>
                            <h1 class="text-[20px] font-bold text-[#080808]">{{ dataModal.users.email }}</h1>
                            <h1 class="text-[20px] font-bold text-[#080808]">{{ dataModal.users.phone }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </MainLayout>
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