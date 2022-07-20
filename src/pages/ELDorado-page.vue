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
        <img src="maps-eldorado-place.jpg" alt="" border="0" usemap="#Map" />
        <map name="Map">
          <area shape="rect" coords="80,617,91,643" href="#" />
          <area shape="rect" coords="95,617,106,643" href="#" />
          <area shape="rect" coords="111,617,121,643" href="#" />
          <area shape="rect" coords="125,617,137,643" href="#" />
          <area shape="rect" coords="76,528,87,554" href="#" />
          <area shape="rect" coords="91,528,102,554" href="#" />
          <area shape="rect" coords="107,528,118,554" href="#" />
          <area shape="rect" coords="122,528,133,554" href="#" />
          <area shape="rect" coords="137,528,148,554" href="#" />
          <area shape="rect" coords="153,528,164,554" href="#" />
          <area shape="rect" coords="168,528,179,554" href="#" />
          <area shape="rect" coords="182,528,195,553" href="#" />
          <area shape="rect" coords="162,574,187,586" href="#" />
          <area shape="rect" coords="161,591,187,602" href="#" />
          <area shape="rect" coords="76,483,88,509" href="#" />
          <area shape="rect" coords="90,483,102,509" href="#" />
          <area shape="rect" coords="104,483,116,509" href="#" />
          <area shape="rect" coords="119,483,131,509" href="#" />
          <area shape="rect" coords="750,567,777,578" href="#" />
          <area shape="rect" coords="751,581,776,593" href="#" />
          <area shape="rect" coords="750,596,776,607" href="#" />
          <area shape="rect" coords="744,615,755,640" href="#" />
          <area shape="rect" coords="758,615,768,641" href="#" />
          <area shape="rect" coords="771,615,783,640" href="#" />
          <area shape="rect" coords="784,615,796,640" href="#" />
          <area shape="rect" coords="797,615,809,640" href="#" />
          <area shape="rect" coords="811,615,823,640" href="#" />
          <area shape="rect" coords="825,615,835,640" href="#" />
          <area shape="rect" coords="839,615,849,641" href="#" />
          <area shape="rect" coords="852,615,863,640" href="#" />
          <area
            shape="poly"
            coords="86,337,105,345,88,438,69,432,85,337"
            href="#" />
          <area
            shape="poly"
            coords="108,347,124,353,108,444,90,440,109,347"
            href="#" />
          <area
            shape="poly"
            coords="127,354,143,359,129,449,112,445,127,354"
            href="#" />
          <area
            shape="poly"
            coords="145,359,165,364,151,454,132,450,146,360"
            href="#" />
          <area
            shape="poly"
            coords="168,365,185,368,175,458,155,454,168,367"
            href="#" />
          <area
            shape="poly"
            coords="188,369,207,373,198,460,178,460,189,369"
            href="#" />
          <area shape="poly" coords="298,427" href="#" />
          <area
            shape="poly"
            coords="211,374,229,376,221,465,201,463"
            href="#" />
          <area
            shape="poly"
            coords="232,377,251,379,244,466,224,466,233,377"
            href="#" />
          <area
            shape="poly"
            coords="254,380,272,382,266,469,246,468,254,381"
            href="#" />
          <area
            shape="poly"
            coords="275,383,294,384,288,472,270,470,275,383"
            href="#" />
          <area
            shape="poly"
            coords="299,385,317,387,308,473,290,471,299,385"
            href="#" />
          <area
            shape="poly"
            coords="320,387,339,389,331,474,312,474,321,387"
            href="#" />
          <area
            shape="poly"
            coords="342,389,361,390,353,475,334,475,342,388"
            href="#" />
          <area
            shape="poly"
            coords="364,391,383,391,374,478,356,476,365,390"
            href="#" />
          <area
            shape="poly"
            coords="388,392,406,393,397,478,378,478,388,393"
            href="#" />
          <area
            shape="poly"
            coords="408,394,427,395,419,481,400,480,409,394"
            href="#" />
          <area
            shape="poly"
            coords="430,395,450,396,440,482,421,481,432,394"
            href="#" />
          <area
            shape="poly"
            coords="453,397,472,398,461,483,444,482,454,397"
            href="#" />
          <area
            shape="poly"
            coords="476,398,494,399,483,484,464,485,476,399"
            href="#" />
          <area
            shape="poly"
            coords="498,399,516,401,505,486,487,487,498,401"
            href="#" />
          <area
            shape="poly"
            coords="518,401,535,403,524,488,509,488,519,402"
            href="#" />
          <area
            shape="poly"
            coords="539,403,556,405,545,491,528,490,539,402"
            href="#" />
          <area
            shape="poly"
            coords="560,405,577,407,567,493,549,491"
            href="#" />
          <area
            shape="poly"
            coords="581,407,598,409,589,495,571,493"
            href="#" />
          <area
            shape="poly"
            coords="601,409,620,411,609,498,592,496"
            href="#" />
          <area
            shape="poly"
            coords="623,412,642,415,630,501,613,498"
            href="#" />
          <area
            shape="poly"
            coords="645,415,663,418,650,505,633,502"
            href="#" />
          <area
            shape="poly"
            coords="667,418,685,421,669,508,653,506"
            href="#" />
          <area
            shape="poly"
            coords="689,422,708,425,690,512,673,510"
            href="#" />
          <area
            shape="poly"
            coords="711,427,730,430,711,518,693,514"
            href="#" />
          <area
            shape="poly"
            coords="733,431,751,436,732,525,714,519"
            href="#" />
          <area
            shape="poly"
            coords="754,437,774,441,752,530,735,526"
            href="#" />
          <area
            shape="poly"
            coords="776,444,795,449,770,538,754,532"
            href="#" />
          <area
            shape="poly"
            coords="798,450,818,458,786,545,773,540"
            href="#" />
          <area
            shape="poly"
            coords="822,460,840,467,802,553,789,547"
            href="#" />
          <area
            shape="poly"
            coords="843,470,860,478,817,561,805,555"
            href="#" />
          <area
            shape="poly"
            coords="863,480,885,493,836,572,822,563"
            href="#" />
          <area
            shape="poly"
            coords="888,495,906,508,850,582,838,575"
            href="#" />
          <area
            shape="poly"
            coords="909,510,926,523,864,592,854,585"
            href="#" />
          <area
            shape="poly"
            coords="868,596,929,526,950,544,881,606"
            href="#" />
          <area
            shape="poly"
            coords="952,547,969,565,894,619,884,610"
            href="#" />
          <area
            shape="poly"
            coords="970,569,985,592,908,632,898,622"
            href="#" />
          <area
            shape="poly"
            coords="986,595,997,619,919,647,911,636"
            href="#" />
          <area
            shape="poly"
            coords="138,468,152,471,148,520,135,518"
            href="#" />
          <area
            shape="poly"
            coords="155,472,171,474,167,521,151,521"
            href="#" />
          <area
            shape="poly"
            coords="173,475,188,477,185,524,169,522"
            href="#" />
          <area
            shape="poly"
            coords="191,477,206,479,203,525,189,524"
            href="#" />
          <area shape="rect" coords="205,526,228,588" href="#" />
          <area shape="rect" coords="229,526,255,588" href="#" />
          <area shape="rect" coords="257,527,282,588" href="#" />
          <area shape="rect" coords="284,526,309,589" href="#" />
          <area shape="rect" coords="312,526,336,588" href="#" />
          <area shape="rect" coords="339,527,363,589" href="#" />
          <area shape="rect" coords="368,527,392,589" href="#" />
          <area
            shape="poly"
            coords="395,528,419,528,417,588,393,588"
            href="#" />
          <area
            shape="poly"
            coords="422,528,446,528,444,589,419,588"
            href="#" />
          <area
            shape="poly"
            coords="450,528,473,528,471,589,448,589"
            href="#" />
          <area
            shape="poly"
            coords="478,529,501,529,500,589,475,589"
            href="#" />
          <area
            shape="poly"
            coords="505,530,529,530,525,589,502,589"
            href="#" />
          <area
            shape="poly"
            coords="533,530,556,530,552,590,529,590"
            href="#" />
          <area
            shape="poly"
            coords="560,529,584,530,581,590,556,590"
            href="#" />
          <area
            shape="poly"
            coords="587,530,611,531,608,589,584,590"
            href="#" />
          <area
            shape="poly"
            coords="615,530,639,532,634,590,611,591"
            href="#" />
          <area
            shape="poly"
            coords="642,532,667,532,661,590,638,591"
            href="#" />
          <area
            shape="poly"
            coords="670,532,694,532,687,591,665,591"
            href="#" />
          <area
            shape="poly"
            coords="697,533,731,542,730,566,695,561"
            href="#" />
          <area
            shape="poly"
            coords="693,565,728,570,727,594,691,591"
            href="#" />
          <area
            shape="poly"
            coords="689,594,726,598,725,621,687,618"
            href="#" />
          <area
            shape="poly"
            coords="686,621,724,625,722,650,683,650"
            href="#" />
          <area
            shape="poly"
            coords="662,595,687,595,680,650,662,650"
            href="#" />
          <area shape="rect" coords="205,590,245,656" href="#" /><area
            shape="rect"
            coords="247,590,268,656"
            href="#" /><area
            shape="rect"
            coords="269,590,290,656"
            href="#" /><area
            shape="rect"
            coords="291,591,311,656"
            href="#" /><area
            shape="rect"
            coords="313,591,332,653"
            href="#" /><area
            shape="rect"
            coords="335,591,355,653"
            href="#" /><area
            shape="rect"
            coords="356,591,376,653"
            href="#" /><area shape="rect" coords="378,591,398,653" href="#" />
          <area shape="rect" coords="400,592,419,653" href="#" /><area
            shape="rect"
            coords="422,592,442,652"
            href="#" /><area
            shape="rect"
            coords="444,592,463,652"
            href="#" /><area
            shape="rect"
            coords="466,593,486,652"
            href="#" /><area
            shape="rect"
            coords="487,593,507,652"
            href="#" /><area
            shape="rect"
            coords="509,593,529,651"
            href="#" /><area
            shape="rect"
            coords="531,593,550,651"
            href="#" /><area
            shape="rect"
            coords="553,594,572,651"
            href="#" /><area
            shape="rect"
            coords="575,594,594,651"
            href="#" /><area
            shape="rect"
            coords="597,594,616,651"
            href="#" /><area
            shape="rect"
            coords="618,594,638,651"
            href="#" /><area shape="rect" coords="640,594,660,652" href="#"
        /></map>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageELDorado',
  data() {
    return {}
  },
}
</script>
