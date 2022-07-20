<template>
  <div class="b1-i1">
    <img id="MapImage" src="maps-buds-place1.jpg" usemap="#budsMap" />
    <map name="budsMap">
      <area
        v-for="(area, key, index) in areas"
        :key="`${key}-${index}`"
        :shape="area.shape"
        :coords="area.coords"
        :name="key"
        href="#"
      />
    </map>
  </div>
</template>
<script>
export default {
  name: 'PageBudsmap',
  props: {
    maintenance: {
      type: Object,
      default: new Object(),
    },
    bookings: {
      type: Object,
      default: new Object(),
    },
    fromDate: {
      type: String,
      default: new String(),
    },
    toDate:{
      type:String,
      default:new String(),
    },
    totalBookings:{
      type:Array,
      default:new Array(),
    }
  },
  watch: {
    bookings() {
      this.reDraw()
    },
    maintenance() {
      this.reDraw()
    },
  },
  data() {
    return {
      selected: {},
      imageSter: null,
      areas: {
        70: {
          coords: '912,250',
          shape: 'poly',
          id: 70,
        },
        'standard-cabins-1a': {
          coords: '568,688,585,703',
          shape: 'rect',
          id: 121,
          accType: 'standard-cabins-1a',
          acc: 'bud-s-place-cabin',
        },
        'standard-cabins-1b': {
          coords: '586,688,604,703',
          shape: 'rect',
          id: 75,
          accType: 'standard-cabins-1b',
          acc: 'bud-s-place-cabin',
        },
        'standard-cabins-2a': {
          coords: '623,688,640,703',
          shape: 'rect',
          id: 122,
          accType: 'standard-cabins-2a',
          acc: 'bud-s-place-cabin',
        },
        'standard-cabins-2b': {
          coords: '641,688,659,703',
          shape: 'rect',
          id: 76,
          accType: 'standard-cabins-2b',
          acc: 'bud-s-place-cabin',
        },
        'standard-cabins-3a': {
          coords: '678,688,695,703',
          shape: 'rect',
          id: 123,
          accType: 'standard-cabins-3a',
          acc: 'bud-s-place-cabin',
        },
        'standard-cabins-3b': {
          coords: '696,688,714,703',
          shape: 'rect',
          id: 77,
          accType: 'standard-cabins-3b',
          acc: 'bud-s-place-cabin',
        },
         'ada-cabins-4a': {
          coords: '733,688,750,703',
          shape: 'rect',
          id: 124,
          accType: 'ada-cabins-4a',
          acc: 'bud-s-place-ada-cabin',
        },
        'ada-cabins-4b': {
          coords: '751,688,769,703',
          shape: 'rect',
          id: 78,
          accType: 'ada-cabins-4b',
          acc: 'bud-s-place-ada-cabin',
        },
         'standard-cabins-5a': {
          coords: '788,688,805,703',
          shape: 'rect',
          id: 125,
          accType: 'standard-cabins-5a',
          acc: 'bud-s-place-cabin',
        },
        'standard-cabins-5b': {
          coords: '806,688,824,703',
          shape: 'rect',
          id: 79,
          accType: 'standard-cabins-5b',
          acc: 'bud-s-place-cabin',
        },
        'standard-cabins-6a': {
          coords: '843,688,860,703',
          shape: 'rect',
          id: 126,
          accType: 'standard-cabins-6a',
          acc: 'bud-s-place-cabin',
        },
        'standard-cabins-6b': {
          coords: '861,688,879,703',
          shape: 'rect',
          id: 80,
          accType: 'standard-cabins-6b',
          acc: 'bud-s-place-cabin',
        },
         'standard-cabins-7a': {
          coords: '898,688,916,703',
          shape: 'rect',
          id: 127,
          accType: 'standard-cabins-7a',
          acc: 'bud-s-place-cabin',
        },
        'standard-cabins-7b': {
          coords: '917,688,934,703',
          shape: 'rect',
          id: 81,
          accType: 'standard-cabins-7b',
          acc: 'bud-s-place-cabin',
        },
        84: {
          coords: '239,329,273,329',
          shape: 'poly',
          id: 84,
        },
        95: {
          coords: '238,399',
          shape: 'poly',
          id: 95,
        },
        'premium-plus-room-1A': {
          coords: '458,610,493,610,507,659,473,659',
          shape: 'poly',
          id: 0,
          accType: 'premium-plus-room-1A',
          acc: 'bud-s-place-cabin',
        },
        'premium-plus-room-9': {
          coords: '175,617,182,610,200,610,214,659,181,659,175,650',
          shape: 'poly',
          id: 1,
          accType: 'premium-plus-room-9',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-8': {
          coords: '202,610,236,611,251,659,216,659',
          shape: 'poly',
          id: 2,
          accType: 'premium-plus-room-8',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-7': {
          coords: '239,610,273,610,287,659,253,659',
          shape: 'poly',
          id: 3,
          accType: 'premium-plus-room-7',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-6': {
          coords: '274,610,309,611,323,658,289,658',
          shape: 'poly',
          id: 4,
          accType: 'premium-plus-room-6',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-5': {
          coords: '311,610,346,610,360,659,325,659',
          shape: 'poly',
          id: 5,
          accType: 'premium-plus-room-5',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-4': {
          coords: '348,610,382,610,397,658,362,659',
          shape: 'poly',
          id: 6,
          accType: 'premium-plus-room-4',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-3': {
          coords: '384,610,419,610,433,659,398,659',
          shape: 'poly',
          id: 7,
          accType: 'premium-plus-room-3',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-2': {
          coords: '420,609,455,609,469,658,435,658',
          shape: 'poly',
          id: 8,
          accType: 'premium-plus-room-2',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-room-82': {
          coords: '559,615,566,610,583,609,598,657,567,657,559,650',
          shape: 'poly',
          id: 9,
          accType: 'premium-room-82',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-83': {
          coords: '585,609,619,609,634,657,599,657',
          shape: 'poly',
          id: 10,
          accType: 'premium-room-83',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-84': {
          coords: '622,609,655,610,669,657,635,657',
          shape: 'poly',
          id: 11,
          accType: 'premium-room-84',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-85': {
          coords: '658,609,691,609,706,658,671,657',
          shape: 'poly',
          id: 12,
          accType: 'premium-room-85',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-86': {
          coords: '695,609,728,609,743,657,709,658',
          shape: 'poly',
          id: 13,
          accType: 'premium-room-86',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-87': {
          coords: '731,609,765,609,780,658,745,657',
          shape: 'poly',
          id: 14,
          accType: 'premium-room-87',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-88': {
          coords: '768,609,802,609,817,658,782,658',
          shape: 'poly',
          id: 15,
          accType: 'premium-room-88',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-89': {
          coords: '804,609,838,609,853,658,819,658',
          shape: 'poly',
          id: 16,
          accType: 'premium-room-89',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-90': {
          coords: '841,609,875,609,890,658,855,658',
          shape: 'poly',
          id: 17,
          accType: 'premium-room-90',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-91': {
          coords: '878,609,907,610,915,615,915,650,907,658,892,657',
          shape: 'poly',
          id: 18,
          accType: 'premium-room-91',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-81': {
          coords: '558,545,565,540,582,539,597,587,566,587,558,580',
          shape: 'poly',
          id: 19,
          accType: 'premium-room-81',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-80': {
          coords: '585,539,619,539,634,587,599,587',
          shape: 'poly',
          id: 20,
          accType: 'premium-room-80',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-79': {
          coords: '622,539,655,540,669,587,635,587',
          shape: 'poly',
          id: 21,
          accType: 'premium-room-79',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-78': {
          coords: '659,539,692,539,707,588,672,587',
          shape: 'poly',
          id: 22,
          accType: 'premium-room-78',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-77': {
          coords: '695,539,728,539,743,587,709,588',
          shape: 'poly',
          id: 23,
          accType: 'premium-room-77',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-76': {
          coords: '731,539,765,539,780,588,745,587',
          shape: 'poly',
          id: 24,
          accType: 'premium-room-76',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-75': {
          coords: '768,539,802,539,817,588,782,588',
          shape: 'poly',
          id: 25,
          accType: 'premium-room-75',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-74': {
          coords: '804,539,838,539,853,588,819,588',
          shape: 'poly',
          id: 26,
          accType: 'premium-room-74',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-73': {
          coords: '841,539,875,539,890,588,855,588',
          shape: 'poly',
          id: 27,
          accType: 'premium-room-73',
          acc: 'bud-s-place-rvs',
        },
        'premium-plus-room-72': {
          coords: '877,539,906,540,914,545,914,580,906,588,891,587',
          shape: 'poly',
          id: 28,
          accType: 'premium-plus-room-72',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-room-62': {
          coords: '557,475,564,470,581,469,596,517,565,517,557,510',
          shape: 'poly',
          id: 29,
          accType: 'premium-room-62',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-63': {
          coords: '585,469,619,469,634,517,599,517',
          shape: 'poly',
          id: 30,
          accType: 'premium-room-63',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-64': {
          coords: '622,469,655,470,669,517,635,517',
          shape: 'poly',
          id: 31,
          accType: 'premium-room-64',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-65': {
          coords: '658,469,691,469,706,518,671,517',
          shape: 'poly',
          id: 32,
          accType: 'premium-room-65',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-66': {
          coords: '694,469,727,469,742,517,708,518',
          shape: 'poly',
          id: 33,
          accType: 'premium-room-66',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-67': {
          coords: '730,469,764,469,779,518,744,517',
          shape: 'poly',
          id: 34,
          accType: 'premium-room-67',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-68': {
          coords: '767,469,801,469,816,518,781,518',
          shape: 'poly',
          id: 35,
          accType: 'premium-room-68',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-69': {
          coords: '803,469,837,469,852,518,818,518',
          shape: 'poly',
          id: 36,
          accType: 'premium-room-69',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-70': {
          coords: '840,469,874,469,889,518,854,518',
          shape: 'poly',
          id: 37,
          accType: 'premium-room-70',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-71': {
          coords: '878,469,907,470,915,475,915,510,907,518,892,517',
          shape: 'poly',
          id: 38,
          accType: 'premium-room-71',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-61': {
          coords: '557,405,564,400,581,399,596,447,565,447,557,440',
          shape: 'poly',
          id: 39,
          accType: 'premium-room-61',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-60': {
          coords: '584,399,618,399,633,447,598,447',
          shape: 'poly',
          id: 40,
          accType: 'premium-room-60',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-59': {
          coords: '622,399,655,400,669,447,635,447',
          shape: 'poly',
          id: 41,
          accType: 'premium-room-59',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-58': {
          coords: '658,399,691,399,706,448,671,447',
          shape: 'poly',
          id: 42,
          accType: 'premium-room-58',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-57': {
          coords: '694,399,727,399,742,447,708,448',
          shape: 'poly',
          id: 43,
          accType: 'premium-room-57',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-56': {
          coords: '730,399,764,399,779,448,744,447',
          shape: 'poly',
          id: 44,
          accType: 'premium-room-56',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-55': {
          coords: '767,399,801,399,816,448,781,448',
          shape: 'poly',
          id: 45,
          accType: 'premium-room-55',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-54': {
          coords: '803,399,837,399,852,448,818,448',
          shape: 'poly',
          id: 46,
          accType: 'premium-room-54',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-53': {
          coords: '840,399,874,399,889,448,854,448',
          shape: 'poly',
          id: 47,
          accType: 'premium-room-53',
          acc: 'bud-s-place-rvs',
        },
        'premium-room-52': {
          coords: '877,399,906,400,914,405,914,440,906,448,891,447',
          shape: 'poly',
          id: 48,
          accType: 'premium-room-52',
          acc: 'bud-s-place-rvs',
        },
        'classic-room-111': {
          coords: '96,251,143,266',
          shape: 'rect',
          id: 49,
          accType: 'classic-room-111',
          acc: 'bud-s-place-classic-rvs',
        },
        'premium-plus-room-22': {
          coords: '423,469,457,469,471,517,437,517',
          shape: 'poly',
          id: 50,
          accType: 'premium-plus-room-22',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'classic-room-110': {
          coords: '96,267,143,283',
          shape: 'rect',
          id: 51,
          accType: 'classic-room-110',
          acc: 'bud-s-place-classic-rvs',
        },
        'classic-room-109': {
          coords: '96,284,143,300',
          shape: 'rect',
          id: 52,
          accType: 'classic-room-109',
          acc: 'bud-s-place-classic-rvs',
        },
        'classic-room-108': {
          coords: '96,301,143,317',
          shape: 'rect',
          id: 53,
          accType: 'classic-room-108',
          acc: 'bud-s-place-classic-rvs',
        },
        'classic-room-107': {
          coords: '96,318,143,333',
          shape: 'rect',
          id: 54,
          accType: 'classic-room-107',
          acc: 'bud-s-place-classic-rvs',
        },
        'classic-room-106': {
          coords: '96,335,143,350',
          shape: 'rect',
          id: 55,
          accType: 'classic-room-106',
          acc: 'bud-s-place-classic-rvs',
        },
        'classic-room-105': {
          coords: '96,352,143,367',
          shape: 'rect',
          id: 56,
          accType: 'classic-room-105',
          acc: 'bud-s-place-classic-rvs',
        },
        'classic-room-104': {
          coords: '96,368,143,384',
          shape: 'rect',
          id: 57,
          accType: 'classic-room-104',
          acc: 'bud-s-place-classic-rvs',
        },
        'deluxe-cabins-103': {
          coords: '96,386,140,400',
          shape: 'rect',
          id: 58,
          accType: 'deluxe-cabins-103',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-102': {
          coords: '96,402,139,418',
          shape: 'rect',
          id: 59,
          accType: 'deluxe-cabins-102',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-101': {
          coords: '96,420,139,434',
          shape: 'rect',
          id: 60,
          accType: 'deluxe-cabins-101',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-100': {
          coords: '96,436,139,452',
          shape: 'rect',
          id: 61,
          accType: 'deluxe-cabins-100',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-99': {
          coords: '96,453,139,468',
          shape: 'rect',
          id: 62,
          accType: 'deluxe-cabins-99',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-98': {
          coords: '96,470,139,485',
          shape: 'rect',
          id: 63,
          accType: 'deluxe-cabins-98',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-97': {
          coords: '96,487,139,502',
          shape: 'rect',
          id: 64,
          accType: 'deluxe-cabins-97',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-96': {
          coords: '96,503,139,519',
          shape: 'rect',
          id: 65,
          accType: 'deluxe-cabins-96',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-95': {
          coords: '96,520,139,536',
          shape: 'rect',
          id: 66,
          accType: 'deluxe-cabins-95',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-94': {
          coords: '96,537,139,552',
          shape: 'rect',
          id: 67,
          accType: 'deluxe-cabins-94',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-93': {
          coords: '96,553,139,569',
          shape: 'rect',
          id: 68,
          accType: 'deluxe-cabins-93',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-cabins-92': {
          coords: '96,571,139,586',
          shape: 'rect',
          id: 69,
          accType: 'deluxe-cabins-92',
          acc: 'bud-s-place-deluxe-cabin',
        },
        'deluxe-room-48': {
          coords:
            '913,251,960,251,960,272,912,286,913,251,913,251,912,251,912,251,912,285,912,252',
          shape: 'poly',
          id: 71,
          accType: 'deluxe-room-48',
          acc: 'bud-s-place-deluxe-rvs',
        },
        'deluxe-room-49': {
          coords:
            '913,287,961,274,961,305,913,319,913,318,913,287,913,287,913,319',
          shape: 'poly',
          id: 72,
          accType: 'deluxe-room-49',
          acc: 'bud-s-place-deluxe-rvs',
        },
        'deluxe-room-50': {
          coords: '913,321,961,307,961,339,913,352,913,321',
          shape: 'poly',
          id: 73,
          accType: 'deluxe-room-50',
          acc: 'bud-s-place-deluxe-rvs',
        },
        'deluxe-room-51': {
          coords: '913,354,960,341,960,378,922,373,913,367,912,355',
          shape: 'poly',
          id: 74,
          accType: 'deluxe-room-51',
          acc: 'bud-s-place-deluxe-rvs',
        },
        'premium-plus-room-47': {
          coords: '175,329,200,329,214,377,182,377,175,370,174,330',
          shape: 'poly',
          id: 82,
          accType: 'premium-plus-room-47',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-46': {
          coords: '202,329,236,329,250,377,216,377,203,329',
          shape: 'poly',
          id: 83,
          accType: 'premium-plus-room-46',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-45': {
          coords: '238,329,273,329,287,378,252,377',
          shape: 'poly',
          id: 85,
          accType: 'premium-plus-room-45',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-44': {
          coords: '275,329,309,329,324,377,289,378',
          shape: 'poly',
          id: 86,
          accType: 'premium-plus-room-44',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-43': {
          coords: '312,329,345,329,360,377,326,377',
          shape: 'poly',
          id: 87,
          accType: 'premium-plus-room-43',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-42': {
          coords: '347,329,382,329,397,377,362,377',
          shape: 'poly',
          id: 88,
          accType: 'premium-plus-room-42',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-41': {
          coords: '385,329,419,329,433,378,398,378',
          shape: 'poly',
          id: 89,
          accType: 'premium-plus-room-41',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-40': {
          coords: '421,329,455,329,470,377,436,378',
          shape: 'poly',
          id: 90,
          accType: 'premium-plus-room-40',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-39': {
          coords: '458,329,492,329,507,378,473,377',
          shape: 'poly',
          id: 91,
          accType: 'premium-plus-room-39',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-38': {
          coords: '494,329,524,329,531,335,531,371,524,377,508,377',
          shape: 'poly',
          id: 92,
          accType: 'premium-plus-room-38',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-28': {
          coords: '175,405,182,400,199,399,214,447,183,447,175,440',
          shape: 'poly',
          id: 93,
          accType: 'premium-plus-room-28',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-29': {
          coords: '202,399,236,399,251,447,216,447',
          shape: 'poly',
          id: 94,
          accType: 'premium-plus-room-29',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-30': {
          coords: '240,399,273,400,287,447,253,447',
          shape: 'poly',
          id: 96,
          accType: 'premium-plus-room-30',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-31': {
          coords: '276,399,309,399,324,448,289,447',
          shape: 'poly',
          id: 97,
          accType: 'premium-plus-room-31',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-32': {
          coords: '312,399,345,399,360,447,326,448',
          shape: 'poly',
          id: 98,
          accType: 'premium-plus-room-32',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-33': {
          coords: '348,399,382,399,397,448,362,447',
          shape: 'poly',
          id: 99,
          accType: 'premium-plus-room-33',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-34': {
          coords: '385,399,419,399,434,448,399,448',
          shape: 'poly',
          id: 100,
          accType: 'premium-plus-room-34',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-35': {
          coords: '421,399,455,399,470,448,436,448',
          shape: 'poly',
          id: 101,
          accType: 'premium-plus-room-35',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-36': {
          coords: '458,399,492,399,507,448,472,448',
          shape: 'poly',
          id: 102,
          accType: 'premium-plus-room-36',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-37': {
          coords: '494,398,523,399,531,404,531,439,523,447,508,446',
          shape: 'poly',
          id: 103,
          accType: 'premium-plus-room-37',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-27': {
          coords: '175,476,182,469,200,470,214,517,182,518,175,511',
          shape: 'poly',
          id: 104,
          accType: 'premium-plus-room-27',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-26': {
          coords: '203,469,237,470,251,517,216,518',
          shape: 'poly',
          id: 105,
          accType: 'premium-plus-room-26',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-25': {
          coords: '239,469,272,469,288,518,253,517',
          shape: 'poly',
          id: 106,
          accType: 'premium-plus-room-25',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-24': {
          coords: '275,469,311,469,325,518,290,518',
          shape: 'poly',
          id: 107,
          accType: 'premium-plus-room-24',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-23': {
          coords: '386,469,421,469,435,517,400,518',
          shape: 'poly',
          id: 108,
          accType: 'premium-plus-room-23',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-21': {
          coords: '460,469,493,469,508,518,473,518',
          shape: 'poly',
          id: 109,
          accType: 'premium-plus-room-21',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-20': {
          coords: '496,469,524,469,531,476,531,510,525,517,509,517',
          shape: 'poly',
          id: 110,
          accType: 'premium-plus-room-20',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-10': {
          coords: '175,546,182,539,200,539,214,588,181,588,175,579',
          shape: 'poly',
          id: 111,
          accType: 'premium-plus-room-10',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-11': {
          coords: '202,539,236,540,251,588,216,588',
          shape: 'poly',
          id: 112,
          accType: 'premium-plus-room-11',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-12': {
          coords: '239,539,273,539,287,588,253,588',
          shape: 'poly',
          id: 113,
          accType: 'premium-plus-room-12',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-13': {
          coords: '274,539,309,540,323,587,289,587',
          shape: 'poly',
          id: 114,
          accType: 'premium-plus-room-13',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-14': {
          coords: '311,539,346,539,360,588,325,588',
          shape: 'poly',
          id: 115,
          accType: 'premium-plus-room-14',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-15': {
          coords: '348,539,382,539,397,587,362,588',
          shape: 'poly',
          id: 116,
          accType: 'premium-plus-room-15',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-16': {
          coords: '384,539,419,539,433,588,398,588',
          shape: 'poly',
          id: 117,
          accType: 'premium-plus-room-16',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-17': {
          coords: '420,538,455,538,469,587,435,587',
          shape: 'poly',
          id: 118,
          accType: 'premium-plus-room-17',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-18': {
          coords: '457,539,492,539,506,588,472,588',
          shape: 'poly',
          id: 119,
          accType: 'premium-plus-room-18',
          acc: 'bud-s-place-premium-plus-rvs',
        },
        'premium-plus-room-19': {
          coords: '494,539,523,539,531,546,531,581,524,588,507,588',
          shape: 'poly',
          id: 120,
          accType: 'premium-plus-room-19',
          acc: 'bud-s-place-premium-plus-rvs',
        },
      },
      mapsterOptions: {
        fillOpacity: 0.3,
        fillColor: 'd42e16',
        stroke: true,
        strokeColor: '25b31c',
        strokeOpacity: 0.8,
        strokeWidth: 2,
        singleSelect: true,
        mapKey: 'name',
        listKey: 'name',
        onClick: (event) => {
          let areaObj = this.areas[event.key],
            { shiftKey } = event.e,
            canBook = !this.bookings[event.key],
            isMaintenance = this.maintenance[event.key]

          if (isMaintenance) {
            this.showError('Selected Accommodation is under Maintenance.')
            this.reDraw()
            return false
          }

          if (canBook) {
            if (!this.selected.hasOwnProperty(areaObj.accType))
              this.$set(this.selected, areaObj.accType, areaObj.acc)
            else this.$delete(this.selected, areaObj.accType)
          }

          if (shiftKey) {
            this.reDraw()
            return false
          }

          if (canBook) {
            let startStr = ''
            let actualEndDate=''
            if (this.fromDate) {
              let splitDob = this.fromDate.split('/')
              startStr = `${splitDob[2]}-${splitDob[1]}-${splitDob[0]}`
            }
            if (this.toDate) {
              let splitEnd = this.toDate.split('/')
              actualEndDate = `${splitEnd[2]}-${splitEnd[1]}-${splitEnd[0]}`
            }
            

            let endDate = ''
            if(startStr===actualEndDate){
                endDate = new Date(this.timeZone(startStr))
              if (new Date().getTime() - new Date(startStr).getTime() > 0){
                  endDate.setDate(new Date().getDate() + 1)}else{
                 endDate.setDate(endDate.getDate() + 1)
              }
               startStr=new Date(this.timeZone(startStr))
            }else{
                endDate = new Date(this.timeZone(actualEndDate))
              if (new Date().getTime() - new Date(startStr).getTime() > 0){
                   endDate.setDate(new Date().getDate() + 1)}
                  else{
                  startStr=new Date(this.timeZone(startStr))
                  endDate=new Date(this.timeZone(actualEndDate))
              }
             
            } 
            if (new Date().getTime() - new Date(startStr).getTime() > 0)
              startStr = new Date()   

            this.updateDialogState({
              dialog: 'AddUpdateEvent',
              val: true,
              properties: {
                startStr: startStr,
                endStr: this.formatDate(endDate, 'YYYY-MM-DD'),
                accommodation: areaObj.acc,
                accommodation_type: areaObj.accType,
              },
            })

            this.reDraw()
          } else {
           
            let bookingList=[]
            this.totalBookings&&this.totalBookings.length!==0&&this.totalBookings.forEach((bookings)=>{
              if(bookings.detail[0].accommodation_type.slug===event.key){
                bookingList.push(bookings)
              }
            })
            if(bookingList.length>1){
            this.updateDialogState({
              dialog: 'DetailList',
              val: true,
              properties: { ...this.bookings[event.key],totalBookings:bookingList,accommodation_type:event.key},
            })}else{
            this.updateDialogState({
              dialog: 'BookingDetail',
              val: true,
              properties: { ...this.bookings[event.key] },
            })
            }
            
          }

          return false
        },
      },
    }
  },
  mounted() {
    // setTimeout(() => {
    this.image = $('#MapImage')
    this.image.mapster(this.mapsterOptions)
    this.reDraw()
    // }, 500)

    document.addEventListener('keyup', this.keyUp)
    document.addEventListener('keydown', this.keyDown)
  },
  destroyed() {
    document.removeEventListener('keyup', this.keyUp)
    document.addEventListener('keydown', this.keyDown)
  },
  methods: {
    timeZone(data){
      let splitDob=data.split('-')
        return `${splitDob[1]}/${splitDob[2]}/${splitDob[0]}`
        
    },
    keyUp(event) {
      if (event.keyCode != 16) return false

      if (this.getDialogState('AddUpdateEvent')) return

      let startStr = '',
        endDate

      if (this.fromDate) {
        let splitDob = this.fromDate.split('/')
        startStr = `${splitDob[2]}-${splitDob[1]}-${splitDob[0]}`
      }

      if (new Date().getTime() - new Date(startStr).getTime() > 0)
        startStr = new Date()

      endDate = new Date(startStr)
      endDate.setDate(endDate.getDate() + 1)

      this.updateDialogState({
        dialog: 'AddUpdateEvent',
        val: true,
        properties: {
          startStr: startStr,
          endStr: this.formatDate(endDate, 'YYYY-MM-DD'),
          accommodation: '',
          accommodation_type: '',
          selected: this.selected,
        },
      })
    },
    keyDown(event) {
      if (event.keyCode == 16) this.selected = {}
    },
    reDraw() {
      if (this.image && this.image.mapster) this.image.mapster('unbind')

      this.image.mapster({
        ...this.mapsterOptions,
        areas: [
          ...Object.keys(this.selected).map((item) => {
            return {
              key: item,
              selected: true,
              strokeColor: '25b31c',
              // strokeOpacity: 0.2,
              // strokeWidth: 1,
            }
          }),
          ...Object.keys(this.maintenance).map((item) => {
            return {
              key: item,
              selected: true,
              strokeColor: '000000',
              fillColor: '000000',
              // strokeOpacity: 0.2,
              // strokeWidth: 1,
            }
          }),
          ...Object.keys(this.bookings).map((item) => {
            return { key: item, selected: true, strokeColor: 'ff0000' }
          }),
        ],
      })
    },
    clearSelection() {
      this.selected = {}
      this.reDraw()
    },
    
  },
}
</script>
