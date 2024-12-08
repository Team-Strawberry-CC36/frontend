import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { IPlaceMarker } from '@/services/api.service';
import type { IPlaceType } from '@/utils/interfaces/Place';

export const useSearchStore = defineStore(
  'searchStore',
  () => {
    const data = reactive<{
      search: string;
      markers: IPlaceMarker[];
      category: IPlaceType;
    }>({
      search: '',
      markers: [],
      category: 'onsen',
    });

    function updateSearch(text: string) {
      data.search = text;
    }

    function updateMarkers(markers: IPlaceMarker[]) {
      data.markers = [...markers];
    }

    function updateCategory(category: IPlaceType) {
      data.category = category;
    }

    return { data, updateMarkers, updateSearch, updateCategory };
  },
  {
    persist: true,
  },
);
