import { mount } from '@vue/test-utils'; // Use Vue Test Utils to mount components
import { describe, it, expect } from 'vitest'; // Vitest for assertions
import Navbar from '../../../src/components/HomeView/Navbar.vue'; // Adjust path as needed

describe('Navbar', () => {
  it('renders the logo, search input, and username with links', () => {
    const wrapper = mount(Navbar);

    // Check that the logo is rendered correctly
    const logo = wrapper.find('div.text-xl');
    expect(logo.exists()).toBe(true);
    //expect(logo.text()).toBe('LOGO HERE');

    // Check that the search input is rendered and has the correct placeholder
    const searchInput = wrapper.find('input[type="text"]');
    expect(searchInput.exists()).toBe(true);
    expect(searchInput.attributes('placeholder')).toBe('Search...');

    // Check that the username is rendered
    const username = wrapper.find('span.font-medium');
    expect(username.exists()).toBe(true);
    expect(username.text()).toBe('Username');

    // Check that the Dashboard and Logout links are rendered
    const dashboardLink = wrapper.find('a[href="/dashboard"]');
    expect(dashboardLink.exists()).toBe(true);
    expect(dashboardLink.text()).toBe('Dashboard');

    const logoutLink = wrapper.find('a[href="/logout"]');
    expect(logoutLink.exists()).toBe(true);
    expect(logoutLink.text()).toBe('Logout');
  });

  it('applies the correct classes to the outer elements', () => {
    const wrapper = mount(Navbar);

    // Check that the outer nav has the correct classes
    const nav = wrapper.find('nav');
    expect(nav.classes()).toContain('flex');
    expect(nav.classes()).toContain('items-center');
    expect(nav.classes()).toContain('justify-between');
    expect(nav.classes()).toContain('p-4');
    expect(nav.classes()).toContain('bg-gray-100');
    expect(nav.classes()).toContain('border-b');
    expect(nav.classes()).toContain('border-gray-300');

    // Check that the input field has the expected classes
    const input = wrapper.find('input[type="text"]');
    expect(input.classes()).toContain('flex-grow');
    expect(input.classes()).toContain('mx-4');
    expect(input.classes()).toContain('p-2');
    expect(input.classes()).toContain('border');
    expect(input.classes()).toContain('border-gray-300');
    expect(input.classes()).toContain('rounded');
  });

  it('renders the correct link hrefs for Dashboard and Logout', () => {
    const wrapper = mount(Navbar);

    // Check that the Dashboard link has the correct href
    const dashboardLink = wrapper.find('a[href="/dashboard"]');
    expect(dashboardLink.exists()).toBe(true);
    expect(dashboardLink.attributes('href')).toBe('/dashboard');

    // Check that the Logout link has the correct href
    const logoutLink = wrapper.find('a[href="/logout"]');
    expect(logoutLink.exists()).toBe(true);
    expect(logoutLink.attributes('href')).toBe('/logout');
  });
});
