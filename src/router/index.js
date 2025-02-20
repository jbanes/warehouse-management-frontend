import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AuthLayout,
      meta: {
        title: `${import.meta.env.VITE_APP_NAME} - Home`,
      },
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        }
      ]
    },
    {
      path: '/barang',
      redirect: { name: 'barang.index' },
      name: 'barang',
      component: AuthLayout,
      meta: {
        title: `${import.meta.env.VITE_APP_NAME} - Products`
      },
      children: [
        {
          path: '',
          name: 'barang.index',
          component: () => import('@/views/barang/Index.vue'),
        },
        {
          path: '/barang/create',
          name: 'barang.create',
          component: () => import('@/views/barang/Create.vue'),
          meta: {
            title: `${import.meta.env.VITE_APP_NAME} - Add Product`
          }
        },
        {
          path: '/barang/:id/edit',
          name: 'barang.edit',
          component: () => import('@/views/barang/Edit.vue'),
          meta: {
            title: `${import.meta.env.VITE_APP_NAME} - Edit Product`
          }
        },
      ]
    },
    {
      path: '/pengirim',
      name: 'pengirim',
      component: AuthLayout,
      children: [
        {
          path: '', component: () => import('@/views/pengirim/Index.vue'),
          name: 'pengirim.index',
          meta: {
            title: `${import.meta.env.VITE_APP_NAME} - Pengirim`
          },
        },
        {
          path: '/pengirim/create',
          name: 'pengirim.create',
          component: () => import('@/views/pengirim/Create.vue'),
          meta: {
            title: `${import.meta.env.VITE_APP_NAME} - Tambah Pengirim`
          }
        },
        {
          path: '/pengirim/:id/edit',
          name: 'pengirim.edit',
          component: () => import('@/views/pengirim/Edit.vue'),
          meta: {
            title: `${import.meta.env.VITE_APP_NAME} - Edit Pengirim`
          }
        },
        {
          path: '/pengirim/:id/shipping',
          name: 'pengirim.shipping',
          component: () => import('@/views/pengirim/Shipping.vue'),
        }
      ]
    },
    {
      path: '/ship/:type',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'ship.form',
          component: () => import('@/views/ship/Form.vue'),
          meta: {
            title: `${import.meta.env.VITE_APP_NAME} - Form Pengiriman`
          },
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Get the page title from the route meta data that we have defined
  // See further down below for how we setup this data
  const title = to.meta.title

  //Take the title from the parameters
  const titleFromParams = to.params.pageTitle;
  // If the route has a title, set it as the page title of the document/page
  if (title) {
    document.title = title
  }
  // If we have a title from the params, extend the title with the title
  // from our params
  if (titleFromParams) {
    document.title = `${titleFromParams} - ${document.title}`;
  }
  // Continue resolving the route
  next()
})

export default router
