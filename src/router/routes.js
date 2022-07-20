const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'Homepage',
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          pageTitle: 'Home',
        },
      },
      {
        name: 'Locations',
        path: '/location/:id?',
        component: () => import('src/pages/location/Locations.vue'),
        meta: {
          pageTitle: 'Locations',
          permission: ['location_view'],
        },
        props: true,
      },
      {
        name: 'Accommodation',
        path: '/accommodation/:id?',
        component: () => import('pages/Accommodation.vue'),
        meta: {
          pageTitle: 'Accommodation',
          permission: ['accommodation_view'],
        },
      },
      {
        name: 'AccommodationType',
        path: '/accommodation-type/:id?',
        component: () => import('pages/AccommodationType.vue'),
        meta: {
          pageTitle: 'Accommodation Type',
          permission: ['accommodation_type_view'],
        },
      },
      {
        name: 'Maintenance',
        path: '/maintenance',
        component: () => import('pages/Maintenance/Index.vue'),
        meta: {
          pageTitle: 'Accommodation Maintenance',
          permission: ['accommodation_type_maintenance_view'],
        },
      },
      {
        name: 'Customer',
        path: '/customer/:id?',
        component: () => import('src/pages/Customer/Index.vue'),
        meta: {
          pageTitle: 'Customer',
          permission: ['customer_type_view'],
        },
        props: true,
      },

      {
        name: 'Employee',
        path: '/employee/:id?',
        component: () => import('pages/Employee.vue'),
        meta: {
          pageTitle: 'Employee',
          permission: ['employee_view'],
        },
      },
      {
        name: 'Park',
        path: '/park/:id?',
        component: () => import('pages/Park.vue'),
        meta: {
          pageTitle: 'Park',
          permission: ['park_view'],
        },
      },
      {
        name: 'Facility',
        path: '/facility/:id?',
        component: () => import('pages/Facility.vue'),
        meta: {
          pageTitle: 'Facility',
          permission: ['facility_view'],
        },
      },
      {
        name: 'Role',
        path: '/role/:id?',
        component: () => import('src/pages/Role.vue'),
        meta: {
          pageTitle: 'Role',
          permission: ['role_view'],
        },
      },
      {
        name: 'Tax',
        path: '/tax/:id?',
        component: () => import('pages/Tax.vue'),
        meta: {
          pageTitle: 'Tax',
          permission: ['facility_view'],
        },
      },
      {
        name: 'Booking',
        path: '/booking',
        component: () => import('src/pages/Booking/Booking.vue'),
        meta: {
          pageTitle: 'Booking',
          permission: ['booking_view'],
        },
      },
      {
        name: 'BudsMap',
        path: '/budsmap',
        component: () => import('pages/Budsmap.vue'),
        meta: {
          pageTitle: 'Buds Map',
        },
      },
      {
        name: 'SunWest',
        path: '/sunwest',
        component: () => import('src/pages/SunWest.vue'),
        meta: {
          pageTitle: 'Sun West',
        },
      },
      {
        name: 'ELDoradoPage',
        path: '/eldoradopage',
        component: () => import('pages/ELDorado-page.vue'),
        meta: {
          pageTitle: 'EL Dorado Map',
        },
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('pages/Login.vue'),
        meta: {
          pageTitle: 'Login',
        },
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('pages/ForgotPassword.vue'),
        meta: {
          pageTitle: 'Forgot Password',
        },
      },
      {
        path: '/reset-password/:restToken',
        name: 'ResetPassword',
        props: true,
        component: () => import('pages/ResetPassword.vue'),
        meta: {
          pageTitle: 'Reset Password',
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
