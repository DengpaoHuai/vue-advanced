import { describe, expect, it, vi } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';

import useFetch from '../useFetch';
import { flushPromises, mount } from '@vue/test-utils';

describe('useFetch', () => {
  it('fetches data', async () => {
    vi.useFakeTimers();

    const fakePlanets = [
      {
        name: 'Tatooine',
        population: 200000,
      },
      {
        name: 'Alderaan',
        population: 4000000000,
      },
    ];

    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => fakePlanets,
    } as Response);

    const TestComponent = defineComponent({
      setup() {
        const url = ref('https://swapi.dev/api/toto/');
        const { data, loading, error } = useFetch(url);
        return { data, loading, error };
      },
      template: `
        <div>
          <div
          data-testid="loading"
          v-if="loading">Loading...</div>
          <div v-if="error">{{ error.message }}</div>
          <ul v-if="data">
            <li v-for="planet in data">{{ planet.name }}</li>
          </ul>
        </div>
      `,
    });

    const wrapper = mount(TestComponent);

    expect(wrapper.html()).toContain('Loading...');
    //expect(wrapper.get('[data-testid="loading"]').exists()).toBe(true);
    expect(wrapper.html()).not.toContain('Tatooine');

    await vi.advanceTimersByTimeAsync(2500);

    // await nextTick();

    await flushPromises();

    expect(wrapper.html()).not.toContain('Loading...');
    expect(wrapper.html()).toContain('Tatooine');
    expect(wrapper.html()).toContain('Alderaan');
    // expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/');
  });
});
