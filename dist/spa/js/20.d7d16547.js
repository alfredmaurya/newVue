(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"689e":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("visi-dialog",{attrs:{dialog:"UserProfile",title:"User Profile",cardClass:"sidebarAccount q-card-sm"},scopedSlots:t._u([{key:"ScrollContent",fn:function(){return[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("q-item",[a("Avtar",{attrs:{userName:t.userData.first_name+" "+t.userData.last_name}}),a("q-item-section",[a("q-item-label",{staticClass:"ellipsis"},[a("strong",{domProps:{textContent:t._s(t.userData.first_name+" "+t.userData.last_name+" "+(t.userData.role&&t.userData.role.role_name?"("+t.userData.role.role_name+")":""))}})]),a("q-item-label",{staticClass:"q-mt-xs q-mb-xs",domProps:{textContent:t._s(t.userData.email)}}),a("q-item-label",{staticClass:"accountBtn"},[a("Logout")],1)],1)],1)],1)])]},proxy:!0}])})},s=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.isMobile?a("q-item",{staticClass:"sidebarBottom inline q-pl-none q-pt-none",attrs:{clickable:"",to:"/login"},on:{click:t.logOut}},[a("q-item-section",[t._v("Logout")])],1):a("q-btn",{attrs:{to:"/login",unelevated:"","no-caps":"",color:"light-primary","text-color":"primary"},on:{click:t.logOut}},[t._v("\n  Log Out\n")])},n=[],r={name:"Logout",methods:{logOut:function(){this.$store.dispatch("auth/logOut"),this.updateDialogState({dialog:"UserProfile",val:!1}),localStorage.clear()}}},i=r,c=a("2877"),u=a("66e5"),m=a("4074"),p=a("9c40"),d=a("eebe"),g=a.n(d),f=Object(c["a"])(i,l,n,!1,null,null,null),b=f.exports;g()(f,"components",{QItem:u["a"],QItemSection:m["a"],QBtn:p["a"]});var _={name:"UserProfile",components:{Logout:b}},q=_,v=a("f09f"),C=a("0170"),h=Object(c["a"])(q,o,s,!1,null,null,null);e["default"]=h.exports;g()(h,"components",{QCard:v["a"],QItem:u["a"],QItemSection:m["a"],QItemLabel:C["a"]})}}]);