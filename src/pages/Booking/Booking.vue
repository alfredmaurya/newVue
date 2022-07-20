<template>
  <q-page :style="!isMobile ? 'padding-top: 70px' : ''">
    <q-page-sticky expand position="top" v-if="!isMobile">
      <q-toolbar class="bg-white text-dark q-pa-none" inset>
        <q-toolbar-title class="text-dark col-auto q-pa-sm">
          Booking
        </q-toolbar-title>
        <q-breadcrumbs class="text-grey col-auto" gutter="sm" separator="/">
          <q-breadcrumbs-el
            label="Dashboard"
            :to="{
              name: 'Homepage',
            }"
          />
          <q-breadcrumbs-el label="Booking" />
        </q-breadcrumbs>
      </q-toolbar>
    </q-page-sticky>

    <!--  class="flex flex-center" -->
    <div class="q-pa-md">
      <div class="booking-1">
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-5">
            <q-btn
              v-if="
                !park ||
                (park &&
                  ['sun-west', 'bud-s-place', 'el-dorado'].includes(park.slug))
              "
              unelevated
              no-caps
              :color="viewType == 'map' ? 'primary' : 'white'"
              :text-color="viewType == 'map' ? 'white' : 'primary'"
              @click="viewType = 'map'"
              :flat="viewType != 'map'"
              class="no-hover"
            >
              <q-icon name="map" class="q-mr-sm" />
              Map View
              <q-tooltip> Map View </q-tooltip>
            </q-btn>

            <q-btn
              unelevated
              no-caps
              :color="viewType == 'calendar' ? 'primary' : 'white'"
              :text-color="viewType == 'calendar' ? 'white' : 'primary'"
              @click="viewType = 'calendar'"
              :flat="viewType != 'calendar'"
              class="no-hover"
              ><q-icon name="edit_calendar" class="q-mr-sm" />
              Calendar View
              <q-tooltip> Calendar View </q-tooltip>
            </q-btn>
            <q-btn
              unelevated
              no-caps
              :color="viewType == 'table' ? 'primary' : 'white'"
              :text-color="viewType == 'table' ? 'white' : 'primary'"
              @click="viewType = 'table'"
              :flat="viewType != 'table'"
              class="no-hover"
              ><q-icon name="view_list" class="q-mr-sm" />
              Table View
              <q-tooltip> Table View </q-tooltip>
            </q-btn>
          </div>

          <div class="col-12 col-md-2">
            <div class="form-field q-pb-none" v-if="viewType == 'map' && park">
              <q-input
                outlined
                dense
                v-model="from_date"
                label="Start Date"
                lazy-rules
                mask="##/##/####"
                :rules="[
                  $rules.required(),
                  (value) => isValidDate(value) || 'Enter Valid Date',
                ]"
                class="q-px-sm table-controls no-wrap text-no-wrap"
                readonly
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      @before-show="updateProxy('from_date')"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="proxyDate"
                        range
                        mask="DD/MM/YYYY"
                        :options="currentDate"
                      >
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="save"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>

          <div class="col-12 col-md-2">
            <div class="form-field q-pb-none" v-if="viewType == 'map' && park">
              <q-input
                outlined
                dense
                v-model="to_date"
                label="End Date"
                lazy-rules
                mask="##/##/####"
                :rules="[
                  $rules.required(),
                  (value) => isValidDate(value) || 'Enter Valid Date',
                ]"
                class="q-px-sm table-controls no-wrap text-no-wrap"
                readonly
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      @before-show="updateProxy('to_date')"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="proxyDate"
                        range
                        mask="DD/MM/YYYY"
                        :options="endDisabled"
                      >
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancel"
                            color="primary"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="OK"
                            color="primary"
                            flat
                            @click="save"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="form-field q-pb-none" style="display: inline-flex">
              <q-select
                outlined
                v-model="park"
                label="Select Park*"
                lazy-rules
                :options="parkOptions"
                option-label="title"
                emit-value
                use-input
                @filter="filterPark"
                :loading="loadingParks"
                :disable="loadingParks"
                @input="onParkChange"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <span style="display: flex"
                ><q-btn
                  v-if="viewType == 'map' && park"
                  flat
                  dense
                  text-color="primary"
                  class="q-ml-sm no-hover table-controls"
                  style="marginleft: -8px !important"
                  no-caps
                  icon="refresh"
                  @click="updateEvent"
                >
                  <q-tooltip :disable="isMobile" v-close-popup>
                    Refresh
                  </q-tooltip>
                </q-btn></span
              >
            </div>
          </div>
        </div>

        <Map
          ref="visiMap"
          v-if="viewType == 'map' && park"
          :parkId="park.id"
          :park="park"
          :fromDate="from_date"
          :toDate="to_date"
        />
        <Table
          ref="visiTable"
          v-if="viewType == 'table' && park"
          :parkId="park.id"
        />
        <Calendar
          ref="visiCalendar"
          v-if="viewType == 'calendar' && park"
          :parkId="park.id"
        />

        <div class="empty" v-if="!park">
          <div class="empty-inner text-center">
            <img src="/empty-booking.png" alt="" />
            <h3 class="text-h6 text-dark q-mt-md">
              Please select Park & Accommodation To view Bookings.
            </h3>
          </div>
        </div>
      </div>
    </div>
    <AddUpdateEvent
      v-if="park"
      :parkId="park.id"
      :updateEvent="updateEvent"
      :accommodation="accommodation[park] || []"
      :clearSelection="clearSelection"
    />
    <Payment
      v-if="park"
      :parkId="park.id"
      :updateEvent="updateEvent"
      :accommodation="accommodation[park] || []"
      :clearSelection="clearSelection"
    />
    <Cancel
      v-if="park"
      :parkId="park.id"
      :updateEvent="updateEvent"
      :accommodation="accommodation[park] || []"
      :clearSelection="clearSelection"
    />
    <PaymentEdit
      v-if="park"
      :parkId="park.id"
      :updateEvent="updateEvent"
      :accommodation="accommodation[park] || []"
      :clearSelection="clearSelection"
    />
    <Detail />
    <DetailList/>
  </q-page>
</template>

<script>
import Map from './Map'
import Calendar from './Calendar'
import AddUpdateEvent from './add-update-event'
import Table from './Table'
import Payment from './payment'
import Detail from './detail'
import Cancel from './Cancel'
import DetailList from './DetailList'
import PaymentEdit from './PaymentEdit'
import { date } from 'quasar'

let endDate = new Date()
endDate.setDate(endDate.getDate() + 1)

console.log(endDate,"date")

function dateFormater(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('/')
}

export default {
  name: 'PageBooking',
  components: {
    Map,
    Table,
    Calendar,
    AddUpdateEvent,
    Detail,
    Payment,
    Cancel,
    DetailList,
    PaymentEdit,
  },
  data() {
    return {
      from_date: date.formatDate(new Date(), 'DD/MM/YYYY'),
      to_date: this.formatDate(endDate, 'DD/MM/YYYY'),
      proxyDate: '',
      park: '',
      viewType: 'map',
      parkOptions: [],
      parks: [],
      loadingParks: false,
      accommodation: {},
      currentDate(date) {
        if (localStorage.getItem('role') === 'super-admin') {
          return (
            date >= dateFormater(new Date()) || date <= dateFormater(new Date())
          )
        } else {
          return date >= dateFormater(new Date())
        }
      },
      endDisabled(date) {
        return date >= dateFormater(endDate)
      },
    }
  },

  created() {
    this.loadingParks = true

    this.$store.dispatch('common/getAllCustomers')

    this.$root.$on('customer-added-modified', () => {
      this.$store.dispatch('common/getAllCustomers')
    })

    this.$store
      .dispatch('parks/getListing', {
        pagination: 0,
      })
      .then((response) => {
        if (response.status && response.data)
          this.parks = this.parkOptions = response.data
      })
      .finally(() => {
        this.loadingParks = false
      })
  },
  methods: {
    // save() {
    //   if (this.proxyDate) {
    //     if (typeof this.proxyDate == 'object') this.model = this.proxyDate
    //     else {
    //       this.model = {
    //         from: this.proxyDate,
    //         to: date.formatDate(
    //           date.addToDate(this.proxyDate, { days: 1 }),
    //           'YYYY/MM/DD'
    //         ),
    //       }
    //     }
    //   }
    // },
    save(type) {
      console.log(type, 'type', this.proxyDate)
      if (this.proxyDate) {
        if (typeof this.proxyDate == 'object') {
          this.from_date = this.proxyDate.from
          this.to_date = this.proxyDate.to
        } else {
          this.from_date = this.proxyDate
          this.to_date = this.proxyDate
        }
      }
      // this[type] = this.proxyDate

      // if (this.from_date && this.to_date) {
      //   if (type == 'from_date') {
      //     let fromDate = this.from_date
      //     let fromDatesplit = fromDate.split('/')
      //     fromDate = new Date(
      //       `${fromDatesplit[2]}-${fromDatesplit[1]}-${fromDatesplit[0]}`
      //     )

      //     let endDate = this.to_date,
      //       endDatesplit = endDate.split('/')
      //     endDate = new Date(
      //       `${endDatesplit[2]}-${endDatesplit[1]}-${endDatesplit[0]}`
      //     )

      //     if (fromDate.getTime() - endDate.getTime() >= 0) {
      //       fromDate.setDate(fromDate.getDate() + 1)
      //       this.to_date = this.formatDate(fromDate, 'DD/MM/YYYY')
      //     }
      //   }

      //   if (type == 'to_date') {
      //     let toDate = this.to_date
      //     let toDatesplit = toDate.split('/')
      //     toDate = new Date(
      //       `${toDatesplit[2]}-${toDatesplit[1]}-${toDatesplit[0]}`
      //     )

      //     let fromDate = this.from_date,
      //       fromDatesplit = fromDate.split('/')
      //     fromDate = new Date(
      //       `${fromDatesplit[2]}-${fromDatesplit[1]}-${fromDatesplit[0]}`
      //     )

      //     if (toDate.getTime() - fromDate.getTime() <= 0) {
      //       toDate.setDate(fromDate.getDate() - 1)
      //       this.from_date = this.formatDate(toDate, 'DD/MM/YYYY')
      //     }
      //   }
      // }
    },
    updateProxy(type) {
      this.proxyDate = this[type]
    },
    updateEvent(booking) {
      if (this.$refs.visiCalendar && this.$refs.visiCalendar.updateEvent)
        this.$refs.visiCalendar.updateEvent(booking)

      if (this.$refs.visiTable && this.$refs.visiTable.updateEvent)
        this.$refs.visiTable.updateEvent(booking)

      if (this.$refs.visiMap && this.$refs.visiMap.updateEvent)
        this.$refs.visiMap.updateEvent(booking)
      else this.$refs.visiMap.updateEvent(booking)
    },
    clearSelection() {
      if (this.$refs.visiMap && this.$refs.visiMap.clearSelection)
        this.$refs.visiMap.clearSelection()
    },
    async onParkChange(val) {
      if (val && val.id) {
        this.hideShowFullSpinner(true)

        if (
          !['sun-west', 'bud-s-place', 'el-dorado'].includes(val.slug) &&
          this.viewType == 'map'
        ) {
          this.viewType = 'calendar'
          this.showError(`Map View is not available for ${val.title}`)
        }

        if (this.viewType == 'map') {
          if (this.$refs.visiMap) {
            this.$refs.visiMap.getBookings()
            this.$refs.visiMap.getMaintenanceList()
          }
        }

        await this.$store
          .dispatch('accommodation/getListing', {
            pagination: 0,
            park_id: val.id,
          })
          .then((response) => {
            if (response.status && response.data) {
              this.accommodation = {
                ...this.accommodation,
                [val]: response.data,
              }
            }
          })

        this.hideShowFullSpinner(false)
      }
    },
    filterPark(val, update) {
      let parks = this.parks

      if (val === '') {
        update(() => {
          this.parkOptions = parks
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.parkOptions = parks.filter(
          (park) => park.title.toLowerCase().indexOf(needle) > -1
        )
      })
    },
  },
}
</script>
<style lang="scss">
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    margin: 0;
    padding: 0;
  }
}
.booking-1 {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  .b1-i1 {
    background: $primary;
    padding: 5px;
    border-radius: 8px;
  }
  .b1-i2 {
    background: #fff;
    padding: 16px;
    border-radius: 4px;
  }
  .b1-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
    .b1-row--1 {
      flex: 10000 0 0;
    }
    .b1-way {
      background: #fff;
      flex: 0 0 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &.items-start {
        align-items: flex-start;
      }
      span {
        top: 50%;
        width: 200px;
        text-align: center;
      }
    }
  }
  .b1-row--1 {
    display: flex;
    flex-direction: row;

    li {
      border-bottom: 2px solid #fff;
      &:last-child {
        border-bottom: 0;
      }
    }
    .home--row {
      flex: 10000 0 0;
      position: relative;
      &[data-title] {
        &:before {
          content: attr(data-title);
          position: absolute;
          background: #fff;
          padding: 5px 10px;
          width: 80px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          transform: rotate(90deg) /* rtl:ignore */;
          top: 16px;
          left: -15px;
        }
      }
      li {
        &.isMaintenance {
          a {
            background: #070707 !important;
            border: #070707 !important;
          }
        }
        &.isBooked {
          a {
            background: #ff0000 !important;
            border: #ff0000 !important;
          }
        }
        &.selected {
          a {
            // border: 2px dotted black !important;
            border: 2px solid #ff0000 !important;
          }
        }
        a {
          display: block;
          background: #f0c066;
          height: 20px;

          &.deluxe {
            background: #f0c066;
          }
          &.standard-14 {
            background: #00a79e;
          }
          &.standard-12 {
            background: #f7941e;
          }
          &.standard-11 {
            background: #f15a29;
          }
          &.corporate {
            background: #b1b4b6;
          }
          &.container-studios {
            background: #4d9ad4;
            background: -moz-linear-gradient(
              top,
              #4d9ad4 0%,
              #4d9ad4 50%,
              #326891 50%,
              #326891 100%
            );
            background: -webkit-linear-gradient(
              top,
              #4d9ad4 0%,
              #4d9ad4 50%,
              #326891 50%,
              #326891 100%
            );
            background: linear-gradient(
              to bottom,
              #4d9ad4 0%,
              #4d9ad4 50%,
              #326891 50%,
              #326891 100%
            );
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4d9ad4', endColorstr='#326891',GradientType=0 );
          }
          &.modular-studios {
            background: #00a79e;
            background: -moz-linear-gradient(
              top,
              #00a79e 0%,
              #00a79e 50%,
              #007a72 50%,
              #007a72 100%
            );
            background: -webkit-linear-gradient(
              top,
              #00a79e 0%,
              #00a79e 50%,
              #007a72 50%,
              #007a72 100%
            );
            background: linear-gradient(
              to bottom,
              #00a79e 0%,
              #00a79e 50%,
              #007a72 50%,
              #007a72 100%
            );
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a79e', endColorstr='#007a72',GradientType=0 );
          }
          &.manufa-home {
            background: #da1c5c;
            background: -moz-linear-gradient(
              top,
              #da1c5c 0%,
              #da1c5c 50%,
              #9e1f63 50%,
              #9e1f63 100%
            );
            background: -webkit-linear-gradient(
              top,
              #da1c5c 0%,
              #da1c5c 50%,
              #9e1f63 50%,
              #9e1f63 100%
            );
            background: linear-gradient(
              to bottom,
              #da1c5c 0%,
              #da1c5c 50%,
              #9e1f63 50%,
              #9e1f63 100%
            );
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#da1c5c', endColorstr='#9e1f63',GradientType=0 );
          }

          &:hover {
            background: #79c143;
          }
        }
      }
    }
    .home--no {
      flex: 1 0 30px;
      text-align: center;
      border-left: 2px solid #fff;
      border-right: 2px solid #fff;
      li {
        border: none;
        &:last-child {
          a {
            height: 20px;
          }
        }
      }
      a {
        display: block;
        font-size: 11px;
        font-weight: bold;
        height: 22px;
        line-height: 20px;
        color: #fff;
        text-decoration: none;
      }
    }
    &.row--a {
      .home--row li a {
        height: 25px;
      }
      .home--no a {
        height: 27px;
      }
    }
  }
}
.rvs-rooms {
  li {
    margin: 5px 0;
    display: block;
    span {
      display: inline-block;
      width: 30px;
      height: 20px;
      vertical-align: middle;
      &.deluxe {
        background: #f0c066;
      }
      &.standard-14 {
        background: #00a79e;
      }
      &.standard-12 {
        background: #f7941e;
      }
      &.standard-11 {
        background: #f15a29;
      }
      &.corporate {
        background: #b1b4b6;
      }
      &.container-studios {
        background: #4d9ad4;
        background: -moz-linear-gradient(
          top,
          #4d9ad4 0%,
          #4d9ad4 50%,
          #326891 50%,
          #326891 100%
        );
        background: -webkit-linear-gradient(
          top,
          #4d9ad4 0%,
          #4d9ad4 50%,
          #326891 50%,
          #326891 100%
        );
        background: linear-gradient(
          to bottom,
          #4d9ad4 0%,
          #4d9ad4 50%,
          #326891 50%,
          #326891 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4d9ad4', endColorstr='#326891',GradientType=0 );
      }
      &.modular-studios {
        background: #00a79e;
        background: -moz-linear-gradient(
          top,
          #00a79e 0%,
          #00a79e 50%,
          #007a72 50%,
          #007a72 100%
        );
        background: -webkit-linear-gradient(
          top,
          #00a79e 0%,
          #00a79e 50%,
          #007a72 50%,
          #007a72 100%
        );
        background: linear-gradient(
          to bottom,
          #00a79e 0%,
          #00a79e 50%,
          #007a72 50%,
          #007a72 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a79e', endColorstr='#007a72',GradientType=0 );
      }
      &.manufa-home {
        background: #da1c5c;
        background: -moz-linear-gradient(
          top,
          #da1c5c 0%,
          #da1c5c 50%,
          #9e1f63 50%,
          #9e1f63 100%
        );
        background: -webkit-linear-gradient(
          top,
          #da1c5c 0%,
          #da1c5c 50%,
          #9e1f63 50%,
          #9e1f63 100%
        );
        background: linear-gradient(
          to bottom,
          #da1c5c 0%,
          #da1c5c 50%,
          #9e1f63 50%,
          #9e1f63 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#da1c5c', endColorstr='#9e1f63',GradientType=0 );
      }
    }
  }
}
.empty {
  margin-top: 25px;
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 14px;
  color: #314154;
}
// .empty p {
//   font-size: 18px;
// }
</style>
