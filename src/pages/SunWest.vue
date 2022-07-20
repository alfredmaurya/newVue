<template>
  <q-page :style="!isMobile ? 'padding-top: 70px' : ''">
    <q-page-sticky expand position="top" v-if="!isMobile">
      <q-toolbar class="bg-white text-dark q-pa-none" inset>
        <q-toolbar-title class="text-dark col-auto q-pa-sm">
          Buds Maps
        </q-toolbar-title>
        <q-breadcrumbs class="text-grey col-auto" gutter="sm" separator="/">
          <q-breadcrumbs-el
            label="Dashboard"
            :to="{
              name: 'Homepage',
            }"
          />
          <q-breadcrumbs-el label="Buds Maps" />
        </q-breadcrumbs>
      </q-toolbar>
    </q-page-sticky>
    <div class="container q-pa-lg">
      <div class="block">
        <div class="q-pa-md">
          <div class="booking-1">
            <div>
              <div class="b1-i1">
                <div
                  class="row q-col-gutter-md q-mb-md"
                  style="background: wheat"
                >
                  <div class="col-12 col-md-3">
                    <h3 class="q-my-none text-subtitle2 text-uppercase">RVS</h3>
                    <ul class="rvs-rooms">
                      <li> <span class="deluxe q-mr-sm"></span> DELUXE 16’ </li>
                      <li>
                        <span class="standard-14 q-mr-sm"></span> STANDARD 14’
                      </li>
                      <li>
                        <span class="standard-12 q-mr-sm"></span> STANDARD 12’
                      </li>
                      <li>
                        <span class="standard-11 q-mr-sm"></span> STANDARD 11’
                      </li>
                    </ul>
                  </div>
                  <div class="col-12 col-md-3">
                    <h3 class="q-my-none text-subtitle2 text-uppercase"
                      >Cabins</h3
                    >
                    <ul class="rvs-rooms">
                      <li>
                        <span class="corporate q-mr-sm"></span> Corporate
                      </li>
                      <li>
                        <span class="container-studios q-mr-sm"></span>
                        Container Studios
                      </li>
                      <li>
                        <span class="modular-studios q-mr-sm"></span> Modular
                        Studios
                      </li>
                      <li>
                        <span class="manufa-home q-mr-sm"></span> Manufactured
                        Home
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="b1-i2 b1-flex" @click="mapClick">
                  <div class="b1-row--1">
                    <ul class="home--row" data-title="ROW K">
                      <li v-for="n in 32" :key="n" id="isRoom">
                        <a href="javascript:void(0);">
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                    <ul class="home--no">
                      <li v-for="n in 32" :key="n"
                        ><a href="javascript:void(0);">{{ n }}</a></li
                      >
                    </ul>
                    <ul class="home--row" data-title="ROW J">
                      <li v-for="n in 32" :key="n">
                        <a
                          href="javascript:void(0);"
                          :class="
                            n === 19
                              ? 'standard-12'
                              : n === 32
                              ? 'standard-11'
                              : ''
                          "
                        >
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="b1-way">
                    <q-icon
                      color="grey-5"
                      size="24px"
                      name="sync_alt"
                      class="rotate-90"
                    />
                  </div>
                  <div class="b1-row--1">
                    <ul class="home--row" data-title="ROW I">
                      <li v-for="n in 32" :key="n">
                        <a href="javascript:void(0);">
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                    <ul class="home--no">
                      <li v-for="n in 32" :key="n"
                        ><a href="javascript:void(0);">{{ n }}</a></li
                      >
                    </ul>
                    <ul class="home--row" data-title="ROW H">
                      <li v-for="n in 32" :key="n">
                        <a href="javascript:void(0);">
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="b1-way">
                    <q-icon
                      color="grey-5"
                      size="24px"
                      name="sync_alt"
                      class="rotate-90"
                    />
                  </div>
                  <div class="b1-row--1">
                    <ul class="home--row" data-title="ROW G">
                      <li v-for="n in 32" :key="n">
                        <a href="javascript:void(0);">
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                    <ul class="home--no">
                      <li v-for="n in 32" :key="n"
                        ><a href="javascript:void(0);">{{ n }}</a></li
                      >
                    </ul>
                    <ul class="home--row" data-title="ROW F">
                      <li v-for="n in 32" :key="n">
                        <a href="javascript:void(0);">
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="b1-way items-start">
                    <q-icon
                      color="grey-5"
                      size="24px"
                      name="sync_alt"
                      class="rotate-90"
                    />
                    <q-icon
                      color="grey-5"
                      size="24px"
                      name="sync_alt"
                      class="absolute-bottom rotate-90"
                    />
                    <span class="absolute rotate-90">WILLOW ST</span>
                  </div>
                  <div class="b1-row--1">
                    <ul class="home--row" data-title="ROW E">
                      <li v-for="n in 32" :key="n">
                        <a href="javascript:void(0);">
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                    <ul class="home--no">
                      <li v-for="n in 32" :key="n"
                        ><a href="javascript:void(0);">{{ n }}</a></li
                      >
                    </ul>
                    <ul class="home--row" data-title="ROW D">
                      <li v-for="n in 32" :key="n">
                        <a href="javascript:void(0);">
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="b1-way">
                    <q-icon
                      color="grey-5"
                      size="24px"
                      name="sync_alt"
                      class="rotate-90"
                    />
                  </div>
                  <div class="b1-row--1">
                    <ul class="home--row" data-title="ROW C">
                      <li v-for="n in 32" :key="n">
                        <a
                          href="javascript:void(0);"
                          :class="
                            n === 15
                              ? 'modular-studios'
                              : n === 16
                              ? 'modular-studios'
                              : n === 17
                              ? 'modular-studios'
                              : 'corporate'
                          "
                        >
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                    <ul class="home--no">
                      <li v-for="n in 32" :key="n"
                        ><a href="javascript:void(0);">{{ n }}</a></li
                      >
                    </ul>
                    <ul class="home--row" data-title="ROW B">
                      <li v-for="n in 32" :key="n">
                        <a href="javascript:void(0);" class="corporate">
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="b1-way items-start">
                    <q-icon
                      color="grey-5"
                      size="24px"
                      name="sync_alt"
                      class="rotate-90"
                    />
                    <q-icon
                      color="grey-5"
                      size="24px"
                      name="sync_alt"
                      class="absolute-bottom rotate-90"
                    />
                  </div>
                  <div class="b1-row--1">
                    <ul class="home--row" data-title="ROW A">
                      <li v-for="n in 32" :key="n">
                        <a href="javascript:void(0);" class="corporate">
                          <q-tooltip content-class="bg-indigo" :offset="[0, 8]">
                            Room {{ n }}
                          </q-tooltip>
                        </a>
                      </li>
                    </ul>
                    <ul class="home--no">
                      <li v-for="n in 32" :key="n"
                        ><a href="javascript:void(0);">{{ n }}</a></li
                      >
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  methods: {
    mapClick(event) {
      if (event.target.id == 'isRoom') alert()
    },
  },
}
</script>

<style lang="scss">
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    margin: 0;
    padding: 0;
  }
}
.booking-1 {
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  .b1-i1 {
    background: $primary;
    padding: 5px;
    border-radius: 8px;
  }
  .b1-i2 {
    background: #fff;
    padding: 16px;
    border-radius: 4px;
  }
  .b1-flex {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
    .b1-row--1 {
      flex: 10000 0 0;
    }
    .b1-way {
      background: #fff;
      flex: 0 0 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      &.items-start {
        align-items: flex-start;
      }
      span {
        top: 50%;
        width: 200px;
        text-align: center;
      }
    }
  }
  .b1-row--1 {
    display: flex;
    flex-direction: row;
    li {
      border-bottom: 2px solid #fff;
      &:last-child {
        border-bottom: 0;
      }
    }
    .home--row {
      flex: 10000 0 0;
      position: relative;
      &[data-title] {
        &:before {
          content: attr(data-title);
          position: absolute;
          background: #fff;
          padding: 5px 10px;
          width: 80px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          transform: rotate(90deg) /* rtl:ignore */;
          top: 16px;
          left: -15px;
        }
      }
      li {
        a {
          display: block;
          background: #f0c066;
          height: 20px;
          &.deluxe {
            background: #f0c066;
          }
          &.standard-14 {
            background: #00a79e;
          }
          &.standard-12 {
            background: #f7941e;
          }
          &.standard-11 {
            background: #f15a29;
          }
          &.corporate {
            background: #b1b4b6;
          }
          &.container-studios {
            background: #4d9ad4;
            background: -moz-linear-gradient(
              top,
              #4d9ad4 0%,
              #4d9ad4 50%,
              #326891 50%,
              #326891 100%
            );
            background: -webkit-linear-gradient(
              top,
              #4d9ad4 0%,
              #4d9ad4 50%,
              #326891 50%,
              #326891 100%
            );
            background: linear-gradient(
              to bottom,
              #4d9ad4 0%,
              #4d9ad4 50%,
              #326891 50%,
              #326891 100%
            );
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4d9ad4', endColorstr='#326891',GradientType=0 );
          }
          &.modular-studios {
            background: #00a79e;
            background: -moz-linear-gradient(
              top,
              #00a79e 0%,
              #00a79e 50%,
              #007a72 50%,
              #007a72 100%
            );
            background: -webkit-linear-gradient(
              top,
              #00a79e 0%,
              #00a79e 50%,
              #007a72 50%,
              #007a72 100%
            );
            background: linear-gradient(
              to bottom,
              #00a79e 0%,
              #00a79e 50%,
              #007a72 50%,
              #007a72 100%
            );
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a79e', endColorstr='#007a72',GradientType=0 );
          }
          &.manufa-home {
            background: #da1c5c;
            background: -moz-linear-gradient(
              top,
              #da1c5c 0%,
              #da1c5c 50%,
              #9e1f63 50%,
              #9e1f63 100%
            );
            background: -webkit-linear-gradient(
              top,
              #da1c5c 0%,
              #da1c5c 50%,
              #9e1f63 50%,
              #9e1f63 100%
            );
            background: linear-gradient(
              to bottom,
              #da1c5c 0%,
              #da1c5c 50%,
              #9e1f63 50%,
              #9e1f63 100%
            );
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#da1c5c', endColorstr='#9e1f63',GradientType=0 );
          }

          &:hover {
            background: #79c143;
          }
        }
      }
    }
    .home--no {
      flex: 1 0 30px;
      text-align: center;
      border-left: 2px solid #fff;
      border-right: 2px solid #fff;
      li {
        border: none;
        &:last-child {
          a {
            height: 20px;
          }
        }
      }
      a {
        display: block;
        font-size: 11px;
        font-weight: bold;
        height: 22px;
        line-height: 20px;
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
.rvs-rooms {
  li {
    margin: 5px 0;
    display: block;
    span {
      display: inline-block;
      width: 30px;
      height: 20px;
      vertical-align: middle;
      &.deluxe {
        background: #f0c066;
      }
      &.standard-14 {
        background: #00a79e;
      }
      &.standard-12 {
        background: #f7941e;
      }
      &.standard-11 {
        background: #f15a29;
      }
      &.corporate {
        background: #b1b4b6;
      }
      &.container-studios {
        background: #4d9ad4;
        background: -moz-linear-gradient(
          top,
          #4d9ad4 0%,
          #4d9ad4 50%,
          #326891 50%,
          #326891 100%
        );
        background: -webkit-linear-gradient(
          top,
          #4d9ad4 0%,
          #4d9ad4 50%,
          #326891 50%,
          #326891 100%
        );
        background: linear-gradient(
          to bottom,
          #4d9ad4 0%,
          #4d9ad4 50%,
          #326891 50%,
          #326891 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4d9ad4', endColorstr='#326891',GradientType=0 );
      }
      &.modular-studios {
        background: #00a79e;
        background: -moz-linear-gradient(
          top,
          #00a79e 0%,
          #00a79e 50%,
          #007a72 50%,
          #007a72 100%
        );
        background: -webkit-linear-gradient(
          top,
          #00a79e 0%,
          #00a79e 50%,
          #007a72 50%,
          #007a72 100%
        );
        background: linear-gradient(
          to bottom,
          #00a79e 0%,
          #00a79e 50%,
          #007a72 50%,
          #007a72 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a79e', endColorstr='#007a72',GradientType=0 );
      }
      &.manufa-home {
        background: #da1c5c;
        background: -moz-linear-gradient(
          top,
          #da1c5c 0%,
          #da1c5c 50%,
          #9e1f63 50%,
          #9e1f63 100%
        );
        background: -webkit-linear-gradient(
          top,
          #da1c5c 0%,
          #da1c5c 50%,
          #9e1f63 50%,
          #9e1f63 100%
        );
        background: linear-gradient(
          to bottom,
          #da1c5c 0%,
          #da1c5c 50%,
          #9e1f63 50%,
          #9e1f63 100%
        );
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#da1c5c', endColorstr='#9e1f63',GradientType=0 );
      }
    }
  }
}
.empty {
  margin-top: 25px;
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  font-size: 14px;
  color: #314154;
}
// .empty p {
//   font-size: 18px;
// }
</style>
