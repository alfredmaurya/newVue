(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{bc29:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("visi-dialog",{attrs:{dialog:t.dialog,title:t.title,"show-footer":"",cardClass:"q-card-md",beforeShow:t.beforeShow,loading:t.loading,onHide:t.onHide,onSubmit:t.onSubmit,submitting:t.submitting},scopedSlots:t._u([{key:"ScrollContent",fn:function(){return[e("div",{staticClass:"form q-pa-md"},[e("div",{staticClass:"row q-col-gutter-md"},[e("div",{staticClass:"col-12 col-md-12"},[e("div",{staticClass:"form-field q-pb-none"},[e("div",{staticClass:"alert bg-light-primary text-primary"},[t._v("\n              *Required Fields\n              ")])])]),e("div",{staticClass:"col-12 col-md-12"},[e("div",{staticClass:"form-field q-pb-none"},[e("q-input",{attrs:{outlined:"",label:"Facility Name*","lazy-rules":""},model:{value:t.detail.title,callback:function(i){t.$set(t.detail,"title","string"===typeof i?i.trim():i)},expression:"detail.title"}})],1)]),e("div",{staticClass:"col-12 col-md-12"},[e("div",{staticClass:"form-field__area q-pb-none"},[e("q-input",{attrs:{outlined:"",label:"Description",type:"textarea",autogrow:""},model:{value:t.detail.description,callback:function(i){t.$set(t.detail,"description","string"===typeof i?i.trim():i)},expression:"detail.description"}})],1)]),e("div",{staticClass:"col-12 col-md-12"},[e("div",{staticClass:"form-field q-pb-none"},[e("q-toggle",{attrs:{label:"Active","left-label":"","true-value":1,"false-value":0,"checked-icon":"check","unchecked-icon":"clear",size:"lg"},model:{value:t.detail.status,callback:function(i){t.$set(t.detail,"status",i)},expression:"detail.status"}})],1)])])])]},proxy:!0}])})},a=[],l=e("7037"),o=e.n(l);e("e9c4"),e("cca6"),e("d3b7"),e("e6cf"),e("a79d");function n(){return{dialog:"FacilityForm",title:"Add Facility",detail:{title:"",description:"",status:1},loading:!1,submitting:!1}}var c={name:"FacilityForm",data:n,computed:{properties:function(){return this.getDialogProperties(this.dialog)}},methods:{beforeShow:function(){this.properties.id&&(this.title="Edit Facility",this.detail=JSON.parse(JSON.stringify(this.properties)))},onHide:function(){Object.assign(this.$data,n())},onSubmit:function(){var t=this;this.submitting=!0,this.$store.dispatch("facility/addUpdate",this.detail).then((function(i){if(i.status)t.updateDialogState({dialog:"FacilityForm",val:!1}),t.showSuccess(i.message);else if(i.message)if("object"===o()(i.message))for(var e in i.message)t.showError(i.message[e]);else("string"===typeof i.message||i.message instanceof String)&&t.showError(i.message)})).finally((function(){t.submitting=!1}))}}},r=c,d=e("2877"),u=e("f09f"),f=e("27f9"),m=e("9564"),p=e("eebe"),g=e.n(p),b=Object(d["a"])(r,s,a,!1,null,null,null);i["default"]=b.exports;g()(b,"components",{QCard:u["a"],QInput:f["a"],QToggle:m["a"]})}}]);