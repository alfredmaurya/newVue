(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{1613:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("q-form",{staticClass:"q-gutter-md",on:{submit:t.onSubmit}},[a("q-card",{staticClass:"q-pa-lg shadow-0 authCard"},[a("q-card-section",{staticClass:"q-py-none"},[a("h2",{staticClass:"q-ma-none text-weight-medium text-h6 text-left text-dark"},[t._v("\n          Forgot Password\n        ")])]),a("q-card-section",[a("div",{staticClass:"form-field"},[a("q-input",{attrs:{type:"email",label:"Email",rules:[t.$rules.required(),t.$rules.email()],"lazy-rules":""},scopedSlots:t._u([{key:"append",fn:function(){return[a("q-icon",{directives:[{name:"show",rawName:"v-show",value:t.credentials.email,expression:"credentials.email"}],attrs:{name:"cancel"},on:{click:function(e){t.credentials.email=""}}})]},proxy:!0}]),model:{value:t.credentials.email,callback:function(e){t.$set(t.credentials,"email","string"===typeof e?e.trim():e)},expression:"credentials.email"}})],1)]),a("q-card-actions",{staticClass:"q-px-md form-action"},[a("q-btn",{staticClass:"full-width",attrs:{"no-caps":"",unelevated:"",color:"primary",size:"md",label:"Reset Password",type:"submit",loading:t.submitting}})],1),a("q-card-section",{staticClass:"q-px-md text-center"},[a("router-link",{staticClass:"text-primary no-underline",attrs:{to:{name:"Login"}}},[t._v("\n          Back to Login?\n        ")])],1)],1)],1)],1)},n=[],i=a("ded3"),c=a.n(i),o=(a("d3b7"),a("e6cf"),a("a79d"),a("ed08")),r={name:"Login",data:function(){return{submitting:!1,credentials:{email:""}}},methods:{onSubmit:function(){var t=this;this.submitting=!0,this.$store.dispatch("auth/forgotPassword",c()(c()({},this.credentials),{},{link:"".concat(Object(o["c"])(),"/reset-password/")})).then((function(e){e.status&&e.data?(t.showSuccess(e.data.data),t.$router.push({name:"Login"})):t.showError(e.message,"bottom-right")})).catch((function(e){e&&e.message&&t.showError(e.message,"bottom-right")})).finally((function(){t.submitting=!1}))}}},l=r,d=(a("4740"),a("2877")),u=a("0378"),m=a("f09f"),f=a("a370"),p=a("27f9"),h=a("0016"),b=a("4b7e"),g=a("9c40"),w=a("eebe"),q=a.n(w),C=Object(d["a"])(l,s,n,!1,null,"80a6fcf8",null);e["default"]=C.exports;q()(C,"components",{QForm:u["a"],QCard:m["a"],QCardSection:f["a"],QInput:p["a"],QIcon:h["a"],QCardActions:b["a"],QBtn:g["a"]})},4740:function(t,e,a){"use strict";a("c2cc")},c2cc:function(t,e,a){}}]);