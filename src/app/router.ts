import { myClient } from '@/main';
import { getMovieById } from '@/services/movies.service';
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
    component: () => import('./routes/index.vue'),
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
    component: () => import('./routes/about.vue'),
    meta: {
      layout: 'LoggedLayout',
      requireAuth: true,
    },
  },
  {
    name: 'planets',
    path: '/planets',
    component: () => import('./routes/(planets)/planet.vue'),
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
    path: '/movies',
    children: [
      {
        name: 'list_movies',
        path: '',
        component: () => import('./routes/movies/index.vue'),
        beforeEnter: async (
          to: RouteLocationNormalized,
          from: RouteLocationNormalizedLoaded,
          next: NavigationGuardNext,
        ) => {
          //  await usePlanetStore().getData();
          /* usePlanetStore().$subscribe((mutation) => {
                console.log(mutation);
              });*/
          // if (useMovieStore().movies.length === 0) await useMovieStore().getData();
          next();
        },
      },
      {
        name: 'create_movie',
        path: '/create',
        component: () => import('./routes/movies/create.vue'),
      },
      {
        name: 'update_movie',
        path: '/update/:id',
        component: () => import('../views/EditMovie.vue'),
      },
    ],
  },

  {
    name: 'encore_planets',
    path: '/encore-planets',
    component: () => import('../views/PlanetViewTanstack.vue'),
  },
  {
    path: '/movies/edit/:id',
    name: 'edit_movie',
    component: () => import('../views/EditMovie.vue'),
    beforeEnter: async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalizedLoaded,
      next: NavigationGuardNext,
    ) => {
      const data = await myClient.prefetchQuery({
        queryKey: ['movie', to.params.id],
        queryFn: () => getMovieById(to.params.id as string),
      });
      /*  if (data.error) {
        next({ name: 'list_movies' });
      }*/
      next();
    },
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
