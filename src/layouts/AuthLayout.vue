<template>
  <!-- <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <q-img src="banner-1.jpg" class="bg-image" />
    <div class="column index-1">
     <div class="row" v-if="false">
        <h5 class="text-h5 text-white q-my-md">Blue Book</h5>
      </div> 
      <h1 class="q-ma-none text-left"><img src="logo.png" alt="" /></h1>
      <router-view />
    </div>
  </div> -->
  <div class="fullscreen row items-stretch full-width">
    <div
      class="col-sm-12 col-md-6 overflow-hidden authSideImage"
      style="
        position: relative;
        background: url(banner-1.jpeg) center center no-repeat;
        background-size: cover;
      "
    >
      <div class="up">
        <h1 class="text-h4 text-weight-light text-white q-mb-sm">
          Blue Book - Start your next adventure here...
        </h1>
        <p class="text-h6 text-white">
          <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit. -->
        </p>
      </div>
    </div>
    <div class="col-12 col-md-6 bg-white">
      <div class="flex column items-center justify-center full-height">
        <h2 class="q-ma-none text-left">
          <img src="logo.png" height="36px" />
        </h2>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  created() {
    this.applyThemeChanges()
  },
}
</script>

<style lang="scss">
.authCard {
  width: 400px;
}
.bg-image {
  /* position: fixed; */
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 0;
}
.index-1 {
  z-index: 1;
}
.authlayout {
}
.authSideImage {
  background-color: $primary !important;
  .up {
    position: absolute;
    z-index: 1;
    width: 100%;
    max-width: 500px;
    text-align: center;
    margin: 0 auto;
    padding: 0 50px;
    top: 80%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #29aae1;
    // background: -moz-linear-gradient(-45deg, #29aae1 0%, #262261 100%);
    // background: -webkit-linear-gradient(-45deg, #29aae1 0%, #262261 100%);
    // background: linear-gradient(135deg, #29aae1 0%, #262261 100%);
    // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#29aae1', endColorstr='#262261',GradientType=1 );
    opacity: 0.5;
    z-index: 0;
    // -webkit-backdrop-filter: blur(7px);
    // backdrop-filter: blur(7px);
  }
}
@media (max-width: 767px) {
  .authCard {
    width: 100%;
  }
  .authSideImage {
    display: none;
  }
}
</style>
