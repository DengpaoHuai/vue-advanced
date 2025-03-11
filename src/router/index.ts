import useMovieStore from '@/stores/useMovieStore';
import usePlanetStore from '@/stores/usePlanetStore';
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
} from 'vue-router';

const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
    beforeEnter: async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
      next: NavigationGuardNext,
    ) => {
      //  await usePlanetStore().getData();
      /* usePlanetStore().$subscribe((mutation) => {
        console.log(mutation);
      });*/
      next();
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      layout: 'LoggedLayout',
      requireAuth: true,
    },
  },
  {
    name: 'planets',
    path: '/planets',
    component: () => import('../views/PlanetView.vue'),
    beforeEnter: async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
      next: NavigationGuardNext,
    ) => {
      await waitFor(2000);
      const response = await fetch('https://swapi.dev/api/planets/');
      const data = await response.json();
      console.log(data);
      to.meta.planets = data.results;
      next();
    },
  },
  {
    name: 'planetSuspense',
    path: '/planets-suspense',
    component: () => import('../views/PlanetViewSuspense.vue'),
  },
  {
    name: 'planetReactive',
    path: '/planets-reactive',
    component: () => import('../views/PlanetViewReactive.vue'),
  },
  {
    name: 'list_movies',
    path: '/movies',
    component: () => import('../views/ListMovie.vue'),
    beforeEnter: async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
      next: NavigationGuardNext,
    ) => {
      //  await usePlanetStore().getData();
      /* usePlanetStore().$subscribe((mutation) => {
        console.log(mutation);
      });*/
      if (useMovieStore().movies.length === 0) await useMovieStore().getData();
      next();
    },
  },
  {
    name: 'create_movie',
    path: '/movies/create',
    component: () => import('../views/CreateMovie.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !localStorage.getItem('token')) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
