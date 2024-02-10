<template>
    <div class="overflow-hidden border-2 border-gray-300 shadow rounded-xl ">
        <div class="p-6 bg-white ">
            <div class="flex justify-between">
                <h5 class="text-[16px] text-[#727272] font-bold">{{ props.title }}</h5>
                <TransferIcon />
            </div>
            <div class="w-full mb-5">
                <h3 class="text-[24px] font-bold text-black" v-if="isFloat">{{ props.value.toLocaleString('id-ID').split(',')[0] }}<span class="text-[#9A9A9A]">,{{ parseFloat(props.value).toFixed(2).split('.')[1] }}</span></h3>
                <h3 class="text-[24px] font-bold text-black" v-else>{{ props.value.toLocaleString('id-ID') }}</h3>
            </div>
        </div>
        <div class="w-full bg-[#F9FAFC] flex items-center px-5 h-[50px]">
            <div class="flex justify-between w-full">
                <div class="flex gap-0 font-bold">
                    <div v-if="isIncrease">
                        <ArrowUp />
                    </div>
                    <div v-else>
                        <ArrowDown />
                    </div>
                    <span v-if="isIncrease" class="text-[#4CBF93] text-[12px]">{{ props.percentage.toFixed(2) }}%</span>
                    <span v-else class="text-[#EE7C85] text-[12px]">{{ props.percentage.toFixed(2) }}%</span>
                    <span class="text-[#AAAAAA] text-[12px] ml-3">Last month</span>
                </div>
                <div>
                    <h3 class="text-[12px] font-semibold text-[#6E6E6E]">View More</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TransferIcon from '../icon/TransferIcon.vue';
import ArrowDown from '../icon/arrowdown.vue';
import ArrowUp from '../icon/arrowUp.vue';
import {computed} from 'vue'
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: 'null',
    },
    value: {
        type: Number || String,
        default: 0,
    },
    isIncrease: {
        type: Boolean,
        default: true,
    },
    isDecrease: {
        type: Boolean,
        default: false,
    },
    percentage: Number
})

const isFloat = computed(() => {
  return props.value.toLocaleString('id-ID').includes(',');
});


</script>