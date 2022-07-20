(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[32],{"0315":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{style:e.isMobile?"":"padding-top: 70px"},[e.isMobile?e._e():a("q-page-sticky",{attrs:{expand:"",position:"top"}},[a("q-toolbar",{staticClass:"bg-white text-dark q-pa-none",attrs:{inset:""}},[a("q-toolbar-title",{staticClass:"text-dark col-auto q-pa-sm"},[e._v("\n        Customer\n      ")]),a("q-breadcrumbs",{staticClass:"text-grey col-auto",attrs:{gutter:"sm",separator:"/"}},[a("q-breadcrumbs-el",{attrs:{label:"Dashboard",to:{name:"Homepage"}}}),a("q-breadcrumbs-el",{attrs:{label:"Customer"}})],1),a("div",{staticClass:"breadcrumb-filters ml-auto flex q-mr-xs"},[e.hasPermission("customer_add")?a("q-btn",{attrs:{unelevated:"",color:"primary",padding:"5px 15px 5px 10px",size:"11px"},on:{click:function(t){return e.updateDialogState({dialog:"CustomerForm",val:!0})}}},[a("q-icon",{staticClass:"q-mr-xs",attrs:{name:"add"}}),e._v("Add")],1):e._e()],1)],1)],1),a("div",{staticClass:"container q-pa-lg"},[a("visi-grid",{ref:"customerGrid",attrs:{title:"Customer","global-search":"",fullscreen:"",data:e.listing,columns:e.columns,loading:e.loading,onRequest:e.onRequest,pagination:e.pagination,rowKey:"id",classes:"table-theme",resetPagination:e.resetPagination,"choose-columns":"","show-refresh":""},scopedSlots:e._u([{key:"body-cell-name",fn:function(t){return[a("router-link",{attrs:{to:{name:"Customer",params:{id:t.row.id}}}},[e._v("\n          "+e._s(t.row.first_name+" "+t.row.last_name)+"\n        ")])]}},{key:"body-cell-status",fn:function(t){return[a("q-badge",{class:e.statues[t.row.status].class},[e._v("\n          "+e._s(e.statues[t.row.status].status)+"\n        ")])]}},{key:"body-cell-created_at",fn:function(t){return[e._v("\n        "+e._s(e._f("formatDate")(t.row.created_at,"H:mm A, MMM DD, YYYY"))+"\n      ")]}},{key:"body-cell-Action",fn:function(t){return[a("q-btn-dropdown",{staticClass:"action-dropdown ddropdown",attrs:{padding:"5px",flat:"",icon:"more_vert"}},[a("q-list",{staticClass:"dropdown-sm action-dropdown-box"},[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:"",to:{name:"Customer",params:{id:t.row.id}}}},[a("q-item-section",[a("q-item-label",[a("q-icon",{staticClass:"q-mr-xs",attrs:{name:"visibility",size:"15px"}}),e._v("\n                  View\n                ")],1)],1)],1),e.hasPermission("customer_edit")?a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return e.updateDialogState({dialog:"CustomerForm",val:!0,properties:t.row,refresh:!0})}}},[a("q-item-section",[a("q-item-label",[a("q-icon",{staticClass:"q-mr-xs",attrs:{name:"edit",size:"15px"}}),e._v("\n                  Edit\n                ")],1)],1)],1):e._e(),e.hasPermission("customer_delete")?a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(a){return e.confirmDelete(t.row)}}},[a("q-item-section",[a("q-item-label",[a("q-icon",{staticClass:"q-mr-xs",attrs:{name:"delete",size:"15px"}}),e._v("\n                  Delete\n                ")],1)],1)],1):e._e()],1)],1)]}}])})],1),a("Detail")],1)},i=[],o=a("ded3"),n=a.n(o),r=(a("e260"),a("d3b7"),a("e6cf"),a("3ca3"),a("ddb0"),a("4de4"),a("a79d"),a("2f62")),l={name:"PageCustomer",components:{Detail:function(){return a.e(14).then(a.bind(null,"6f26"))}},computed:n()(n()({},Object(r["b"])("customer",["pagination","listing"])),{},{localPagination:function(){return this.pagination}}),data:function(){return{loading:!1,refreshOrdersData:!this.$q.platform.is.mobile,columns:[{name:"name",label:"Customer Name",align:"left",sortable:!0,isVisible:!0,isFixed:!0},{name:"Action",label:"Action",align:"left",isVisible:!0,isFixed:!0},{name:"email",label:"Email",field:"email",align:"left",sortable:!0,isVisible:!0,isFixed:!0},{name:"phone_no",label:"Phone No.",field:"phone_no",align:"left",sortable:!0,isVisible:!0},{name:"status",label:"status",field:"status",align:"left",isVisible:!0},{name:"created_at",label:"Created At",align:"left",field:"created_at",isVisible:!0,sortable:!0}]}},methods:{onRequest:function(e){var t=this;this.loading=!0;var a={"page[number]":e.pagination.page||1,"page[size]":e.pagination.rowsPerPage||this.localPagination.rowsPerPage,search:e.filter,pagination:1};e.pagination&&e.pagination.sortBy&&(a.Sorts=e.pagination.sortBy,a.SortsType=e.pagination.descending?"desc":"asc"),this.$store.dispatch("customer/getListing",a).then((function(s){s&&s.status&&(t.$store.commit("customer/SET_LISTING",{listing:s&&s.data&&s.data.data?s.data.data:[],refresh:!(!a||1!==a.Page)||t.refreshOrdersData}),t.$store.commit("customer/UPDATE_PAGINATION",{page:s.data.current_page,rowsPerPage:s.data.per_page,rowsNumber:s.data.total,hasNext:!!s.data.next_page_url,sortBy:e.pagination&&e.pagination.sortBy||null,descending:e.pagination&&e.pagination.descending||!1}))})).finally((function(){t.loading=!1}))},resetPagination:function(){this.$store.commit("customer/UPDATE_PAGINATION",this.defaultPagination)},confirmDelete:function(e){var t=this;this.visiConfirm('Are you sure you want to delete "'.concat(e.title,'" Customer')).onOk((function(){t.$store.dispatch("customer/deleteById",e.id).then((function(e){e.status?(t.$refs.customerGrid&&t.$refs.customerGrid.refresh(),t.showSuccess(e.message)):e.message&&t.showError(e.message)}))}))}},created:function(){this.$route.params.id&&this.updateDialogState({dialog:"CustomerDetail",val:!0,properties:{id:this.$route.params.id}})},beforeRouteUpdate:function(e,t,a){e.params.id&&this.updateDialogState({dialog:"CustomerDetail",val:!0,properties:{id:e.params.id}}),a()}},c=l,d=a("2877"),m=a("9989"),u=a("de5e"),p=a("65c6"),g=a("6ac5"),b=a("ead5"),f=a("079eb"),h=a("9c40"),_=a("0016"),q=a("58a81"),w=a("f20b"),v=a("1c1c"),x=a("66e5"),C=a("4074"),P=a("0170"),y=a("7f67"),D=a("eebe"),k=a.n(D),Q=Object(d["a"])(c,s,i,!1,null,null,null);t["default"]=Q.exports;k()(Q,"components",{QPage:m["a"],QPageSticky:u["a"],QToolbar:p["a"],QToolbarTitle:g["a"],QBreadcrumbs:b["a"],QBreadcrumbsEl:f["a"],QBtn:h["a"],QIcon:_["a"],QBadge:q["a"],QBtnDropdown:w["a"],QList:v["a"],QItem:x["a"],QItemSection:C["a"],QItemLabel:P["a"]}),k()(Q,"directives",{ClosePopup:y["a"]})}}]);