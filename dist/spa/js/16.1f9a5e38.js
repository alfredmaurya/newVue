(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[16],{"38e0":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("visi-dialog",{attrs:{dialog:t.dialog,title:"View Employee",cardClass:"q-card-md",beforeShow:t.beforeShow,loading:t.loading,"remove-param-on-hide":""},scopedSlots:t._u([{key:"ScrollContent",fn:function(){return[s("div",{staticClass:"form q-pa-md"},[s("div",{staticClass:"row q-col-gutter-md"},[s("div",{staticClass:"col-12 col-md-12"},[s("div",{staticClass:"row q-col-gutter-md q-mb-lg items-center"},[s("div",{staticClass:"col-12 col-md-auto"},[s("Avtar",{attrs:{userName:t.detail.first_name+" "+t.detail.last_name,imageUrl:t.detail.profileImageUrl,size:"100px"}})],1),s("div",{staticClass:"col-12 col-md"},[s("h3",{staticClass:"text-h6 text-dark q-mt-none q-mb-sm",domProps:{textContent:t._s(t.detail.first_name+" "+t.detail.last_name)}}),s("q-btn",{staticClass:"no-hover",attrs:{unelevated:"","no-caps":"",color:"light-primary","text-color":"primary",size:"13px",padding:"5px 15px"}},[s("q-icon",{staticClass:"q-mr-sm",attrs:{size:"15px",name:"password"}}),t._v(" Reset\n                Password\n              ")],1),s("q-btn",{staticClass:"q-ml-sm no-hover",attrs:{unelevated:"","no-caps":"",color:"light-primary","text-color":"primary",size:"13px",padding:"5px 15px",label:""}},[s("q-icon",{staticClass:"q-mr-sm",attrs:{size:"15px",name:"person_remove"}}),t._v("\n                Delete User\n              ")],1)],1)])]),s("div",{staticClass:"col-12 col-md-12"},[s("div",{staticClass:"row q-col-gutter-md"},[s("div",{staticClass:"col-12 col-md-12"},[s("h3",{staticClass:"text-h6 text-dark q-my-none"},[t._v("\n                Employee Information\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("First Name ")]),t._v("\n                "+t._s(t.detail.first_name||t.noDataPlaceHolder)+"\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Last Name ")]),t._v("\n                "+t._s(t.detail.last_name||t.noDataPlaceHolder)+"\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Email ")]),t._v("\n                "+t._s(t.detail.email||t.noDataPlaceHolder)+"\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Phone")]),t._v("\n                "+t._s(t.detail.mobile||t.noDataPlaceHolder)+"\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Status")]),s("q-badge",{class:t.statues[t.detail.status]?t.statues[t.detail.status].class:""},[t._v("\n                  "+t._s(t.statues[t.detail.status]?t.statues[t.detail.status].status:"")+"\n                ")])],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Assigned Role")]),t._v("\n                "+t._s(t.detail.role&&t.detail.role.role_name?t.detail.role.role_name:t.noDataPlaceHolder)+"\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Created At")]),t._v("\n                "+t._s(t._f("formatDate")(t.detail.created_at,"H:mm A, MMM DD, YYYY"))+"\n              ")])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-text"},[s("span",[t._v("Created By")]),t.detail.employee?[t._v("\n                  "+t._s(t.detail.employee.first_name+" "+t.detail.employee.last_name)+"\n                ")]:[t._v(t._s(t.noDataPlaceHolder)+" ")]],2)])])])])])]},proxy:!0}])})},l=[],i=(s("d3b7"),s("e6cf"),s("a79d"),{name:"EmployeeDetail",data:function(){return{dialog:"EmployeeDetail",detail:{},loading:!1}},computed:{properties:function(){return this.getDialogProperties(this.dialog)}},methods:{beforeShow:function(){var t=this;this.properties.id&&(this.loading=!0,this.$store.dispatch("employee/detailById",this.properties.id).then((function(a){a.status&&a.data?t.detail=a.data:t.updateDialogState({dialog:t.dialog,val:!1})})).finally((function(){t.loading=!1})))}}}),o=i,d=s("2877"),n=s("f09f"),r=s("9c40"),c=s("0016"),m=s("58a81"),p=s("eebe"),v=s.n(p),_=Object(d["a"])(o,e,l,!1,null,null,null);a["default"]=_.exports;v()(_,"components",{QCard:n["a"],QBtn:r["a"],QIcon:c["a"],QBadge:m["a"]})}}]);