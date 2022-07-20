<template>
  <q-page :style="!isMobile ? 'padding-top: 60px' : ''">
    <q-page-sticky
      expand
      position="top"
      v-if="!isMobile && hasPermission('dashboard_view')"
    >
      <q-toolbar class="bg-white text-dark q-pa-none toolbar" inset>
        <q-toolbar-title class="text-dark col-auto q-pa-sm">
          Dashboard
        </q-toolbar-title>

        <div class="breadcrumb-filters ml-auto flex q-mr-sm center">
          <q-select
            outlined
            v-model="park"
            label="Select Park"
            lazy-rules
            :options="parkOptions"
            option-label="title"
            emit-value
            use-input
            @filter="filterPark"
            :loading="loadingParks"
            :disable="loadingParks"
            @input="
              () => {
                this.getDashboard()
                this.getAccomodationType(park, subtype)
              }
            "
            class="q-mr-md headdropdown"
            clearable
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            outlined
            v-model="subtype"
            label="Select Subtype"
            lazy-rules
            :options="subtypes"
            option-label="title"
            emit-value
            use-input
            
            @input="
              () => {
                this.getDashboard()
                this.getAccomodationType(park, subtype)
              }
            "
            class="q-mr-md headdropdown"
            clearable
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            outlined
            v-model="accommodationType"
            label="Select accommodation"
            lazy-rules
            :options="accommodationOptions"
            option-label="title"
            emit-value
            use-input
            @filter="filterAccommodationType"
            :loading="loadingAccommodationType"
            :disable="loadingAccommodationType"
            @input="
              () => {
                this.getDashboard()
              }
            "
            class="q-mr-md headdropdown"
            clearable
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="q-pa-md date-pick">
            <q-input filled v-model="model.from" v-on:change="refreshDashboard" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="model.from" @click="refreshDashboard">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="q-pa-md date-pick">
            <q-input filled v-model="model.to" mask="date" v-on:change="refreshDashboard" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="model.to" @click="refreshDashboard">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </q-toolbar>
    </q-page-sticky>

    <div
      class="container q-px-lg q-pb-lg"
      v-if="hasPermission('dashboard_view')"
    >
      <div
        class="row q-my-md light-shadow"
        style="border-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.12)"
      >
        <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 box_1">
          <q-card class="no-shadow q-pa-sm">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label
                  class="text-h4"
                  style="font-weight: 500; letter-spacing: 3px"
                >
                  {{ dashboardObj.total_booking }}
                </q-item-label>
                <q-item-label
                  :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'"
                  style="letter-spacing: 1px"
                >
                  Total Booking
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="event" class="box_1" size="60px"></q-icon>
              </q-item-section>
            </q-item>
            <q-item class="q-py-xs" style="min-height: unset">
              <q-item-section>
                <div class="progress-base q-my-sm">
                  <div class="progress-bar-1" style="width: 70%"></div>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <div
          class="col-md-4 col-lg-4 col-sm-12 col-xs-12 box_2"
          style="border-left: 1px solid #efefef"
          v-bind:class="{ 'border-top': $q.platform.is.mobile }"
        >
          <q-card class="no-shadow q-pa-sm">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label
                  class="text-h4"
                  style="font-weight: 500; letter-spacing: 3px"
                >
                  {{ dashboardObj.total_customers }}
                </q-item-label>
                <q-item-label
                  :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'"
                  style="letter-spacing: 1px"
                >
                  Total Customer
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon name="people" class="box_2" size="60px" />
              </q-item-section>
            </q-item>
            <q-item class="q-py-xs" style="min-height: unset">
              <q-item-section>
                <div class="progress-base q-my-sm">
                  <div class="progress-bar-2" style="width: 40%"></div>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <div
          class="col-md-4 col-lg-4 col-sm-12 col-xs-12 box_3"
          style="border-left: 1px solid #efefef"
          v-bind:class="{ 'border-top': $q.platform.is.mobile }"
        >
          <q-card class="no-shadow q-pa-sm">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label
                  class="text-h4"
                  style="font-weight: 500; letter-spacing: 3px"
                >
                  {{ dashboardObj.total_revenue | kcurrency }}
                </q-item-label>
                <q-item-label
                  :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'"
                  style="letter-spacing: 1px"
                >
                  Total Revenue
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon
                  name="account_balance"
                  class="box_3"
                  size="60px"
                ></q-icon>
              </q-item-section>
            </q-item>
            <q-item class="q-py-xs" style="min-height: unset">
              <q-item-section>
                <div class="progress-base q-my-sm">
                  <div class="progress-bar-3" style="width: 80%"></div>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
        <!-- <div
          class="col-md-3 col-lg-3 col-sm-12 col-xs-12 box_4"
          style="border-left: 1px solid #efefef"
          v-bind:class="{ 'border-top': $q.platform.is.mobile }"
        >
          <q-card class="no-shadow q-pa-sm">
            <q-item class="q-pb-none q-pt-xs">
              <q-item-section>
                <q-item-label
                  class="text-h4"
                  style="font-weight: 500; letter-spacing: 3px"
                >
                  {{ dashboardObj.total_employees }}
                </q-item-label>
                <q-item-label
                  :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'"
                  style="letter-spacing: 1px"
                >
                  Total Employee
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon
                  name="supervised_user_circle"
                  class="box_4"
                  size="60px"
                ></q-icon>
              </q-item-section>
            </q-item>
            <q-item class="q-py-xs" style="min-height: unset">
              <q-item-section>
                <div class="progress-base q-my-sm">
                  <div class="progress-bar-4" style="width: 30%"></div>
                </div>
              </q-item-section>
            </q-item>
          </q-card>
        </div> -->
      </div>

      <div class="row q-col-gutter-md">
        <!--<div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <q-card flat bordered class="light-shadow q-pa-none q-ma-none">
            <q-card-section class="row">
              <div
                :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'"
                class="text-h6 col-12"
              >
                Sales vs Goals
                <q-btn
                  flat
                  dense
                  icon="fas fa-download"
                  class="float-right"
                  @click="SaveImage('sales_goals')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                >
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator class="full-width" inset></q-separator>

            <q-card-section>
              <IEcharts
                :option="areaChartOption"
                ref="sales_goals"
                :resizable="true"
                style="height: 320px"
              />
            </q-card-section>
          </q-card>
        </div>-->
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-card flat bordered class="light-shadow q-pa-none q-ma-none">
            <q-card-section class="row">
              <div
                :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'"
                class="text-h6 col-12"
              >
                Day Wise Booking
                <q-btn
                  flat
                  dense
                  class="float-right"
                  @click="SaveImage('day_booking')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                  icon="file_download"
                >
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator class="full-width" inset></q-separator>

            <q-card-section>
              <IEcharts
                ref="market_share"
                :option="getBarChartOptions"
                :resizable="true"
                style="height: 320px"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-col-gutter-md q-pt-md">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card flat bordered class="light-shadow q-pa-none q-ma-none">
            <q-card-section>
              <div
                :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'"
                class="text-h6"
              >
                Park Booking
                <q-btn
                  flat
                  dense
                  class="float-right"
                  @click="SaveImage('park_booking')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                  icon="file_download"
                >
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator class="full-width" inset></q-separator>

            <q-card-section>
              <IEcharts
                ref="park_booking"
                :option="pieOptions"
                :resizable="true"
                style="height: 270px"
              />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card flat bordered class="light-shadow q-pa-none q-ma-none">
            <q-card-section>
              <div
                :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'"
                class="text-h6"
              >
                Park Booking List
              </div>
            </q-card-section>

            <q-separator class="full-width" inset></q-separator>

            <div class="q-pa-md right-dash-box">
              <q-markup-table flat bordered>
                <thead class="bg-primary text-white">
                  <tr>
                    <th class="text-left">No</th>
                    <th class="text-left">Map</th>
                    <th class="text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      parkBooking, index
                    ) in dashboardObj.park_wise_booking_count"
                    :key="index"
                  >
                    <td class="text-left">{{ index + 1 }}</td>
                    <td class="text-left">{{ parkBooking.park_name }}</td>
                    <td class="text-right">{{ parkBooking.total_count }}</td>
                  </tr>
                  <!-- <tr>
                    <td class="text-left">02</td>
                    <td class="text-left">Bud's Place</td>
                    <td class="text-right">29%</td>
                  </tr>
                  <tr>
                    <td class="text-left">03</td>
                    <td class="text-left">El Dorado</td>
                    <td class="text-right">37%</td>
                  </tr> -->
                </tbody>
              </q-markup-table>
            </div>
          </q-card>
        </div>

        <!-- <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12" v-if="false">
          <q-card flat bordered class="light-shadow q-pa-none q-ma-none">
            <q-card-section>
              <div
                :class="!$q.dark.isActive ? 'text-grey-7' : 'text-white'"
                class="text-h6"
              >
                Sales Pipeline by Sales Rep
                <q-btn
                  flat
                  dense
                  icon="fas fa-download"
                  class="float-right"
                  @click="SaveImage('sales_pipeline')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                >
                  <q-tooltip>Download</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator class="full-width" inset></q-separator>

            <q-card-section>
              <IEcharts
                ref="sales_pipeline"
                :option="stackedBarOptions"
                :resizable="true"
                style="height: 270px"
              />
            </q-card-section>
          </q-card>
        </div> -->
      </div>
      <div class="row q-col-gutter-md q-pt-md" v-if="false">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <q-card flat bordered class="light-shadow">
            <q-table
              title="All Activities"
              :data="data"
              :hide-header="mode === 'grid'"
              :table-class="$q.dark.isActive ? 'text-white' : 'text-grey-8'"
              :table-header-class="
                $q.dark.isActive ? 'text-white' : 'text-grey-9'
              "
              :columns="columns"
              row-key="name"
              :grid="mode == 'grid'"
              :filter="filter"
              :pagination.sync="pagination"
            >
              <template v-slot:top-left>
                <!-- ="props" -->
                <div
                  :class="$q.dark.isActive ? 'text-white' : 'text-grey-7'"
                  class="text-h6"
                  >All Activities</div
                >
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props" class="text-center">
                  <q-chip
                    v-bind:class="{
                      chip_completed: props.row.status == 'Completed',
                      chip_pending: props.row.status == 'Pending',
                    }"
                    text-color="white"
                    dense
                    class="text-weight-bolder text-center"
                    square
                    style="width: 85px"
                    ><span
                      class="
                        full-width
                        inline-block
                        flex flex-center
                        text-center
                      "
                      >{{ props.row.status }}</span
                    >
                  </q-chip>
                </q-td>
              </template>
              <template v-slot:top-right="props">
                <q-input
                  outlined
                  dense
                  debounce="300"
                  v-model="filter"
                  placeholder="Search"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>

                <q-btn
                  flat
                  round
                  dense
                  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen"
                  v-if="mode === 'list'"
                  class="text-grey-7"
                >
                  <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                    >{{
                      props.inFullscreen
                        ? 'Exit Fullscreen'
                        : 'Toggle Fullscreen'
                    }}
                  </q-tooltip>
                </q-btn>

                <q-btn
                  flat
                  round
                  dense
                  :icon="mode === 'grid' ? 'list' : 'grid_on'"
                  @click="
                    mode = mode === 'grid' ? 'list' : 'grid'
                    separator = mode === 'grid' ? 'none' : 'horizontal'
                  "
                  v-if="!props.inFullscreen"
                  class="text-grey-7"
                >
                  <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                    >{{ mode === 'grid' ? 'List' : 'Grid' }}
                  </q-tooltip>
                </q-btn>

                <q-btn
                  style="background-color: #37cde3; color: white"
                  icon-right="archive"
                  label="Export to csv"
                  no-caps
                  @click="exportTable"
                />
              </template>
            </q-table>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue'
import IEcharts from 'vue-echarts-v3/src/full.js'
import echarts from 'echarts'
import { date, exportFile } from 'quasar'
import { DashboardAgent } from 'src/agent'

Vue.component('IEcharts', IEcharts)

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

export default {
  data() {
    return {
      parkOptions: [],
      loadingAccommodationType: false,
      park: '',
      subtype: '',
      subtypes: [
        {id: 0, 'title': 'All Subtypes'},
        {id: 1, 'title': 'RVS'},
        {id: 2, 'title': 'Cabins'},
      ],
      accommodationType: null,
      parks: [],
      accommodation: [],
      accommodationOptions: [],
      loadingParks: false,
      filter: '',
      mode: 'list',
      columns: [
        {
          name: 'activity_id',
          align: 'left',
          label: 'Activity ID',
          field: 'activity_id',
          sortable: true,
        },
        {
          name: 'desc',
          required: true,
          label: 'Activity Name',
          align: 'left',
          field: (row) => row.name,
          sortable: true,
        },
        {
          name: 'regarding',
          align: 'left',
          label: 'Regarding',
          field: 'regarding',
          sortable: true,
        },
        {
          name: 'owner',
          align: 'left',
          label: 'Owner',
          field: 'owner',
          sortable: true,
        },
        {
          name: 'status',
          align: 'center',
          label: 'Status',
          field: 'status',
          sortable: true,
        },
        {
          name: 'creation_date',
          align: 'left',
          label: 'Creation Date',
          field: 'creation_date',
          sortable: true,
        },
      ],
      data: [
        {
          activity_id: 'C001',
          name: 'Advanced communications',
          regarding: 'Presentation',
          owner: 'John',
          status: 'Pending',
          creation_date: '12-09-2019',
        },
        {
          activity_id: 'C002',
          name: 'New drug discussion',
          regarding: 'Meeting',
          owner: 'John',
          status: 'Completed',
          creation_date: '09-02-2019',
        },
        {
          activity_id: 'C003',
          name: 'Universal services discussion',
          regarding: 'Meeting',
          owner: 'John',
          status: 'Completed',
          creation_date: '03-25-2019',
        },
        {
          activity_id: 'C004',
          name: 'Add on business',
          regarding: 'Business',
          owner: 'John',
          status: 'Pending',
          creation_date: '03-18-2019',
        },
        {
          activity_id: 'C005',
          name: 'Promotional Activity',
          regarding: 'Personal',
          owner: 'John',
          status: 'Completed',
          creation_date: '04-09-2019',
        },
      ],
      pagination: {
        rowsPerPage: 10,
      },
      model: {
        from: date.formatDate(
          new Date(new Date().getFullYear(), 0, 1),
          'YYYY/MM/DD'
        ),
        to: date.formatDate(new Date(), 'YYYY/MM/DD'),
      },
      proxyDate: null,
      dashboardObj: {},
    }
  },
  computed: {
    getBarChartOptions() {
      let dataAxis = [],
        data = []
      let market_share_data = [220]
      let growth_data = [180]

      if (this.dashboardObj && this.dashboardObj.day_wise_booking) {
        this.dashboardObj.day_wise_booking.forEach((item) => {
          dataAxis.push(item.booking_date)
          data.push(item.total_count)
        })
      }
      return {
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: false,
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: 'grey',
            },
            show: false,
          },
          z: 10,
        },
        tooltip: {},
        legend: {
          show: true,
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        grid: {
          bottom: '9%',
          left: '9%',
          top: '10%',
          right: '5%',
          show: true,
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: 'grey',
            },
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        // series: series,
        series: [
          {
            name: 'Boking',
            type: 'bar',
            data: data,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#3862b5' },
                  { offset: 0.5, color: '#3862b5' },
                  { offset: 1, color: '#3862b5' },
                ]),
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#3862b5' },
                  { offset: 0.7, color: '#3862b5' },
                  { offset: 1, color: '#3862b5' },
                ]),
              },
            },
          },
        ],
      }
    },
    areaChartOption() {
      return {
        legend: {
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        grid: {
          bottom: '9%',
          left: '9%',
          top: '10%',
          right: '5%',
          show: true,
        },
        tooltip: { show: true },
        xAxis: {
          type: 'category',
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'Jul',
            'Aug',
            'Sep',
          ],
          axisLine: {
            lineStyle: {
              color: 'grey',
            },
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'grey',
            },
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        series: [
          {
            name: 'Sales',
            data: [0, 600, 300, 700, 700, 1330, 600, 500, 0],
            type: 'line',
            areaStyle: {},
            smooth: true,
            color: '#e4a3e2',
          },
          {
            name: 'Goals',
            data: [0, 300, 600, 400, 1000, 730, 840, 300, 0],
            type: 'line',
            areaStyle: {},
            smooth: true,
            color: '#25c0ea',
          },
        ],
      }
    },
    stackedBarOptions() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor: 'rgba(50,50,50,0.9)',
        },
        legend: {
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        color: ['#cc9dd1', '#9cebaf', '#41eff7'],
        // legend: {
        //     y: "bottom",
        //     data: [{name: 'Territory Sales', icon: 'circle'}, {
        //         name: 'Remaining Nation Sales',
        //         icon: 'circle'
        //     }]
        // },
        grid: {
          bottom: '3%',
          left: '15%',
          top: '18%',
          right: '5%',
          show: true,
        },
        calculable: true,
        xAxis: {
          type: 'value',
          position: 'top',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: function (value, index) {
              return '$' + value
            },
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        yAxis: [
          {
            type: 'category',
            data: [
              'Alex Morrow',
              'Joanna Carter',
              'Jimmy Joanna',
              'Mack Hales',
            ],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              fontSize: 12,
              color: this.$q.dark.isActive ? 'white' : '#676767',
            },
          },
        ],
        series: [
          {
            name: 'Qualification',
            type: 'bar',
            stack: 'A',
            data: [300, 350, 400, 500],
          },
          {
            name: 'Discovery',
            type: 'bar',
            stack: 'A',
            data: [100, 180, 250, 300],
          },
          {
            name: 'Quote',
            type: 'bar',
            stack: 'A',
            data: [100, 120, 200, 220],
          },
        ],
      }
    },
    stackedBarOptions2() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          backgroundColor: 'rgba(50,50,50,0.9)',
        },
        legend: {
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        color: ['#cc9dd1', '#9cebaf', '#41eff7'],
        // legend: {
        //     y: "bottom",
        //     data: [{name: 'Territory Sales', icon: 'circle'}, {
        //         name: 'Remaining Nation Sales',
        //         icon: 'circle'
        //     }]
        // },
        grid: {
          bottom: '3%',
          left: '15%',
          top: '18%',
          right: '5%',
          show: true,
        },
        calculable: true,
        xAxis: {
          type: 'value',
          position: 'top',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: function (value, index) {
              return '$' + value
            },
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        yAxis: [
          {
            type: 'category',
            data: [
              'Alex Morrow',
              'Joanna Carter',
              'Jimmy Joanna',
              'Mack Hales',
            ],
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              fontSize: 12,
              color: this.$q.dark.isActive ? 'white' : '#676767',
            },
          },
        ],
        series: [
          {
            name: 'Qualification',
            type: 'bar',
            stack: 'A',
            data: [300, 350, 400, 500],
          },
          {
            name: 'Discovery',
            type: 'bar',
            stack: 'A',
            data: [100, 180, 250, 300],
          },
          {
            name: 'Quote',
            type: 'bar',
            stack: 'A',
            data: [100, 120, 200, 220],
          },
        ],
      }
    },
    pieOptions() {
      let data = []

      if (this.dashboardObj && this.dashboardObj.park_wise_booking_count) {
        this.dashboardObj.park_wise_booking_count.forEach(
          (parkWiseBookingCount, index) => {
            data.push({
              value: parkWiseBookingCount.total_count,
              name: parkWiseBookingCount.park_name,
              // selected: index == 0,
            })
          }
        )
      }

      return {
        tooltip: {
          show: true,
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          width: 300,
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767',
          },
        },
        color: ['#66e398', '#cc9dd1', '#f0d377'],
        series: [
          {
            name: 'Bookigs',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter: function (param, index) {
                  return param.value + ' %'
                },
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            selectedMode: 'single',
            data,
          },
        ],
      }
    },
  },
  methods: {
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
    refreshDashboard(test) {
      this.getDashboard();
    },
    filterAccommodationType(val, update) {
      let accommodation = this.accommodation

      if (val === '') {
        update(() => {
          this.accommodationOptions = accommodation
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.accommodationOptions = accommodation.filter(
          (acco) => acco.title.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    getDashboard() {
      this.hideShowFullSpinner(true)
      let from, to

      if (this.model) {
        from = this.model.from
        to = this.model.to
      }

      let params = {
        start_date: from,
        end_date: to,
      }

      if (this.park) params['park_id'] = this.park.id
      if (this.subtype) params['subtype_id'] = this.subtype.id
      if (this.accommodationType)
        params['accommodation_id'] = this.accommodationType.id

      this.dashboardObj = {}
      DashboardAgent.get(params)
        .then(({ data }) => {
          this.dashboardObj = data.data
        })
        .finally(() => {
          this.hideShowFullSpinner(false)
        })
    },
    updateProxy() {
      this.proxyDate = this.model
    },
    save() {
      if (this.proxyDate) {
        if (typeof this.proxyDate == 'object') this.model = this.proxyDate
        else {
          this.model = {
            from: this.proxyDate,
            to: date.formatDate(
              date.addToDate(this.proxyDate, { days: 1 }),
              'YYYY/MM/DD'
            ),
          }
        }

        this.getDashboard()
      }
    },
    SaveImage(type) {
      const linkSource = this.$refs[type].getDataURL()
      const downloadLink = document.createElement('a')
      document.body.appendChild(downloadLink)
      downloadLink.href = linkSource
      downloadLink.target = '_self'
      downloadLink.download = type + '.png'
      downloadLink.click()
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.data.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(',')
          )
        )
        .join('\r\n')

      const status = exportFile('activity.csv', content, 'text/csv')

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        })
      }
    },
    getAccomodationType(park, subtype) {
      if (park && park.id) {
        let params = {
          pagination: 0,
        }

        params['park_id'] = park.id;
        if (subtype) {
          params['subtype_id'] = subtype.id;
        }

        this.accommodationType = null

        this.loadingAccommodationType = true
        this.$store
          .dispatch('accommodation/getListing', params)
          .then((response) => {
            if (response.status && response.data)
              this.accommodation = this.accommodationOptions = response.data
          })
          .finally(() => {
            this.loadingParks = false
            this.loadingAccommodationType = false
          })
      } else {
        this.accommodation = this.accommodationOptions = []
        this.accommodationType = null
      }
    },
  },
  created() {
    this.getDashboard()

    this.loadingParks = true

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

    // this.getAccomodationType()
  },
}
</script>

<style scoped>
.box_1 {
  color: #0dceec;
}

.box_2 {
  color: #fe434f;
}

.box_3 {
  color: #15ca20;
}

.box_4 {
  color: #ff9700;
}

.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}

.progress-base {
  height: 8px;
  border-radius: 3px;
  background-color: #e9ecef;
}

.progress-bar-1 {
  height: 8px;
  border-radius: 3px;
  background: #17ead9;
  background: -webkit-linear-gradient(45deg, #17ead9, #6078ea) !important;
  background: linear-gradient(45deg, #17ead9, #6078ea) !important;
}

.progress-bar-2 {
  height: 8px;
  border-radius: 3px;
  background: #f54ea2;
  background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
  background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
}

.progress-bar-3 {
  height: 8px;
  border-radius: 3px;
  background: #42e695;
  background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
  background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
}

.progress-bar-4 {
  height: 8px;
  border-radius: 3px;
  background: #ffdf40;
  background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
  background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
}

.border-top {
  border-top: 1px solid #efefef;
}

.chip_pending {
  background: #ffdf40;
  background: -webkit-linear-gradient(45deg, #ffdf40, #ff8359) !important;
  background: linear-gradient(45deg, #ffdf40, #ff8359) !important;
}

.chip_completed {
  background: #42e695;
  background: -webkit-linear-gradient(45deg, #42e695, #3bb2b8) !important;
  background: linear-gradient(45deg, #42e695, #3bb2b8) !important;
}

.light-shadow {
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1) !important;
}

.date-pick {
  max-width: 140px;
  height: 38px;
  float: left;
  display: block;
  padding: 0px 5px;
  margin: 2px;
  position: relative;
  top: -10px;
}

.headdropdown {
  max-width: 180px !important;
  margin-right: 3px !important;
}

</style>
