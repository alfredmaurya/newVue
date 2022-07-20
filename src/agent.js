import { Requests } from 'src/boot/axios'

export const DashboardAgent = {
  get: (param) => Requests.get('/dashboard', param),
}

export const AuthAgent = {
  logIn: (body) => Requests.post('/login', body),
  getCurrentEmployee: () => Requests.get('/currentEmployee'),
  forgotPassword: (body) => Requests.post('/forgotpassword', body),
  verifyResetPasswordToken: (restToken) =>
    Requests.post(`resetpassword/verify/${restToken}`),
  resetpassword: (restToken, body) =>
    Requests.post(`resetpassword/${restToken}`, body),
}

export const LocationAgent = {
  get: (param) => Requests.get('/location', param),
  add: (body) => Requests.post('/location', body),
  update: (body) => Requests.put(`/location/${body.id}`, body),
  show: (id) => Requests.get(`/location/${id}`),
  delete: (id) => Requests.del(`/location/${id}`),
  detail: (id) => Requests.get(`/location/${id}`),
}

export const CustomersAgent = {
  get: (param) => Requests.get('/customers', param),
  add: (body) => Requests.post('/customers', body),
  update: (body) => Requests.put(`/customers/${body.id}`, body),
  delete: (id) => Requests.del(`/customers/${id}`),
  detail: (id) => Requests.get(`/customers/${id}`),
}

export const EmployeeAgent = {
  get: (param) => Requests.get('/employee', param),
  add: (body) => Requests.post('/employee', body),
  update: (body) => Requests.put(`/employee/${body.id}`, body),
  delete: (id) => Requests.del(`/employee/${id}`),
  detail: (id) => Requests.get(`/employee/${id}`),
}

export const RoleAgent = {
  get: (param) => Requests.get('/role', param),
  add: (body) => Requests.post('/role', body),
  update: (body) => Requests.put(`/role/${body.id}`, body),
  delete: (id) => Requests.del(`/role/${id}`),
  detail: (id) => Requests.get(`/role/${id}`),
  getPermissions: () => Requests.get(`/modules`),
}

export const FacilityAgent = {
  get: (param) => Requests.get('/facility', param),
  add: (body) => Requests.post('/facility', body),
  update: (body) => Requests.put(`/facility/${body.id}`, body),
  delete: (id) => Requests.del(`/facility/${id}`),
  detail: (id) => Requests.get(`/facility/${id}`),
}

export const TaxAgent = {
  get: (param) => Requests.get('/tax', param),
  add: (body) => Requests.post('/tax', body),
  update: (body) => Requests.put(`/tax/${body.id}`, body),
  delete: (id) => Requests.del(`/tax/${id}`),
  detail: (id) => Requests.get(`/tax/${id}`),
}

export const ParkAgent = {
  get: (param) => Requests.get('/park', param),
  add: (body) => Requests.post('/park', body),
  update: (body) => Requests.put(`/park/${body.id}`, body),
  delete: (id) => Requests.del(`/park/${id}`),
  detail: (id) => Requests.get(`/park/${id}`),
}

export const AccommodationAgent = {
  get: (param) => Requests.get('/accommodation', param),
  add: (body) => Requests.post('/accommodation', body),
  update: (body) => Requests.put(`/accommodation/${body.id}`, body),
  delete: (id) => Requests.del(`/accommodation/${id}`),
  detail: (id) => Requests.get(`/accommodation/${id}`),
}

export const AccommodationTypeAgent = {
  get: (param) => Requests.get('/accommodation_type', param),
  add: (body) => Requests.post('/accommodation_type', body),
  update: (body) => Requests.put(`/accommodation_type/${body.id}`, body),
  delete: (id) => Requests.del(`/accommodation_type/${id}`),
  detail: (id) => Requests.get(`/accommodation_type/${id}`),
}

export const BookingAgent = {
  get: (param) => Requests.get('/bookings', param),
  add: (param) => Requests.post('/bookings', param),
  calculatePrice: (param) => Requests.post('/bookings/calculate/price', param),
  detail: (id) => Requests.get(`/bookings/${id}`),
  updateBookingPayment: (id,param) => Requests.post(`/bookings/update/payment/${id}`, param),
  triggerMail:(param)=>Requests.get('/mail',param),
  cancelBooking:(id,param) => Requests.post(`/bookings/update/cancel/${id}`, param),
}

export const CrudAgent = {
  get: (url, params) => Requests.get(url, params),
  add: (url, body) => Requests.post(url, body),
  update: (url, id, body) => Requests.put(`${url}/${id}`, body),
  delete: (url, id) => Requests.del(`${url}/${id}`),
  detail: (url, id) => Requests.get(`${url}/${id}`),
}
