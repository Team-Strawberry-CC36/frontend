<script setup lang="ts">
    import { usePlaceStore } from '@/stores/PlaceStore';
    import { ref } from 'vue';
    const place = usePlaceStore();
    place.useMock();

    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const searchQuery = ref('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`${apiUrl}/search`, {
                method: 'POST',
                headers: {
                    'Contents-type': 'application/json',
                },
                body: JSON.stringify({
                    query: searchQuery.value,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Search request failed: ', error);
        }
};
</script>

<template>
    <div class="flex flex-row justify-center m-1">
        <input v-model="searchQuery" type="search" placeholder="Search for a place" class="border border-charcoal w-4/5 h-10 p-3 mr-1 rounded-xl focus:outline-none bg-mist focus:bg-white text-center text-sm lg:text-2xl"/>
        <button @click="handleSearch" class="border border-charcoal w-1/5 rounded-xl bg-charcoal text-white hover:cursor-pointer hover:bg-white hover:text-charcoal">Search</button>
    </div>
</template>