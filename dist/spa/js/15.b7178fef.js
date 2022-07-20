(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{f670:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("visi-dialog",{attrs:{dialog:e.dialog,title:e.title,"show-footer":"",cardClass:"q-card-md",beforeShow:e.beforeShow,loading:e.loading,onHide:e.onHide,onSubmit:e.onSubmit,submitting:e.submitting},scopedSlots:e._u([{key:"ScrollContent",fn:function(){return[s("div",{staticClass:"form q-pa-md"},[s("div",{staticClass:"row q-col-gutter-md"},[s("div",{staticClass:"col-12 col-md-12"},[s("div",{staticClass:"form-field q-pb-none"},[s("div",{staticClass:"alert bg-light-primary text-primary"},[e._v("\n              *Required Fields\n              ")])])]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"First Name*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.first_name,callback:function(t){e.$set(e.detail,"first_name","string"===typeof t?t.trim():t)},expression:"detail.first_name"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Last Name*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.last_name,callback:function(t){e.$set(e.detail,"last_name","string"===typeof t?t.trim():t)},expression:"detail.last_name"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Email*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.email,callback:function(t){e.$set(e.detail,"email","string"===typeof t?t.trim():t)},expression:"detail.email"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Phone*",mask:"(###)-###-####","lazy-rules":"",rules:[e.$rules.required(),e.$rules.validatePhone()]},model:{value:e.detail.phone_no,callback:function(t){e.$set(e.detail,"phone_no","string"===typeof t?t.trim():t)},expression:"detail.phone_no"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Address Line1*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.address_line1,callback:function(t){e.$set(e.detail,"address_line1","string"===typeof t?t.trim():t)},expression:"detail.address_line1"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Address Line2","lazy-rules":""},model:{value:e.detail.address_line2,callback:function(t){e.$set(e.detail,"address_line2","string"===typeof t?t.trim():t)},expression:"detail.address_line2"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Cty*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.city,callback:function(t){e.$set(e.detail,"city","string"===typeof t?t.trim():t)},expression:"detail.city"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"State*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.state,callback:function(t){e.$set(e.detail,"state","string"===typeof t?t.trim():t)},expression:"detail.state"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Country*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.country,callback:function(t){e.$set(e.detail,"country","string"===typeof t?t.trim():t)},expression:"detail.country"}})],1)]),s("div",{staticClass:"col-12 col-md-6"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-input",{attrs:{outlined:"",label:"Postcode*","lazy-rules":"",rules:[e.$rules.required()]},model:{value:e.detail.postcode,callback:function(t){e.$set(e.detail,"postcode","string"===typeof t?t.trim():t)},expression:"detail.postcode"}})],1)]),s("div",{staticClass:"col-12 col-md-12"},[s("div",{staticClass:"form-field q-pb-none"},[s("q-toggle",{attrs:{label:"Active","left-label":"","true-value":1,"false-value":0,"checked-icon":"check","unchecked-icon":"clear",size:"lg"},model:{value:e.detail.status,callback:function(t){e.$set(e.detail,"status",t)},expression:"detail.status"}})],1)])])])]},proxy:!0}])})},l=[],a=s("7037"),o=s.n(a),n=s("ded3"),r=s.n(n),d=(s("4de4"),s("d3b7"),s("e9c4"),s("cca6"),s("e6cf"),s("a79d"),s("2f62"));function c(){return{roleOptions:[],dialog:"CustomerForm",title:"Add Customer",type:"add",detail:{first_name:"",last_name:"",email:"",phone_no:"",address_line1:"",address_line2:"",city:"",state:"",country:"",postcode:"",status:1},loading:!1,submitting:!1}}var u={name:"CustomerForm",data:c,computed:r()({properties:function(){return this.getDialogProperties(this.dialog)}},Object(d["b"])("common",["roles"])),methods:{filterRole:function(e,t){var s=this;t(""!==e?function(){var t=e.toLowerCase();s.roleOptions=s.roles.filter((function(e){return e.role_name.toLowerCase().indexOf(t)>-1}))}:function(){s.roleOptions=s.roles})},beforeShow:function(){this.properties.id&&(this.type="edit",this.title="Edit Customer",this.detail=JSON.parse(JSON.stringify(this.properties)))},onHide:function(){Object.assign(this.$data,c())},onSubmit:function(){var e=this;this.submitting=!0,this.$store.dispatch("customer/addUpdate",this.detail).then((function(t){if(t.status)e.updateDialogState({dialog:"CustomerForm",val:!1}),e.showSuccess(t.message),e.$root.$emit("customer-added-modified",t.data);else if(t.message)if("object"===o()(t.message))for(var s in t.message)e.showError(t.message[s]);else("string"===typeof t.message||t.message instanceof String)&&e.showError(t.message)})).finally((function(){e.submitting=!1}))}}},m=u,f=s("2877"),p=s("f09f"),b=s("27f9"),v=s("9564"),g=s("eebe"),y=s.n(g),C=Object(f["a"])(m,i,l,!1,null,null,null);t["default"]=C.exports;y()(C,"components",{QCard:p["a"],QInput:b["a"],QToggle:v["a"]})}}]);