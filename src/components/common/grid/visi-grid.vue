<template>
  <div>
    <ChooseColumns v-if="chooseColumns" :setColumns="setColumns" />
    <q-table
      :id="`visi-grid-${title}-${uuid}`"
      :title="title"
      :data="data"
      :columns="columns"
      :row-key="rowKey"
      :class="classes"
      :pagination.sync="localPagination"
      :selection="selection"
      :selected.sync="localSelected"
      @request="onRequest"
      :loading="loading"
      :filter="filter"
      ref="visiGid"
      :visible-columns="visibleColumns"
      :hide-pagination="hidePagination"
      :hide-header="hideHeader"
      :rows-per-page-options="[5, 10, 15, 20, 25, 50]"
    >
      <template
        class="no-wrap"
        v-slot:top-right="props"
        v-if="
          chooseColumns ||
          fullscreen ||
          globalSearch ||
          addBtnLabel ||
          showRefresh ||
          dateFilter
        "
      >
        <div class="flex no-wrap">
          <!--  -->
          <template v-if="dateFilter">
            <q-input
              outlined
              dense
              v-model.trim="from_date"
              label="From Date"
              lazy-rules
              mask="##/##/####"
              :rules="[
                $rules.required(),
                (value) => isValidDate(value) || 'Enter Valid Date of birth',
              ]"
              class="q-mr-md q-px-sm table-controls no-wrap text-no-wrap"
              readonly
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="from_date" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              outlined
              dense
              v-model.trim="to_date"
              label="To Date"
              lazy-rules
              mask="##/##/####"
              :rules="[
                $rules.required(),
                (value) => isValidDate(value) || 'Enter Valid Date of birth',
              ]"
              class="q-mr-md q-px-sm table-controls no-wrap text-no-wrap"
              readonly
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="to_date" mask="DD/MM/YYYY">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </template>
          <!--  -->

          <q-btn
            v-if="chooseColumns"
            unelevated
            dense
            color="primary"
            class="q-mr-md q-px-sm table-controls no-wrap text-no-wrap"
            no-caps
            icon="view_week"
            label="Choose columns"
            @click="selectColumns"
          />

          <q-input
            outlined
            dense
            v-if="globalSearch"
            debounce="300"
            v-model.trim="filter"
            class="q-mr-md table-controls"
            placeholder="Search"
            clearable
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            v-if="fullscreen"
            flat
            class="q-ml-sm table-controls"
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          >
            <q-tooltip :disable="isMobile" v-close-popup>
              {{ props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen' }}
            </q-tooltip>
          </q-btn>

          <q-btn
            v-if="showRefresh"
            flat
            dense
            text-color="primary"
            class="q-ml-sm no-hover table-controls"
            no-caps
            icon="refresh"
            @click="refresh()"
          >
            <q-tooltip :disable="isMobile" v-close-popup> Refresh </q-tooltip>
          </q-btn>

          <q-btn
            v-if="addBtnLabel"
            unelevated
            color="primary"
            class="table-controls"
            :label="addBtnLabel"
            @click="addBtnClick"
          />
        </div>
      </template>

      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width v-if="data.length > 0 && selection != 'none'">
            <q-checkbox
              v-if="props.multipleSelect"
              v-model="props.selected"
              indeterminate-value="some"
              dense
            />
          </q-th>

          <q-th
            :props="props"
            @hover.native.stop
            v-for="col in props.cols"
            :key="col.name"
          >
            <div class="row inline">
              <div class="column">
                <p v-text="col.label" />
              </div>
            </div>
          </q-th>
        </q-tr>

        <q-tr
          :props="props"
          class="ignore-elements"
          v-if="hasColumnsFilter && !headerFilter"
        >
          <q-th auto-width v-if="selection != 'none'"> </q-th>
          <q-th :key="col.name" v-for="col in props.cols" style="padding: 8px">
            <template v-if="col.filter">
              <q-select
                v-if="col.filterOption && col.filterOption.length"
                map-options
                emit-value
                outlined
                bg-color="white"
                v-model="columnOptionsSelected[col.field]"
                :options="col.filterOption"
                options-dense
                dense
              />
              <q-input
                v-else
                dense
                class="q-pl-xs q-pr-xs"
                outlined
                bg-color="white"
                v-model="filterData[col.name]"
                debounce="300"
              >
                <template v-slot:append>
                  <q-btn-dropdown
                    dense
                    unelevated
                    class="no-hover"
                    v-if="!col.filterOption"
                    flat
                    icon="filter_alt"
                  >
                    <q-list class="dropdown-sm action-dropdown-box">
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label> Is not equal to </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label> Starts with </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label> Contains </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label> Does not contian </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label> Ends with </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label> Is null </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label> Is not null </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label> Is empty </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label> Is not empty </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </template>
              </q-input>
            </template>
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" v-if="!hasBodySlot">
          <q-td v-if="selection != 'none'">
            <q-checkbox color="primary" v-model="props.selected" dense />
          </q-td>

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <template v-if="!hasCellSlot(col.name)">
              <template>
                <router-link
                  v-if="col.detailLink"
                  :to="{
                    name: col.detailLink.name,
                    params: { id: props.row[col.detailLink.id || 'id'] },
                  }"
                >
                  <template v-if="typeof col.field === 'function'">
                    {{ col.field(props.row) || noDataPlaceHolder }}
                  </template>
                  <template v-else>
                    {{ props.row[col.field] || noDataPlaceHolder }}
                  </template>
                </router-link>
                <template v-else>
                  <template v-if="typeof col.field === 'function'">
                    {{ col.field(props.row) || noDataPlaceHolder }}
                  </template>
                  <template v-else>
                    {{ props.row[col.field] || noDataPlaceHolder }}
                  </template>
                </template>
              </template>
            </template>
            <slot
              :name="`body-cell-${col.name}`"
              v-bind:row="props.row"
              v-else
            />
          </q-td>
        </q-tr>
        <slot name="body" v-bind:row="props.row" v-if="hasBodySlot" />
      </template>

      <!-- <template v-slot:loading>
        <InnerLoadingSpinner :showing="loading" />
      </template> -->
    </q-table>
  </div>
</template>

<script>
import { uid } from 'quasar'
import { date } from 'quasar'

let nexMonthDate = new Date()
nexMonthDate.setMonth(nexMonthDate.getMonth() + 1)

export default {
  name: 'VisiGrid',
  props: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => {
        return new Array()
      },
    },
    columns: {
      type: Array,
      default: () => {
        return new Array()
      },
    },
    globalSearch: {
      type: Boolean,
      default: false,
    },
    dateFilter: {
      type: Boolean,
      default: false,
    },
    headerFilter: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: '',
    },
    selection: {
      type: String,
      default: 'none',
    },
    selected: {
      type: Array,
      default: () => {
        return new Array()
      },
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Object,
      default: () => {
        return {}
      },
    },
    onRequest: {
      type: Function,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default: 'index',
    },
    resetPagination: {
      type: Function,
      default: () => {},
    },
    chooseColumns: {
      type: Boolean,
      default: false,
    },
    hidePagination: {
      type: Boolean,
      default: false,
    },
    addBtnLabel: {
      type: String,
      default: '',
    },
    addBtnClick: {
      type: Function,
      default: () => {},
    },
    showRefresh: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ChooseColumns: () => import('./choose-columns'),
  },
  data() {
    return {
      noDataPlaceHolder: '(Not Set)',
      selectedColumns: null,
      uuid: uid(),
      filterData: {},
      columnOptionsSelected: {},
      localSelected: [],
      filter: '',
      disableRefresh: false,
      from_date: date.formatDate(new Date(), 'DD/MM/YYYY'),
      to_date: date.formatDate(nexMonthDate, 'DD/MM/YYYY'),
    }
  },
  computed: {
    hasColumnsFilter() {
      for (let i = 0; i < this.columns.length; i++) {
        if (this.columns[i].filter) {
          return true
        }
      }
      return false
    },
    localPagination: {
      get() {
        return this.pagination
      },
      set(val) {},
    },
    hasBodySlot() {
      return this.$scopedSlots.hasOwnProperty('body')
    },
    visibleColumns() {
      if (this.selectedColumns) return this.selectedColumns

      return this.defaultVisibleColumns
    },
    defaultVisibleColumns() {
      let visibleColums = this.columns.reduce((filtered, option) => {
        if (option.isVisible) filtered.push(option.name)
        return filtered
      }, [])

      if (!visibleColums.length) {
        this.columns.every((column, index) => {
          if (index >= 2) return false
          visibleColums.push(column.name)
          return true
        })
      }

      return visibleColums
    },
  },
  created() {
    if (this.selection == 'none') {
      this.localSelected = []
    } else {
      this.localSelected = this.selected
    }
  },
  mounted() {
    this.refresh(true)
  },
  destroyed() {
    this.resetPagination()
  },
  methods: {
    async refresh(resetPagination = false, done) {
      if (resetPagination) await this.resetPagination()

      await this.onRequest({
        pagination: this.pagination,
        filter: this.filter,
        filterData: this.filterData,
      })

      setTimeout(() => {
        if (this.$refs.visiGid && this.$refs.visiGid.scrollTo) {
          this.$refs.visiGid.scrollTo(0)
        }
        if (done) {
          done()
        }
      }, 100)

      if (!resetPagination) {
        this.disableRefresh = true
        setTimeout(() => {
          this.disableRefresh = false
        }, 5000)
      }
    },
    hasCellSlot(cellName) {
      if (cellName)
        return this.$scopedSlots.hasOwnProperty(`body-cell-${cellName}`)

      return false
    },
    selectColumns() {
      this.updateDialogState({
        dialog: 'ChooseColumns',
        val: true,
        properties: {
          columms: this.columns,
          defaultVisibleColumns: this.defaultVisibleColumns,
          selectedColumns: this.selectedColumns || this.defaultVisibleColumns,
        },
      })
    },
    setColumns(selectedColumns) {
      this.selectedColumns = selectedColumns
    },
  },
  watch: {
    localSelected: function () {
      this.$emit('selected-val', this.localSelected)
    },
  },
}
</script>
