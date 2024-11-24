import { mount } from '@vue/test-utils'; // Use Vue Test Utils to mount components
import { describe, it, expect } from 'vitest'; // Vitest for assertions
import GoogleMap from '../../../src/components/HomeView/GoogleMap.vue'; // Adjust path as needed

describe('GoogleMap', () => {
  it('renders iframe with correct src attribute', () => {
    // Mount the GoogleMap component
    const wrapper = mount(GoogleMap);

    // Get the iframe element inside the mounted component
    const iframe = wrapper.find('iframe');

    // Check if the iframe exists
    expect(iframe.exists()).toBe(true);

    // Check if the iframe has the correct `src` attribute
    const expectedSrc = `https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_KEY}&center=26.5667,127.9833&zoom=15`;
    expect(iframe.attributes('src')).toBe(expectedSrc);
  });

  it('contains the iframe with the correct classes', () => {
    // Mount the GoogleMap component
    const wrapper = mount(GoogleMap);

    // Get the iframe element
    const iframe = wrapper.find('iframe');

    // Check that the iframe has the correct classes
    expect(iframe.classes()).toContain('h-full');
    expect(iframe.classes()).toContain('w-full');
    expect(iframe.classes()).toContain('border-none');
  });

  // Optionally, you could test the presence of the container divs, but this is less important
  it('has the correct outer container structure', () => {
    const wrapper = mount(GoogleMap);

    const outerDiv = wrapper.find('div');

    // Check that outer div has the expected classes
    expect(outerDiv.classes()).toContain('flex');
    expect(outerDiv.classes()).toContain('justify-center');
    expect(outerDiv.classes()).toContain('items-center');
    expect(outerDiv.classes()).toContain('bg-gray-200');
    expect(outerDiv.classes()).toContain('h-full');
    expect(outerDiv.classes()).toContain('border-r');
    expect(outerDiv.classes()).toContain('border-gray-300');

  });
});
