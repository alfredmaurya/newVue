import { BookingAgent } from 'src/agent'

export async function getBooking({}, params = {}) {
  try {
    let { data } = await BookingAgent.get(params)
    return data
  } catch (error) {
    return error
  }
}

export async function addUpdate({}, body = {}) {
  try {
    let { data } = await BookingAgent.add(body)
    return data
  } catch (error) {
    return error
  }
}



export async function calculatePrice({}, body = {}) {
  try {
    let { data } = await BookingAgent.calculatePrice(body)
    return data
  } catch (error) {
    return error
  }
}

export async function detailById({}, id) {
  try {
    let { data } = await BookingAgent.detail(id)
    return data
  } catch (error) {
    return error
  }
}

export async function updateBookingPayment({}, param) {
  try {
    let { data } = await BookingAgent.updateBookingPayment(param.id,param)
    return data
  } catch (error) {
    return error
  }
}
export async function triggerMail({}, param) {
  try {
    let { data } = await BookingAgent.triggerMail(param)
    return data
  } catch (error) {
    return error
  }
}
export async function cancelBooking({}, param) {
  try {
    let { data } = await BookingAgent.cancelBooking(param.id,param)
    return data
  } catch (error) {
    return error
  }
} 
