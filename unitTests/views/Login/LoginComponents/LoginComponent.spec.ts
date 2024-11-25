import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginComponent from '../../../../src/views/Login/LoginComponents/LoginComponent.vue';
import { signInThroughFirebase } from '../../../../src/utils/auth';

describe('LoginComponent.vue Test', () => {

    let wrapper: any;
    vi.mock('../../../../src/utils/auth', () => (
        {
            signInThroughFirebase: vi.fn(),
        }
    ));

    beforeEach(() => {
        wrapper = mount(LoginComponent, {
            global: {
                components: {
                    RouterLink: {
                        props: ['to'],
                        template: '<a :href="to"><slot /></a>', // this is a mock for the RouterLink
                    },
                },
            },
        });
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders with initial elements expected by the user', () => {
        // Check for the main div container
        expect(wrapper.find('.flex').exists()).toBe(true);
        expect(wrapper.find('.flex-col').exists()).toBe(true);

        // Check for heading text
        const spanText = wrapper.find('span').text();
        expect(spanText).toMatch('Login with your Japuri account');

        // Check the form exists
        const form = wrapper.find('form');
        expect(form.exists()).toBe(true);

        // Check that there are two inputs
        const inputs = wrapper.findAll('input');
        expect(inputs.length).toEqual(2);

        // Check that inputs have correct types
        expect(inputs.at(0).attributes('type')).toBe('email');
        expect(inputs.at(1).attributes('type')).toBe('password');

        // Check that inputs have correct placeholders
        expect(inputs.at(0).attributes('placeholder')).toBe('Email');
        expect(inputs.at(1).attributes('placeholder')).toBe('Password');

        // Check that there is a submit button
        const submitButton = wrapper.find('button');
        expect(submitButton.exists()).toBe(true);
        expect(submitButton.text()).toBe('Login');

        // Check for the RouterLink to sign up
        const routerLink = wrapper.findComponent({ name: 'RouterLink' });
        expect(routerLink.exists()).toBe(true);
        expect(routerLink.attributes('href')).toBe('/signup');
        expect(routerLink.text()).toBe("Don't have an account? Sign up!");
    });

    it('binds input fields correctly and calls signInThroughFirebase', async () => {
        const wrapper = mount(LoginComponent);

        const emailInput = wrapper.find('input[type="email"]');
        const passwordInput = wrapper.find('input[type="password"]');
        const form = wrapper.find('form');

        // Simulate user typing into the input fields
        await emailInput.setValue('test@example.com');
        await passwordInput.setValue('password123');

        // Assert that the local refs are updated
        expect((emailInput.element as HTMLInputElement).value).toBe('test@example.com');
        expect((passwordInput.element as HTMLInputElement).value).toBe('password123');

        await form.trigger('submit.prevent');
        expect(signInThroughFirebase).toHaveBeenCalledWith('test@example.com', 'password123');
    });
})