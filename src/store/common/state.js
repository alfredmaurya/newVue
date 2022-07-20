export default function () {
  return {
    themeApplied: true,
    enterClass: '',
    leaveClass: '',
    themeOptions: {
      1: {
        bodyClass: 'body--light',
        icon: 'brightness_6',
        name: 'Light',
      },
      2: {
        bodyClass: 'body--dark',
        icon: 'nights_stay',
        name: 'Dark',
      },
      3: {
        bodyClass: 'body--light-white',
        icon: 'wb_sunny',
        name: 'White',
      },
    },
    locations: [],
    roles: [],
    employees: [],
    facilitys: [],
    customers: [],
    accommodation: [],
    accommodationType: [],
  }
}
