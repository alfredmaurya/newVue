<template>
  <q-page :style="!isMobile ? 'padding-top: 70px' : ''">
    <q-page-sticky expand position="top" v-if="!isMobile">
      <q-toolbar class="bg-white text-dark q-pa-none" inset>
        <q-toolbar-title class="text-dark col-auto q-pa-sm">
          Accommodation Type
        </q-toolbar-title>
        <q-breadcrumbs class="text-grey col-auto" gutter="sm" separator="/">
          <q-breadcrumbs-el
            label="Dashboard"
            :to="{
              name: 'Homepage',
            }"
          />
          <q-breadcrumbs-el label="Accommodation Type" />
        </q-breadcrumbs>

        <div class="breadcrumb-filters ml-auto flex q-mr-xs">
          <q-btn
            v-if="hasPermission('accommodation_type_add')"
            unelevated
            color="primary"
            padding="5px 15px 5px 10px"
            size="11px"
            @click="
              updateDialogState({
                dialog: 'AccommodationTypeForm',
                val: true,
              })
            "
          >
            <q-icon name="add" class="q-mr-xs" />Add
          </q-btn>
        </div>
      </q-toolbar>
    </q-page-sticky>
    <div class="container q-pa-lg">
      <visi-grid
        v-if="hasPermission('accommodation_type_view')"
        title="Accommodation Type"
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
        choose-columns
        show-refresh
        ref="accommodationTypeGrid"
      >
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
                :to="{
                  name: 'AccommodationType',
                  params: { id: props.row.id },
                }"
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="visibility" size="15px" class="q-mr-xs" />
                    View
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="hasPermission('accommodation_type_edit')"
                clickable
                v-close-popup
                @click="
                  updateDialogState({
                    dialog: 'AccommodationTypeForm',
                    val: true,
                    properties: props.row,
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
              <q-item
                v-if="hasPermission('accommodation_type_delete')"
                clickable
                v-close-popup
                @click="confirmDelete(props.row)"
              >
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

        <template v-slot:body-cell-rate="props">
          {{ props.row.rate | currency }}
        </template>

        <template v-slot:body-cell-employee="props">
          <div class="address-column" v-if="props.row.employee">
            <p>
              {{
                `${props.row.employee.first_name} ${props.row.employee.last_name}`
              }}
            </p>
          </div>
          <template v-else>
            {{ noDataPlaceHolder }}
          </template>
        </template>

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

        <template v-slot:body-cell-status="props">
          <q-badge :class="statues[props.row.status].class">
            {{ statues[props.row.status].status }}
          </q-badge>
        </template>

        <template v-slot:body-cell-created_at="props">
          {{ props.row.created_at | formatDate('H:mm A, MMM DD, YYYY') }}
        </template>
      </visi-grid>
    </div>
    <Form
      v-if="
        hasPermission(['accommodation_type_add', 'accommodation_type_edit'])
      "
    />
    <Detail />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageAccommodationType',
  computed: {
    ...mapGetters('accommodationType', ['pagination', 'listing']),
    localPagination() {
      return this.pagination
    },
  },
  components: {
    Form: () => import('components/accommodation-type/form'),
    Detail: () => import('components/accommodation-type/detail'),
  },
  data() {
    return {
      loading: false,
      refreshOrdersData: !this.$q.platform.is.mobile,
      columns: [
        {
          name: 'title',
          label: 'Type Name',
          field: 'title',
          align: 'left',
          sortable: true,
          isVisible: true,
          isFixed: true,
          detailLink: { name: 'AccommodationType' },
        },
        {
          name: 'Action',
          label: 'Action',
          align: 'left',
          isVisible: true,
          isFixed: true,
        },
        {
          name: 'rate',
          label: 'rate',
          field: 'rate',
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
          label: 'park',
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
          name: 'status',
          label: 'status',
          field: 'status',
          align: 'left',
          isVisible: true,
        },
        {
          name: 'created_at',
          label: 'Created At',
          align: 'left',
          field: 'created_at',
          isVisible: true,
          sortable: true,
        },
        {
          name: 'employee',
          label: 'Created By',
          field: 'employee',
          align: 'left',
          isVisible: true,
        },
      ],
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

      if (props.pagination && props.pagination.sortBy) {
        params.Sorts = props.pagination.sortBy
        params.SortsType = props.pagination.descending ? 'desc' : 'asc'
      }

      this.$store
        .dispatch('accommodationType/getListing', params)
        .then((response) => {
          if (response && response.status) {
            this.$store.commit('accommodationType/SET_LISTING', {
              listing:
                response && response.data && response.data.data
                  ? response.data.data
                  : [],
              refresh:
                params && params.Page === 1 ? true : this.refreshOrdersData,
            })

            this.$store.commit('accommodationType/UPDATE_PAGINATION', {
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
      this.$store.commit(
        'accommodationType/UPDATE_PAGINATION',
        this.defaultPagination
      )
    },
    confirmDelete(target) {
      this.visiConfirm(
        `Are you sure you want to delete "${target.title}" Accommodation Type`
      ).onOk(() => {
        this.$store
          .dispatch('accommodationType/deleteById', target.id)
          .then((response) => {
            if (response.status) {
              if (this.$refs.accommodationTypeGrid)
                this.$refs.accommodationTypeGrid.refresh()
              this.showSuccess(response.message)
            } else if (response.message) this.showError(response.message)
          })
      })
    },
  },
  created() {
    this.$store.dispatch('common/getAllLocation')

    if (this.$route.params.id)
      this.updateDialogState({
        dialog: 'AccommodationTypeDetail',
        val: true,
        properties: {
          id: this.$route.params.id,
        },
      })
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id)
      this.updateDialogState({
        dialog: 'AccommodationTypeDetail',
        val: true,
        properties: {
          id: to.params.id,
        },
      })

    next()
  },
}
</script>
