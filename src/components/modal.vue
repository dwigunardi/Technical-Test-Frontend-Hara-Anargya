<script setup>
import { computed } from 'vue'
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
    }
})
</script>
<template>
    <transition>
            <div v-if="propsModal.isModalVisible">
                <div @click="propsModal.closeModal"
                    class="fixed inset-0 top-0 bottom-0 z-10 h-full min-h-screen overflow-auto bg-[#D9D9D9] opacity-70">
                </div>
                <div
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
</template>