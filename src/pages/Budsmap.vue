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
        <img id="vegetables" src="maps-buds-place1.jpg" usemap="#veg" />
        <map id="veg_map" name="veg">
          <area
            name="one"
            shape="poly"
            coords="458,610,493,610,507,659,473,659"
            href="#"
          />
          <area
            name="two"
            shape="poly"
            coords="175,617,182,610,200,610,214,659,181,659,175,650"
            href="#"
          />
          <area
            name="3"
            shape="poly"
            coords="202,610,236,611,251,659,216,659"
            href="#"
          />
          <area
            name="4"
            shape="poly"
            coords="239,610,273,610,287,659,253,659"
            href="#"
          />
          <area
            name="5"
            shape="poly"
            coords="274,610,309,611,323,658,289,658"
            href="#"
          />
          <area
            name="6"
            shape="poly"
            coords="311,610,346,610,360,659,325,659"
            href="#"
          />
          <area
            name="7"
            shape="poly"
            coords="348,610,382,610,397,658,362,659"
            href="#"
          />
          <area
            name="8"
            shape="poly"
            coords="384,610,419,610,433,659,398,659"
            href="#"
          />
          <area
            name="9"
            shape="poly"
            coords="420,609,455,609,469,658,435,658"
            href="#"
          />
          <area
            name="10"
            shape="poly"
            coords="559,615,566,610,583,609,598,657,567,657,559,650"
            href="#"
          />
          <area
            name="11"
            shape="poly"
            coords="585,609,619,609,634,657,599,657"
            href="#"
          />
          <area
            name="12"
            shape="poly"
            coords="622,609,655,610,669,657,635,657"
            href="#"
          />
          <area
            name="13"
            shape="poly"
            coords="658,609,691,609,706,658,671,657"
            href="#"
          />
          <area
            name="14"
            shape="poly"
            coords="695,609,728,609,743,657,709,658"
            href="#"
          />
          <area
            name="15"
            shape="poly"
            coords="731,609,765,609,780,658,745,657"
            href="#"
          />
          <area
            name="16"
            shape="poly"
            coords="768,609,802,609,817,658,782,658"
            href="#"
          />
          <area
            name="17"
            shape="poly"
            coords="804,609,838,609,853,658,819,658"
            href="#"
          />
          <area
            name="18"
            shape="poly"
            coords="841,609,875,609,890,658,855,658"
            href="#"
          />
          <area
            name="19"
            shape="poly"
            coords="878,609,907,610,915,615,915,650,907,658,892,657"
            href="#"
          />
          <area
            name="20"
            shape="poly"
            coords="558,545,565,540,582,539,597,587,566,587,558,580"
            href="#"
          />
          <area
            name="21"
            shape="poly"
            coords="585,539,619,539,634,587,599,587"
            href="#"
          />
          <area
            name="22"
            shape="poly"
            coords="622,539,655,540,669,587,635,587"
            href="#"
          />
          <area
            name="23"
            shape="poly"
            coords="659,539,692,539,707,588,672,587"
            href="#"
          />
          <area
            name="24"
            shape="poly"
            coords="695,539,728,539,743,587,709,588"
            href="#"
          />
          <area
            name="25"
            shape="poly"
            coords="731,539,765,539,780,588,745,587"
            href="#"
          />
          <area
            name="26"
            shape="poly"
            coords="768,539,802,539,817,588,782,588"
            href="#"
          />
          <area
            name="27"
            shape="poly"
            coords="804,539,838,539,853,588,819,588"
            href="#"
          />
          <area
            name="28"
            shape="poly"
            coords="841,539,875,539,890,588,855,588"
            href="#"
          />
          <area
            name="29"
            shape="poly"
            coords="877,539,906,540,914,545,914,580,906,588,891,587"
            href="#"
          />
          <area
            name="30"
            shape="poly"
            coords="557,475,564,470,581,469,596,517,565,517,557,510"
            href="#"
          />
          <area
            name="31"
            shape="poly"
            coords="585,469,619,469,634,517,599,517"
            href="#"
          />
          <area
            name="32"
            shape="poly"
            coords="622,469,655,470,669,517,635,517"
            href="#"
          />
          <area
            name="33"
            shape="poly"
            coords="658,469,691,469,706,518,671,517"
            href="#"
          />
          <area
            name="34"
            shape="poly"
            coords="694,469,727,469,742,517,708,518"
            href="#"
          />
          <area
            name="35"
            shape="poly"
            coords="730,469,764,469,779,518,744,517"
            href="#"
          />
          <area
            name="36"
            shape="poly"
            coords="767,469,801,469,816,518,781,518"
            href="#"
          />
          <area
            name="37"
            shape="poly"
            coords="803,469,837,469,852,518,818,518"
            href="#"
          />
          <area
            name="38"
            shape="poly"
            coords="840,469,874,469,889,518,854,518"
            href="#"
          />
          <area
            name="39"
            shape="poly"
            coords="878,469,907,470,915,475,915,510,907,518,892,517"
            href="#"
          />
          <area
            name="40"
            shape="poly"
            coords="557,405,564,400,581,399,596,447,565,447,557,440"
            href="#"
          />
          <area
            name="41"
            shape="poly"
            coords="584,399,618,399,633,447,598,447"
            href="#"
          />
          <area
            name="42"
            shape="poly"
            coords="622,399,655,400,669,447,635,447"
            href="#"
          />
          <area
            name="43"
            shape="poly"
            coords="658,399,691,399,706,448,671,447"
            href="#"
          />
          <area
            name="44"
            shape="poly"
            coords="694,399,727,399,742,447,708,448"
            href="#"
          />
          <area
            name="45"
            shape="poly"
            coords="730,399,764,399,779,448,744,447"
            href="#"
          />
          <area
            name="46"
            shape="poly"
            coords="767,399,801,399,816,448,781,448"
            href="#"
          />
          <area
            name="47"
            shape="poly"
            coords="803,399,837,399,852,448,818,448"
            href="#"
          />
          <area
            name="48"
            shape="poly"
            coords="840,399,874,399,889,448,854,448"
            href="#"
          />
          <area
            name="49"
            shape="poly"
            coords="877,399,906,400,914,405,914,440,906,448,891,447"
            href="#"
          />
          <area
            name="50"
            shape="rect"
            coords="96,251,143,266"
            href="#"
            alt="912"
          />
          <area
            name="51"
            shape="poly"
            coords="423,469,457,469,471,517,437,517"
            href="#"
          />
          <area name="52" shape="rect" coords="96,267,143,283" href="#" />
          <area name="53" shape="rect" coords="96,284,143,300" href="#" />
          <area name="54" shape="rect" coords="96,301,143,317" href="#" />
          <area name="55" shape="rect" coords="96,318,143,333" href="#" />
          <area name="77908" shape="rect" coords="96,335,143,350" href="#" />
          <area name="898" shape="rect" coords="96,352,143,367" href="#" />
          <area name="8989" shape="rect" coords="96,368,143,384" href="#" />
          <area name="56" shape="rect" coords="96,386,140,400" href="#" />
          <area name="576" shape="rect" coords="96,402,139,418" href="#" />
          <area name="57" shape="rect" coords="96,420,139,434" href="#" />
          <area name="89080" shape="rect" coords="96,436,139,452" href="#" />
          <area name="58" shape="rect" coords="96,453,139,468" href="#" />
          <area name="809890" shape="rect" coords="96,470,139,485" href="#" />
          <area name="59" shape="rect" coords="96,487,139,502" href="#" />
          <area name="60" shape="rect" coords="96,503,139,519" href="#" />
          <area name="61" shape="rect" coords="96,520,139,536" href="#" />
          <area name="62" shape="rect" coords="96,537,139,552" href="#" />
          <area name="63" shape="rect" coords="96,553,139,569" href="#" />
          <area name="64" shape="rect" coords="96,571,139,586" href="#" />
          <area name="65" shape="poly" coords="912,250" href="#" />
          <area
            name="66"
            shape="poly"
            coords="913,251,960,251,960,272,912,286,913,251,913,251,912,251,912,251,912,285,912,252"
            href="#"
          />
          <area
            name="67"
            shape="poly"
            coords="913,287,961,274,961,305,913,319,913,318,913,287,913,287,913,319"
            href="#"
          />
          <area
            name="68"
            shape="poly"
            coords="913,321,961,307,961,339,913,352,913,321"
            href="#"
          />
          <area
            name="69"
            shape="poly"
            coords="913,354,960,341,960,378,922,373,913,367,912,355"
            href="#"
          />
          <area name="70" shape="rect" coords="568,688,604,703" href="#" />
          <area name="71" shape="rect" coords="623,688,659,703" href="#" />
          <area name="72" shape="rect" coords="678,688,714,703" href="#" />
          <area name="73" shape="rect" coords="733,688,769,703" href="#" />
          <area name="74" shape="rect" coords="788,688,824,703" href="#" />
          <area name="75" shape="rect" coords="843,688,879,703" href="#" />
          <area name="76" shape="rect" coords="898,688,934,703" href="#" />
          <area
            name="77"
            shape="poly"
            coords="175,329,200,329,214,377,182,377,175,370,174,330"
            href="#"
          />
          <area
            name="78"
            shape="poly"
            coords="202,329,236,329,250,377,216,377,203,329"
            href="#"
          />
          <area name="79" shape="poly" coords="239,329,273,329" href="#" />
          <area
            name="80"
            shape="poly"
            coords="238,329,273,329,287,378,252,377"
            href="#"
          />
          <area
            name="888888"
            shape="poly"
            coords="275,329,309,329,324,377,289,378"
            href="#"
          />
          <area
            name="81"
            shape="poly"
            coords="312,329,345,329,360,377,326,377"
            href="#"
          />
          <area
            name="82"
            shape="poly"
            coords="347,329,382,329,397,377,362,377"
            href="#"
          />
          <area
            name="83"
            shape="poly"
            coords="385,329,419,329,433,378,398,378"
            href="#"
          />
          <area
            name="84"
            shape="poly"
            coords="421,329,455,329,470,377,436,378"
            href="#"
          />
          <area
            name="85"
            shape="poly"
            coords="458,329,492,329,507,378,473,377"
            href="#"
          />
          <area
            name="86"
            shape="poly"
            coords="494,329,524,329,531,335,531,371,524,377,508,377"
            href="#"
          />
          <area
            name="87"
            shape="poly"
            coords="175,405,182,400,199,399,214,447,183,447,175,440"
            href="#"
          />
          <area
            name="88"
            shape="poly"
            coords="202,399,236,399,251,447,216,447"
            href="#"
          />
          <area name="89" shape="poly" coords="238,399" href="#" />
          <area
            name="90"
            shape="poly"
            coords="240,399,273,400,287,447,253,447"
            href="#"
          />
          <area
            name="91"
            shape="poly"
            coords="276,399,309,399,324,448,289,447"
            href="#"
          />
          <area
            name="92"
            shape="poly"
            coords="312,399,345,399,360,447,326,448"
            href="#"
          />
          <area
            name="93"
            shape="poly"
            coords="348,399,382,399,397,448,362,447"
            href="#"
          />
          <area
            name="94"
            shape="poly"
            coords="385,399,419,399,434,448,399,448"
            href="#"
          />
          <area
            name="95"
            shape="poly"
            coords="421,399,455,399,470,448,436,448"
            href="#"
          />
          <area
            name="96"
            shape="poly"
            coords="458,399,492,399,507,448,472,448"
            href="#"
          />
          <area
            name="97"
            shape="poly"
            coords="494,398,523,399,531,404,531,439,523,447,508,446"
            href="#"
          />
          <area
            name="98"
            shape="poly"
            coords="175,476,182,469,200,470,214,517,182,518,175,511"
            href="#"
          />
          <area
            name="99"
            shape="poly"
            coords="203,469,237,470,251,517,216,518"
            href="#"
          />
          <area
            name="100"
            shape="poly"
            coords="239,469,272,469,288,518,253,517"
            href="#"
          />
          <area
            name="101"
            shape="poly"
            coords="275,469,311,469,325,518,290,518"
            href="#"
          />
          <area
            name="102"
            shape="poly"
            coords="386,469,421,469,435,517,400,518"
            href="#"
          />
          <area
            name="103"
            shape="poly"
            coords="460,469,493,469,508,518,473,518"
            href="#"
          />
          <area
            name="104"
            shape="poly"
            coords="496,469,524,469,531,476,531,510,525,517,509,517"
            href="#"
          />
          <area
            name="105"
            shape="poly"
            coords="175,546,182,539,200,539,214,588,181,588,175,579"
            href="#"
          />
          <area
            name="106"
            shape="poly"
            coords="202,539,236,540,251,588,216,588"
            href="#"
          />
          <area
            name="107"
            shape="poly"
            coords="239,539,273,539,287,588,253,588"
            href="#"
          />
          <area
            name="108"
            shape="poly"
            coords="274,539,309,540,323,587,289,587"
            href="#"
          />
          <area
            name="109"
            shape="poly"
            coords="311,539,346,539,360,588,325,588"
            href="#"
          />
          <area
            name="110"
            shape="poly"
            coords="348,539,382,539,397,587,362,588"
            href="#"
          />
          <area
            name="111"
            shape="poly"
            coords="384,539,419,539,433,588,398,588"
            href="#"
          />
          <area
            name="112"
            shape="poly"
            coords="420,538,455,538,469,587,435,587"
            href="#"
          />
          <area
            name="113"
            shape="poly"
            coords="457,539,492,539,506,588,472,588"
            href="#"
          />
          <area
            name="114"
            shape="poly"
            coords="494,539,523,539,531,546,531,581,524,588,507,588"
            href="#"
          />
        </map>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageBudsmap',
  data() {
    return {}
  },
  mounted() {
    // a cross reference of area names to text to be shown for each area
    var image = $('#vegetables')

    image.mapster({
      fillOpacity: 0.3,
      fillColor: 'd42e16',
      stroke: true,
      strokeColor: '25b31c',
      strokeOpacity: 0.8,
      strokeWidth: 2,
      singleSelect: true,
      mapKey: 'name',
      listKey: 'name',
      onClick: function (e) {
        // var newToolTip = defaultDipTooltip
        // update text depending on area selected
        // $('#selections').html(xref[e.key])
        console.log(e.key)
      },
      // showToolTip: true,
      // toolTipClose: ['tooltip-click', 'area-click'],
    })

    // image.mapster('set', true, '8,9')
    // image.mapster('set', true, '9')

    image.mapster('set_options', {
      areas: [
        {
          key: '8',
          selected: true,
        },
        {
          key: '9',
          selected: true,
        },
        {
          key: '81',
          selected: true,
        },
      ],
    })
  },
}
</script>
