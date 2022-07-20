<template>
  <q-page :style="!isMobile ? 'padding-top: 70px' : ''">
    <q-page-sticky expand position="top" v-if="!isMobile">
      <q-toolbar class="bg-white text-dark q-pa-none" inset>
        <q-toolbar-title class="text-dark col-auto q-pa-sm">
          Employees
        </q-toolbar-title>
        <q-breadcrumbs class="text-grey col-auto" gutter="sm" separator="/">
          <q-breadcrumbs-el
            label="Dashboard"
            :to="{
              name: 'Homepage',
            }"
          />
          <q-breadcrumbs-el label="Employees" />
        </q-breadcrumbs>
        <div class="breadcrumb-filters ml-auto flex q-mr-xs">
          <q-btn
            v-if="hasPermission('employee_add')"
            @click="
              updateDialogState({
                dialog: 'EmployeeForm',
                val: true,
              })
            "
            unelevated
            color="primary"
            padding="5px 15px 5px 10px"
            size="11px"
          >
            <q-icon name="add" class="q-mr-xs" />Add</q-btn
          >
        </div>
      </q-toolbar>
    </q-page-sticky>
    <div class="container q-pa-lg">
      <visi-grid
        title="Employees"
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
        ref="employeeGrid"
      >
        <template v-slot:body-cell-first_name="props">
          <div class="column-dropdown">
            <q-list>
              <q-item
                class="q-pa-none no-hover"
                clickable
                :to="{ name: 'Employee', params: { id: props.row.id } }"
              >
                <Avtar
                  :userName="`${props.row.first_name} ${props.row.last_name}`"
                  size="35px"
                  avtar
                />
                <q-item-section>
                  <q-item-label>
                    <strong>
                      {{ props.row.first_name }} {{ props.row.last_name }}
                    </strong>
                  </q-item-label>
                  <q-item-label caption>{{ props.row.email }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </template>

        <template v-slot:body-cell-role="props">
          {{
            props.row.role
              ? props.row.role.role_name || noDataPlaceHolder
              : noDataPlaceHolder
          }}
        </template>
        <template v-slot:body-cell-status="props">
          <q-badge :class="statues[props.row.status].class">
            {{ statues[props.row.status].status }}
          </q-badge>
        </template>

        <template v-slot:body-cell-created_at="props">
          {{ props.row.created_at | formatDate('H:mm A, MMM DD, YYYY') }}
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
                :to="{ name: 'Employee', params: { id: props.row.id } }"
              >
                <q-item-section>
                  <q-item-label>
                    <q-icon name="visibility" size="15px" class="q-mr-xs" />
                    View
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="hasPermission('employee_edit')"
                clickable
                v-close-popup
                @click="
                  updateDialogState({
                    dialog: 'EmployeeForm',
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
                v-if="hasPermission('employee_delete')"
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
      </visi-grid>
    </div>
    <Form v-if="hasPermission(['employee_add', 'employee_edit'])" />
    <Detail />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageEmployee',
  computed: {
    ...mapGetters('employee', ['pagination', 'listing']),
    localPagination() {
      return this.pagination
    },
  },
  components: {
    Form: () => import('components/employee/form'),
    Detail: () => import('components/employee/detail'),
  },
  data() {
    return {
      loading: false,
      refreshOrdersData: !this.$q.platform.is.mobile,
      columns: [
        {
          name: 'first_name',
          label: 'First Name',
          field: 'first_name',
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
          name: 'mobile',
          label: 'Phone',
          field: 'mobile',
          align: 'left',
          isVisible: true,
        },
        {
          name: 'role',
          label: 'Role',
          field: 'role',
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
        .dispatch('employee/getListing', params)
        .then((response) => {
          if (response && response.status) {
            this.$store.commit('employee/SET_LISTING', {
              listing:
                response && response.data && response.data.data
                  ? response.data.data
                  : [],
              refresh:
                params && params.Page === 1 ? true : this.refreshOrdersData,
            })

            this.$store.commit('employee/UPDATE_PAGINATION', {
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
      this.$store.commit('employee/UPDATE_PAGINATION', this.defaultPagination)
    },
    confirmDelete(target) {
      this.visiConfirm(
        `Are you sure you want to delete "${target.first_name}" Employee`
      ).onOk(() => {
        this.$store
          .dispatch('employee/deleteById', target.id)
          .then((response) => {
            if (response.status) {
              if (this.$refs.employeeGrid) this.$refs.employeeGrid.refresh()
              this.showSuccess(response.message)
            } else if (response.message) this.showError(response.message)
          })
      })
    },
  },
  created() {
    this.$store.dispatch('common/getAllRoles')
    if (this.$route.params.id)
      this.updateDialogState({
        dialog: 'EmployeeDetail',
        val: true,
        properties: {
          id: this.$route.params.id,
        },
      })
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id)
      this.updateDialogState({
        dialog: 'EmployeeDetail',
        val: true,
        properties: {
          id: to.params.id,
        },
      })

    next()
  },
}
</script>
