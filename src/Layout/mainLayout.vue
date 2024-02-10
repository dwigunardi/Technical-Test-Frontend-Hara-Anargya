<script setup>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';


</script>

<template>
    <Sidebar>
        <Navbar />
        <div class="w-full px-10 mt-20">
            <slot></slot>
        </div>
    </Sidebar>
</template>