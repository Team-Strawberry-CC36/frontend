<script setup lang="ts">
    import type Place from '@/utils/interfaces/Place';

    defineProps<{
        placeDetails: Place;
    }>();

</script>

<template>
    <div>
        <section>
            <!-- Place Name + add Experiences button-->
        </section>
        <section>
            <!-- Filter Experiences section -->
        </section>
        <section>
            <!-- Repeated divs of experiences -->
        </section>
    </div>
</template>