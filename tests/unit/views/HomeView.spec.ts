import { mount } from '@vue/test-utils'; // Use Vue Test Utils to mount components
import { describe, it, expect } from 'vitest'; // Vitest for assertions
import HomeView from '../../../src/views/HomeView.vue'; // Adjust path as needed
import Navbar from '../../../src/components/HomeView/Navbar.vue'; 
import GoogleMap from '../../../src/components/HomeView/GoogleMap.vue';
import PlaceInfo from '../../../src/components/HomeView/PlaceInfo.vue';

describe('HomeView', () => {
  it('renders Navbar, GoogleMap, and PlaceInfo components', () => {
    // Mount the HomeView component
    const wrapper = mount(HomeView);

    // Check that Navbar, GoogleMap, and PlaceInfo are rendered
    expect(wrapper.findComponent(Navbar).exists()).toBe(true);
    expect(wrapper.findComponent(GoogleMap).exists()).toBe(true);
    expect(wrapper.findComponent(PlaceInfo).exists()).toBe(true);
  });
});