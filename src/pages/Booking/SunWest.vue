<template>
  <div class="b1-i1">
    <div class="q-pa-md q-mb-sm" style="background: wheat">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-3">
          <h3 class="q-my-none text-subtitle2 text-uppercase">RVS</h3>
          <ul class="rvs-rooms">
            <li> <span class="deluxe q-mr-sm"></span> DELUXE 16’ </li>
            <li> <span class="standard-14 q-mr-sm"></span> STANDARD 14’ </li>
            <li> <span class="standard-12 q-mr-sm"></span> STANDARD 12’ </li>
            <li> <span class="standard-11 q-mr-sm"></span> STANDARD 11’ </li>
          </ul>
        </div>
        <div class="col-12 col-md-3">
          <h3 class="q-my-none text-subtitle2 text-uppercase">Cabins</h3>
          <ul class="rvs-rooms">
            <li> <span class="corporate q-mr-sm"></span> Corporate </li>
            <li>
              <span class="container-studios q-mr-sm"></span> Container Studios
            </li>
            <li>
              <span class="modular-studios q-mr-sm"></span> Modular Studios
            </li>
            <li>
              <span class="manufa-home q-mr-sm"></span> Manufactured Home
            </li>
          </ul>
        </div>

        <div class="col-12 col-md-3">
          <ul class="rvs-rooms">
            <li> <span class="q-mr-sm bg-red"></span>Booked </li>
            <li>
              <span class="q-mr-sm bg-dark"></span>
              Maintenance
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="b1-i2 b1-flex" @click="mapClick">
      <div class="b1-row--1">
        <ul class="home--row" data-title="ROW K">
          <li
            v-for="n in 32"
            :key="n"
            data-acc="sunwest-rvs"
            :data-acc-type="`deluxe-16-row-k-room-${n}`"
            :class="getBookingClass(`deluxe-16-row-k-room-${n}`)"
          >
            <a href="javascript:void(0);">
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Deluxe Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
        <ul class="home--no">
          <li v-for="n in 32" :key="n">
            <a href="javascript:void(0);">{{ n }}</a>
          </li>
        </ul>
        <ul class="home--row" data-title="ROW J">
          <li
            v-for="n in 32"
            :key="n"
            data-acc="sunwest-rvs"
            :data-acc-type="`deluxe-16-row-j-room-${n}`"
            :class="getBookingClass(`deluxe-16-row-j-room-${n}`)"
          >
            <a
              href="javascript:void(0);"
              :class="n === 19 ? 'standard-12' : n === 32 ? 'standard-11' : ''"
            >
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Deluxe Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
      </div>
      <div class="b1-way">
        <q-icon color="grey-5" size="24px" name="sync_alt" class="rotate-90" />
      </div>
      <div class="b1-row--1">
        <ul class="home--row" data-title="ROW I">
          <li
            v-for="n in 32"
            :key="n"
            data-acc="sunwest-rvs"
            :data-acc-type="`deluxe-16-row-i-room-${n}`"
            :class="getBookingClass(`deluxe-16-row-i-room-${n}`)"
          >
            <a href="javascript:void(0);">
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Deluxe Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
        <ul class="home--no">
          <li v-for="n in 32" :key="n"
            ><a href="javascript:void(0);">{{ n }}</a></li
          >
        </ul>
        <ul class="home--row" data-title="ROW H">
          <li
            v-for="n in 32"
            :key="n"
            data-acc="sunwest-rvs"
            :data-acc-type="`deluxe-16-row-h-room-${n}`"
            :class="getBookingClass(`deluxe-16-row-h-room-${n}`)"
          >
            <a href="javascript:void(0);">
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Deluxe Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
      </div>
      <div class="b1-way">
        <q-icon color="grey-5" size="24px" name="sync_alt" class="rotate-90" />
      </div>
      <div class="b1-row--1">
        <ul class="home--row" data-title="ROW G">
          <li
            v-for="n in 32"
            :key="n"
            data-acc="sunwest-rvs"
            :data-acc-type="`deluxe-16-row-g-room-${n}`"
            :class="getBookingClass(`deluxe-16-row-g-room-${n}`)"
          >
            <a href="javascript:void(0);">
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Deluxe Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
        <ul class="home--no">
          <li v-for="n in 32" :key="n">
            <a href="javascript:void(0);">{{ n }}</a>
          </li>
        </ul>
        <ul class="home--row" data-title="ROW F">
          <li
            v-for="n in 32"
            :key="n"
            data-acc="sunwest-rvs"
            :data-acc-type="`deluxe-16-row-f-room-${n}`"
            :class="getBookingClass(`deluxe-16-row-f-room-${n}`)"
          >
            <a href="javascript:void(0);">
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Deluxe Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
      </div>
      <div class="b1-way items-start">
        <q-icon color="grey-5" size="24px" name="sync_alt" class="rotate-90" />
        <q-icon
          color="grey-5"
          size="24px"
          name="sync_alt"
          class="absolute-bottom rotate-90"
        />
        <span class="absolute rotate-90">WILLOW ST</span>
      </div>
      <div class="b1-row--1">
        <ul class="home--row" data-title="ROW E">
          <li
            v-for="n in 32"
            :key="n"
            data-acc="sunwest-rvs"
            :data-acc-type="`deluxe-16-row-e-room-${n}`"
            :class="getBookingClass(`deluxe-16-row-e-room-${n}`)"
          >
            <a href="javascript:void(0);">
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Deluxe Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
        <ul class="home--no">
          <li v-for="n in 32" :key="n"
            ><a href="javascript:void(0);">{{ n }}</a></li
          >
        </ul>
        <ul class="home--row" data-title="ROW D">
          <li
            v-for="n in 32"
            :key="n"
            data-acc="sunwest-rvs"
            :data-acc-type="`deluxe-16-row-d-room-${n}`"
            :class="getBookingClass(`deluxe-16-row-d-room-${n}`)"
          >
            <a href="javascript:void(0);">
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Deluxe Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
      </div>
      <div class="b1-way">
        <q-icon color="grey-5" size="24px" name="sync_alt" class="rotate-90" />
      </div>
      <div class="b1-row--1 row--a">
        <ul class="home--row" data-title="ROW C">
          <li v-for="n in 26" :key="n">
            <a
              href="javascript:void(0);"
              data-acc="sunwest-cabins"
              :data-acc-type="`corporate-row-c-room-${n}`"
              :class="[
                n === 15
                  ? 'modular-studios'
                  : n === 16
                  ? 'modular-studios'
                  : n === 17
                  ? 'modular-studios'
                  : 'corporate',
                getBookingClass(`corporate-row-c-room-${n}`),
              ]"
            >
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Corporate Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
        <ul class="home--no">
          <li v-for="n in 26" :key="n"
            ><a href="javascript:void(0);">{{ n }}</a></li
          >
        </ul>
        <ul class="home--row" data-title="ROW B">
          <li
            v-for="n in 26"
            :key="n"
            data-acc="sunwest-cabins"
            :data-acc-type="`corporate-row-b-room-${n}`"
            :class="getBookingClass(`corporate-row-b-room-${n}`)"
          >
            <a href="javascript:void(0);" class="corporate">
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Corporate Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
      </div>
      <div class="b1-way items-start">
        <q-icon color="grey-5" size="24px" name="sync_alt" class="rotate-90" />
        <q-icon
          color="grey-5"
          size="24px"
          name="sync_alt"
          class="absolute-bottom rotate-90"
        />
      </div>
      <div class="b1-row--1 row--a">
        <ul class="home--row" data-title="ROW A">
          <li
            v-for="n in 26"
            :key="n"
            data-acc="sunwest-cabins"
            :data-acc-type="`corporate-row-a-room-${n}`"
            :class="getBookingClass(`corporate-row-a-room-${n}`)"
          >
            <a href="javascript:void(0);" class="corporate">
              <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                Corporate Room {{ n }}
              </q-tooltip>
            </a>
          </li>
        </ul>
        <ul class="home--no">
          <li v-for="n in 26" :key="n"
            ><a href="javascript:void(0);">{{ n }}</a></li
          >
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
function getParent(ele, parentClass = 'parent') {
  let e = ele

  while (e && !e.classList.contains(parentClass)) e = e.parentElement
  return e
}

export default {
  name: 'SunWest',
  props: {
    maintenance: {
      type: Object,
      default: new Object(),
    },
    bookings: {
      type: Object,
      default: new Object(),
    },
    fromDate: {
      type: String,
      default: new String(),
    },
  },
  data() {
    return {
      selected: {},
    }
  },
  methods: {
    getBookingClass(slug) {
      if (slug && this.bookings && this.maintenance.hasOwnProperty(slug))
        return 'isMaintenance'

      if (slug && this.bookings && this.bookings.hasOwnProperty(slug))
        return 'isBooked'

      if (slug && this.selected && this.selected.hasOwnProperty(slug))
        return 'canBook selected'

      return 'canBook'
    },
    mapClick(event) {
      let canBook = event ? getParent(event.target, 'canBook') : '',
        isBooked = event ? getParent(event.target, 'isBooked') : '',
        isMaintenance = event ? getParent(event.target, 'isMaintenance') : '',
        startStr = ''

      if (isMaintenance) {
        this.showError('Selected Accommodation is under Maintenance.')
        return false
      }

      if (event) {
        if (event.shiftKey) {
          if (canBook) {
            if (!this.selected.hasOwnProperty(canBook.dataset.accType)) {
              this.$set(
                this.selected,
                canBook.dataset.accType,
                canBook.dataset.acc
              )
            } else {
              this.$delete(this.selected, canBook.dataset.accType)
            }
          }
          return
        } else if (!event.shiftKey && canBook) {
          this.$set(this.selected, canBook.dataset.accType, canBook.dataset.acc)
        }
      } else if (!Object.keys(this.selected).length) {
        return
      }

      if (this.fromDate) {
        let splitDob = this.fromDate.split('/')
        startStr = `${splitDob[2]}-${splitDob[1]}-${splitDob[0]}`
      }

      if (new Date().getTime() - new Date(startStr).getTime() > 0)
        startStr = new Date()

      let endDate = new Date(startStr)
      endDate.setDate(endDate.getDate() + 1)

      if (
        (canBook && canBook.classList.contains('canBook')) ||
        (!event && Object.keys(this.selected))
      ) {
        this.updateDialogState({
          dialog: 'AddUpdateEvent',
          val: true,
          properties: {
            startStr: startStr,
            endStr: this.formatDate(endDate, 'YYYY-MM-DD'),
            accommodation: canBook ? canBook.dataset.acc : '',
            accommodation_type: canBook ? canBook.dataset.accType : '',
            selected: this.selected,
          },
        })
      } else if (isBooked && isBooked.classList.contains('isBooked')) {
        let slug = isBooked.dataset.accType
        if (this.bookings[slug])
          this.updateDialogState({
            dialog: 'BookingDetail',
            val: true,
            properties: { ...this.bookings[slug] },
          })
      }
    },
    clearSelection() {
      this.selected = {}
    },
    keyUp(event) {
      if (event.keyCode == 16) {
        this.mapClick()
      }
    },
    keyDown(event) {
      if (event.keyCode == 16) this.selected = {}
    },
  },
  mounted() {
    document.addEventListener('keyup', this.keyUp)
    document.addEventListener('keydown', this.keyDown)
  },
  destroyed() {
    document.removeEventListener('keyup', this.keyUp)
    document.addEventListener('keydown', this.keyDown)
  },
}
</script>
