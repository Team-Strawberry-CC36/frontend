import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ExperiencesComponent from '../../../../src/views/Experiences/ExperiencesComponents/ExperiencesComponent.vue';

describe('ExperiencesComponent.vue Test', () => {

    let wrapper: any;

    beforeEach(() => {
        wrapper = mount(ExperiencesComponent, {

        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders with initial elements expected by the user', () => {

    });
})