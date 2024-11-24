<template>
    <div class="p-4 bg-gray-50 flex flex-col gap-4 h-full">
        <h2 class="text-2xl font-bold">{{ placeName }}</h2>
        <p>{{ generalInfo }}</p>
        <a :href="guideLink" class="text-blue-600 hover:underline">Guide</a>
        <p>{{ etiquette }}</p>
        <a :href="experiencesLink" class="text-blue-600 hover:underline">Experiences</a>
    </div>
</template>

<script>
export default {
    name: "PlaceInfo",
    props: {
      placeName: {
        type: String,
        default: "Name of Place"
      },
      generalInfo: {
        type: String,
        default: "General info placeholder - may need to change TYPE depending on JSON received from database"
      },
      etiquette: {
        type: String,
        default: "Etiquette placeholder needs to change TYPE depending on JSON received back from database"
      },
      experiencesId: {
        type: Number,
        default: null
      },
    },
    computed: {
      guideLink() {
        return `/guide`;
      },
      experiencesLink() {
        return this.experiencesId ? `/experiences?id=${this.experiencesId}` : "/experiences"
      }
    }
};
</script>