(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{"68d1":function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("visi-dialog",{attrs:{dialog:e.dialog,title:e.title,"show-footer":"",cardClass:"q-card-md",beforeShow:e.beforeShow,loading:e.loading,onHide:e.onHide,onSubmit:e.onSubmit,submitting:e.submitting},scopedSlots:e._u([{key:"ScrollContent",fn:function(){return[s("div",{staticClass:"form q-pa-md"},[s("div",{staticClass:"row q-col-gutter-md"},[s("div",{staticClass:"col-12 col-md-12"},[s("div",{staticClass:"form-field q-pb-none"},[s("div",{staticClass:"alert bg-light-primary text-primary"},[e._v("\n              *Required Fields\n              ")])])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"First Name*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.first_name,callback:function(t){e.$set(e.detail,"first_name","string"===typeof t?t.trim():t)},expression:"detail.first_name"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Last Name*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.last_name,callback:function(t){e.$set(e.detail,"last_name","string"===typeof t?t.trim():t)},expression:"detail.last_name"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Email*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.email,callback:function(t){e.$set(e.detail,"email","string"===typeof t?t.trim():t)},expression:"detail.email"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Phone*",mask:"(###)-###-####","lazy-rules":"",rules:[e.$rules.required(),e.$rules.validatePhone()]},model:{value:e.detail.mobile,callback:function(t){e.$set(e.detail,"mobile","string"===typeof t?t.trim():t)},expression:"detail.mobile"}})],1)]),"add"==e.type?[s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Password*",type:"password","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.password,callback:function(t){e.$set(e.detail,"password","string"===typeof t?t.trim():t)},expression:"detail.password"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Confirm Password*","lazy-rules":"",type:"password",rules:[e.$rules.required(),e.$rules.sameAs(e.detail.password,"Password & Confirm Password\n          Should be Same.")]},model:{value:e.detail.confirmPassword,callback:function(t){e.$set(e.detail,"confirmPassword","string"===typeof t?t.trim():t)},expression:"detail.confirmPassword"}})],1)])]:e._e(),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-select",{attrs:{outlined:"",label:"Select Role*","lazy-rules":"",options:e.roleOptions,rules:[e.$rules.required()],"option-label":"role_name","option-value":"id","emit-value":"","map-options":"","use-input":""},on:{filter:e.filterRole},scopedSlots:e._u([{key:"no-option",fn:function(){return[s("q-item",[s("q-item-section",{staticClass:"text-grey"},[e._v("\n                    No results\n                  ")])],1)]},proxy:!0}]),model:{value:e.detail.role_id,callback:function(t){e.$set(e.detail,"role_id",t)},expression:"detail.role_id"}})],1)]),s("div",{staticClass:"col-12 col-md-12"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-toggle",{attrs:{label:"Active","left-label":"","true-value":1,"false-value":0,"checked-icon":"check","unchecked-icon":"clear",size:"lg"},model:{value:e.detail.status,callback:function(t){e.$set(e.detail,"status",t)},expression:"detail.status"}})],1)])],2)])]},proxy:!0}])})},l=[],a=s("7037"),o=s.n(a),r=s("ded3"),n=s.n(r),d=(s("4de4"),s("d3b7"),s("e9c4"),s("cca6"),s("e6cf"),s("a79d"),s("2f62"));function c(){return{roleOptions:[],dialog:"EmployeeForm",title:"Add Employee",type:"add",detail:{first_name:"",last_name:"",email:"",password:"",confirmPassword:"",mobile:"",status:1,role_id:""},loading:!1,submitting:!1}}var u={name:"EmployeeForm",data:c,computed:n()({properties:function(){return this.getDialogProperties(this.dialog)}},Object(d["b"])("common",["roles"])),methods:{filterRole:function(e,t){var s=this;t(""!==e?function(){var t=e.toLowerCase();s.roleOptions=s.roles.filter((function(e){return e.role_name.toLowerCase().indexOf(t)>-1}))}:function(){s.roleOptions=s.roles})},beforeShow:function(){this.roleOptions=this.roles,this.properties.id&&(this.type="edit",this.title="Edit Employee",this.detail=JSON.parse(JSON.stringify(this.properties)))},onHide:function(){Object.assign(this.$data,c())},onSubmit:function(){var e=this;this.submitting=!0,this.$store.dispatch("employee/addUpdate",this.detail).then((function(t){if(t.status)e.updateDialogState({dialog:"EmployeeForm",val:!1}),e.showSuccess(t.message);else if(t.message)if("object"===o()(t.message))for(var s in t.message)e.showError(t.message[s]);else("string"===typeof t.message||t.message instanceof String)&&e.showError(t.message)})).finally((function(){e.submitting=!1}))}}},m=u,p=s("2877"),f=s("f09f"),b=s("27f9"),v=s("ddd8"),g=s("66e5"),h=s("4074"),y=s("9564"),w=s("eebe"),q=s.n(w),C=Object(p["a"])(m,i,l,!1,null,null,null);t["default"]=C.exports;q()(C,"components",{QCard:f["a"],QInput:b["a"],QSelect:v["a"],QItem:g["a"],QItemSection:h["a"],QToggle:y["a"]})}}]);