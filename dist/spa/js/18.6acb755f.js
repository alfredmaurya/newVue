(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[18],{"9bf8":function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("visi-dialog",{attrs:{dialog:t.dialog,title:"View Facility",cardClass:"q-card-md",beforeShow:t.beforeShow,loading:t.loading,"remove-param-on-hide":""},scopedSlots:t._u([{key:"ScrollContent",fn:function(){return[s("div",{staticClass:"form q-pa-md"},[s("div",{staticClass:"row q-col-gutter-md"},[s("div",{staticClass:"col-12 col-md-12"},[s("div",{staticClass:"row q-col-gutter-md"},[s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Facility Name ")]),t._v("\n                "+t._s(t.detail.title||t.noDataPlaceHolder)+"\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Description")]),t._v("\n                "+t._s(t.detail.description||t.noDataPlaceHolder)+"\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Status")]),s("q-badge",{class:t.statues[t.detail.status]?t.statues[t.detail.status].class:""},[t._v("\n                  "+t._s(t.statues[t.detail.status]?t.statues[t.detail.status].status:"")+"\n                ")])],1)]),s("div",{staticClass:"col-12 col-md-6"}),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Created At")]),t._v("\n                "+t._s(t._f("formatDate")(t.detail.created_at,"H:mm A, MMM DD, YYYY"))+"\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Created By")]),t.detail.employee?[t._v("\n                  "+t._s(t.detail.employee.first_name+" "+t.detail.employee.last_name)+"\n                ")]:[t._v(t._s(t.noDataPlaceHolder)+" ")]],2)])])])])])]},proxy:!0}])})},e=[],l=(s("d3b7"),s("e6cf"),s("a79d"),{name:"FacilityDetail",data:function(){return{dialog:"FacilityDetail",detail:{},loading:!1}},computed:{properties:function(){return this.getDialogProperties(this.dialog)}},methods:{beforeShow:function(){var t=this;this.properties.id&&(this.loading=!0,this.$store.dispatch("facility/detailById",this.properties.id).then((function(a){a.status&&a.data?t.detail=a.data:t.updateDialogState({dialog:t.dialog,val:!1})})).finally((function(){t.loading=!1})))}}}),o=l,d=s("2877"),c=s("f09f"),n=s("58a81"),r=s("eebe"),u=s.n(r),m=Object(d["a"])(o,i,e,!1,null,null,null);a["default"]=m.exports;u()(m,"components",{QCard:c["a"],QBadge:n["a"]})}}]);