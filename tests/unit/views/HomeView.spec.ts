import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../../../src/views/HomeView.vue";
import Experiences from "../../../src/views/Experiences.vue";

const routes = [{ path: "/experiences", component: Experiences }];

describe("HomeView.vue", () => {
    it("renders Google Map placeholder and router-link correctly", async () => {
        const router = createRouter({
            history: createWebHistory(),
            routes,
        });

        vi.mock("../../../src/views/Experiences.vue", () => ({
            default: { template: "<div>Experiences View</div>" }
        }));

        // Mount the component
        const wrapper = mount(HomeView, {
            global: {
                plugins: [router],
            },
            props: {
                place_name: "Test place",
                general_info: "Some general info",
                guide: "Some guide info",
                etiquette: "Some etiquette info"
            }
        });

        await router.isReady();

        expect(wrapper.find("#mock-map").exists()).toBe(true);

        expect(wrapper.find(".place-name").text()).toBe("Test place");
        expect(wrapper.find(".general-info").text()).toBe("Some general info");
        expect(wrapper.find(".guide").text()).toBe("Some guide info");
        expect(wrapper.find(".etiquette").text()).toBe("Some etiquette info");

        // Check router-link renders correctly
        const routerLink = wrapper.find("a");
        expect(routerLink.text()).toBe("Experiences");
        expect(routerLink.attributes("href")).toBe("/experiences");

        // Simulate navigation
        await routerLink.trigger("click");
        expect(router.currentRoute.value.path).toBe("/experiences");
    });
});