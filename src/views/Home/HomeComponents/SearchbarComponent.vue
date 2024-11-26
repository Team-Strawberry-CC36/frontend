<script setup lang="ts">
    import { usePlaceStore } from '@/stores/PlaceStore';
    const place = usePlaceStore();
    place.useMock();

    const handleSearch = () => {

    }
</script>

<template>
    <div class="flex flex-row justify-center m-1">
        <input type="search" placeholder="Search for a place" class="border border-charcoal w-4/5 h-10 p-3 mr-1 rounded-xl focus:outline-none bg-mist focus:bg-white text-center text-sm lg:text-2xl"/>
        <button @click="handleSearch" class="border border-charcoal w-1/5 rounded-xl bg-charcoal text-white hover:cursor-pointer hover:bg-white hover:text-charcoal">Search</button>
    </div>
</template>