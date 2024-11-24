import { mount } from '@vue/test-utils'; // Use Vue Test Utils to mount components
import { describe, it, expect } from 'vitest'; // Vitest for assertions
import PlaceInfo from '../../../src/components/HomeView/PlaceInfo.vue'; // Adjust path as needed

describe('PlaceInfo', () => {
  it('renders the correct place name, general info, and etiquette', () => {
    const wrapper = mount(PlaceInfo, {
      props: {
        placeName: 'Paris',
        generalInfo: 'Capital city of France.',
        etiquette: 'Respect the local customs.'
      }
    });

    // Check that the props are rendered correctly
    expect(wrapper.find('h2').text()).toBe('Paris');
    expect(wrapper.find('p').text()).toContain('Capital city of France.');
    expect(wrapper.findAll('p').at(1).text()).toContain('Respect the local customs.');
  });

  it('renders default props when no props are passed', () => {
    const wrapper = mount(PlaceInfo);

    // Check that default values are rendered when no props are passed
    expect(wrapper.find('h2').text()).toBe('Name of Place');
    expect(wrapper.find('p').text()).toContain('General info placeholder');
    expect(wrapper.findAll('p').at(1).text()).toContain('Etiquette placeholder');
  });

  it('renders the correct links for guide and experiences', () => {
    const wrapper = mount(PlaceInfo, {
      props: {
        experiencesId: 123
      }
    });

    // Check that the guide link is correct
    const guideLink = wrapper.find('a[href="/guide"]');
    expect(guideLink.exists()).toBe(true);
    expect(guideLink.text()).toBe('Guide');

    // Check that the experiences link is correct with an ID query parameter
    const experiencesLink = wrapper.find('a[href="/experiences?id=123"]');
    expect(experiencesLink.exists()).toBe(true);
    expect(experiencesLink.text()).toBe('Experiences');
  });

  it('renders the experiences link correctly when experiencesId is not provided', () => {
    const wrapper = mount(PlaceInfo);

    // Check that the experiences link does not contain the query parameter
    const experiencesLink = wrapper.find('a[href="/experiences"]');
    expect(experiencesLink.exists()).toBe(true);
    expect(experiencesLink.text()).toBe('Experiences');
  });

  it('renders the correct class names for the outer div and child elements', () => {
    const wrapper = mount(PlaceInfo);

    // Check that the outer div has the expected classes
    const outerDiv = wrapper.find('div');
    expect(outerDiv.classes()).toContain('p-4');
    expect(outerDiv.classes()).toContain('bg-gray-50');
    expect(outerDiv.classes()).toContain('flex');
    expect(outerDiv.classes()).toContain('flex-col');
    expect(outerDiv.classes()).toContain('gap-4');
    expect(outerDiv.classes()).toContain('h-full');

    // Check that the h2 has the correct classes
    const h2 = wrapper.find('h2');
    expect(h2.classes()).toContain('text-2xl');
    expect(h2.classes()).toContain('font-bold');
  });
});
