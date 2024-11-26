import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ExperiencesComponent from '../../../../src/views/Experiences/ExperiencesComponents/ExperiencesComponent.vue';
import { usePlaceStore } from '../../../../src/stores/PlaceStore';

// Mock the `usePlaceStore`
vi.mock('../../../../src/stores/PlaceStore', () => ({
    usePlaceStore: vi.fn(),
}));

describe('ExperiencesComponent.vue Test', () => {
    let wrapper: any;
    let mockPlaceStore: any;

    beforeEach(() => {
        // Mock state
        mockPlaceStore = {
            useMock: vi.fn(),
            details: {
                name: 'Mock Place',
                photos: [{ fileData: 'mock-photo-url' }],
                experiences: [
                    { id: 1, etiquette: 'No smoking', experience: 'Love smoking!', username: 'User1', dateVisited: '2024-11-25' },
                    { id: 2, etiquette: 'No tattoos', experience: 'I wish we could have tattoos!', username: 'User2', dateVisited: '2024-11-20' },
                    { id: 3, etiquette: 'No swimming', experience: 'I wish there was water!', username: 'User3', dateVisited: '2024-11-15' },
                ],
            },
        };

        // Mock implementation for `usePlaceStore`

        wrapper = mount(ExperiencesComponent, {
            
        });
    });

    afterEach(() => {
        wrapper.unmount();
        vi.clearAllMocks();
    });

    it('renders the place details correctly', () => {
        
    });

    it('filters experiences by etiquette', async () => {
        
    });

    it('emits toggleAddExperience when button is clicked', async () => {
        
    });

    it('renders all unique etiquettes in the dropdown', () => {
        
    });
});
