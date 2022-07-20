<template>
  <q-page :style="!isMobile ? 'padding-top: 70px' : ''">
    <q-page-sticky expand position="top" v-if="!isMobile">
      <q-toolbar class="bg-white text-dark q-pa-none" inset>
        <q-toolbar-title class="text-dark col-auto q-pa-sm">
          Maintenance
        </q-toolbar-title>
        <q-breadcrumbs class="text-grey col-auto" gutter="sm" separator="/">
          <q-breadcrumbs-el
            label="Dashboard"
            :to="{
              name: 'Homepage',
            }"
          />
          <q-breadcrumbs-el label="Accommodation Maintenance" />
        </q-breadcrumbs>

        <div class="breadcrumb-filters ml-auto flex q-mr-xs">
          <q-btn
            unelevated
            color="primary"
            padding="5px 15px 5px 10px"
            size="11px"
            @click="
              updateDialogState({
                dialog: 'MaintenanceForm',
                val: true,
              })
            "
          >
            <q-icon name="add" class="q-mr-xs" />Add
          </q-btn>
        </div>
      </q-toolbar>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-else>
      <q-btn
        unelevated
        round
        color="primary"
        @click="
          updateDialogState({
            dialog: 'MaintenanceForm',
            val: true,
          })
        "
      >
        <q-icon name="add" />
      </q-btn>
    </q-page-sticky>

    <div class="container q-pa-lg">
      <visi-grid
        title="Maintenance"
        global-search
        fullscreen
        :data="listing"
        :columns="columns"
        :loading="loading"
        :onRequest="onRequest"
        :pagination="pagination"
        rowKey="id"
        classes="table-theme"
        :resetPagination="resetPagination"
        show-refresh
        ref="rahiGrid"
      >
        <template v-slot:body-cell-location="props">
          <template v-if="props.row.location">
            <router-link
              :to="{ name: 'Locations', params: { id: props.row.location.id } }"
            >
              {{ props.row.location.title }}
            </router-link>
          </template>
          <template v-else>
            {{ noDataPlaceHolder }}
          </template>
        </template>

        <template v-slot:body-cell-park="props">
          <template v-if="props.row.park">
            {{ props.row.park.title }}
          </template>
          <template v-else>
            {{ noDataPlaceHolder }}
          </template>
        </template>

        <template v-slot:body-cell-accommodation="props">
          <template v-if="props.row.accommodation">
            {{ props.row.accommodation.title }}
          </template>
          <template v-else>
            {{ noDataPlaceHolder }}
          </template>
        </template>

        <template v-slot:body-cell-accommodation_type="props">
          <template v-if="props.row.accommodation_type">
            {{ props.row.accommodation_type.title }}
          </template>
          <template v-else>
            {{ noDataPlaceHolder }}
          </template>
        </template>

        <template v-slot:body-cell-Action="props">
          <q-btn-dropdown
            class="action-dropdown ddropdown"
            padding="5px"
            flat
            icon="more_vert"
          >
            <q-list class="dropdown-sm action-dropdown-box">
              <q-item
                clickable
                v-close-popup
                @click="
                  updateDialogState({
                    dialog: 'MaintenanceForm',
                    val: true,
                    properties: {
                      id: props.row.id,
                      location_id: props.row.location_id,
                      park_id: props.row.park_id,
                      accommodation_id: props.row.accommodation_id,
                      accommodation_type_id: props.row.accommodation_type_id,
                      start_date: props.row.start_date,
                      end_date: props.row.end_date,
                      notes: props.row.notes,
                    },
                    refresh: true,
                  })
                "
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="edit" size="15px" class="q-mr-xs" />
                    Edit
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="confirmDelete(props.row)">
                <q-item-section>
                  <q-item-label>
                    <q-icon name="delete" size="15px" class="q-mr-xs" />
                    Delete
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
      </visi-grid>
    </div>
    <Form :parks="parks" />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import Form from './Form.vue'

export default {
  name: 'PageMaintenance',
  components: {
    Form,
  },
  computed: {
    ...mapGetters('crud', ['pagination', 'getListingByModule']),
    listing() {
      return this.getListingByModule(this.module)
    },
    localPagination() {
      return this.pagination
    },
  },
  data() {
    return {
      module: 'accommodation_maintenance',
      loading: false,
      refreshOrdersData: true, // !this.$q.platform.is.mobile,
      columns: [
        {
          name: 'start_date',
          label: 'Start Date',
          field: (row) => {
            return this.formatDate(row.start_date)
          },
          align: 'left',
          sortable: true,
          isVisible: true,
          isFixed: true,
        },
        {
          name: 'end_date',
          label: 'End Date',
          field: (row) => {
            return this.formatDate(row.end_date)
          },
          align: 'left',
          sortable: true,
          isVisible: true,
          isFixed: true,
        },
        {
          name: 'Action',
          label: 'Action',
          align: 'left',
          isVisible: true,
          isFixed: true,
        },
        {
          name: 'location',
          label: 'Location',
          field: 'location',
          align: 'left',
          isVisible: true,
        },
        {
          name: 'park',
          label: 'Park',
          field: 'park',
          align: 'left',
          isVisible: true,
        },
        {
          name: 'accommodation',
          label: 'Accommodation',
          field: 'accommodation',
          align: 'left',
          isVisible: true,
        },

        {
          name: 'accommodation_type',
          label: 'Accommodation Type',
          field: 'accommodation',
          align: 'left',
          isVisible: true,
        },
      ],
      parks: [],
    }
  },
  methods: {
    onRequest(props) {
      this.loading = true

      let params = {
        'page[number]': props.pagination.page || 1,
        'page[size]':
          props.pagination.rowsPerPage || this.localPagination.rowsPerPage,
        search: props.filter,
        pagination: 1,
      }

      //   if (props.pagination && props.pagination.sortBy) {
      //     params.Sorts = props.pagination.sortBy
      //     params.SortsType = props.pagination.descending ? 'desc' : 'asc'
      //   }
      //   if (props.pagination && props.pagination.sortBy == 'name') {
      //     params.Sorts = 'first_name'
      //     params.SortsType = props.pagination.descending ? 'desc' : 'asc'
      //   }

      this.$store
        .dispatch('crud/getListing', {
          module: this.module,
          params,
        })
        .then((response) => {
          if (response && response.status) {
            this.$store.commit('crud/SET_LISTING', {
              module: this.module,
              listing:
                response && response.data && response.data.data
                  ? response.data.data
                  : [],
              refresh:
                params && params.Page === 1 ? true : this.refreshOrdersData,
            })

            this.$store.commit('crud/UPDATE_PAGINATION', {
              page: response.data.current_page,
              rowsPerPage: response.data.per_page,
              rowsNumber: response.data.total,
              hasNext: !!response.data.next_page_url,
              sortBy: (props.pagination && props.pagination.sortBy) || null,
              descending:
                (props.pagination && props.pagination.descending) || false,
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    resetPagination() {
      this.$store.commit('crud/UPDATE_PAGINATION', this.defaultPagination)
    },
    confirmDelete(target) {
      console.log(target,'target')
      this.visiConfirm(
        `Are you sure you want to delete "${target.employee.first_name || ''} ${
          target.employee.last_name || ''
        }" Maintenance`
      ).onOk(() => {
        this.$store
          .dispatch('crud/deleteById', {
            module: this.module,
            id: target.id,
          })
          .then((response) => {
            if (response.status) {
              if (this.$refs.rahiGrid) this.$refs.rahiGrid.refresh()
              this.showSuccess(response.message)
              this.updateDialogState({
                dialog: 'MaintenanceDetail',
                val: false,
              })
            } else if (response.message) this.showError(response.message)
          })
      })
    },
  },
  created() {
    this.$store.dispatch('common/getAllLocation')
    this.$store
      .dispatch('crud/getListing', {
        module: 'park',
        params: {
          pagination: 0,
        },
      })
      .then((data) => {
        if (data.status) this.parks = data.data
      })
  },
}
</script>
