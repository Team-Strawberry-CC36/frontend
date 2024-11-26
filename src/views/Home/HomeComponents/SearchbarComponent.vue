<script setup lang="ts">
    import { usePlaceStore } from '@/stores/PlaceStore';
    const place = usePlaceStore();
    place.useMock();
</script>

<template>
    <div>
        <input type="search" />
    </div>
</template>