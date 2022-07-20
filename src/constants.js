export const commonMixinConstants = {
  scrollAreaVisible: true,
  scrollAreaThumbStyle: {
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#b7b7b7',
    width: '5px',
    opacity: 1,
    zIndex: 9999,
  },
  scrollAreaBarStyle: {
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#e5e5e5',
    width: '9px',
    opacity: 1,
    zIndex: 9999,
  },
}

export const defaultPagination = {
  page: 1,
  rowsPerPage: 10,
  rowsNumber: null,
  hasNext: true,
}

export const sidebarLinks = [
  {
    title: 'Home',
    icon: 'dashboard',
    link: {
      name: 'Homepage',
    },
    exact: true,
    permission: ['dashboard_view'],
  },
  {
    title: 'Customer',
    icon: 'people',
    link: {
      name: 'Customer',
    },
    exact: false,
    permission: ['customer_view'],
  },
  {
    title: 'Employee',
    icon: 'manage_accounts',
    link: {
      name: 'Employee',
    },
    exact: false,
    permission: ['employee_view'],
  },
  {
    title: 'User Access',
    icon: 'settings_accessibility',
    link: {
      name: 'Role',
    },
    exact: false,
    permission: ['role_view'],
  },
  {
    title: 'Locations',
    icon: 'location_on',
    link: {
      name: 'Locations',
    },
    exact: false,
    permission: ['location_view'],
  },
  {
    title: 'Park',
    icon: 'park',
    link: {
      name: 'Park',
    },
    exact: false,
    permission: ['park_view'],
  },
  {
    title: 'Facility',
    icon: 'park',
    link: {
      name: 'Facility',
    },
    exact: false,
    permission: ['facility_view'],
  },
  {
    title: 'Tax',
    icon: 'park',
    link: {
      name: 'Tax',
    },
    exact: false,
    permission: ['tax_view'],
  },
  {
    title: 'Accommodation',
    icon: 'apartment',
    // link: {
    //   name: 'Accommodation',
    // },
    permission: ['accommodation_view', 'accommodation_type_view'],
    children: [
      {
        title: 'All Accommodation',
        // icon: 'apartment',
        link: {
          name: 'Accommodation',
        },
        exact: false,
        permission: ['accommodation_view'],
      },
      {
        title: 'Accommodation Type',
        link: {
          name: 'AccommodationType',
        },
        exact: false,
        permission: ['accommodation_type_view'],
      },
      {
        title: 'Maintenance',
        link: {
          name: 'Maintenance',
        },
        exact: false,
        permission: ['accommodation_type_maintenance_view'],
      },
    ],
    // exact: false,
  },
  {
    title: 'Booking',
    icon: 'book',
    link: {
      name: 'Booking',
    },
    exact: false,
    permission: ['booking_view'],
  },
]
