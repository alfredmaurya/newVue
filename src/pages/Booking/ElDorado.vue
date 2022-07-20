<template>
  <div class="b1-i1">
    <img
      id="MapImage"
      src="maps-eldorado-place.jpg"
      alt=""
      border="0"
      usemap="#ElDorado"
    />

    <map name="ElDorado">
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
  name: 'ElDorado',
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
        12: {
          coords: '162,574,187,586',
          shape: 'rect',
          id: 12,
        },
        13: {
          coords: '161,591,187,602',
          shape: 'rect',
          id: 13,
        },
        36: {
          coords: '298,427',
          shape: 'poly',
          id: 36,
        },
        'el-dorado-deluxe-cabins-1': {
          coords: '80,617,91,643',
          shape: 'rect',
          id: 0,
          accType: 'el-dorado-deluxe-cabins-1',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-2': {
          coords: '95,617,106,643',
          shape: 'rect',
          id: 1,
          accType: 'el-dorado-deluxe-cabins-2',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-3': {
          coords: '111,617,121,643',
          shape: 'rect',
          id: 2,
          accType: 'el-dorado-deluxe-cabins-3',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-4': {
          coords: '125,617,137,643',
          shape: 'rect',
          id: 3,
          accType: 'el-dorado-deluxe-cabins-4',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-5': {
          coords: '76,528,87,554',
          shape: 'rect',
          id: 4,
          accType: 'el-dorado-deluxe-cabins-5',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-6': {
          coords: '91,528,102,554',
          shape: 'rect',
          id: 5,
          accType: 'el-dorado-deluxe-cabins-6',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-7': {
          coords: '107,528,118,554',
          shape: 'rect',
          id: 6,
          accType: 'el-dorado-deluxe-cabins-7',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-8': {
          coords: '122,528,133,554',
          shape: 'rect',
          id: 7,
          accType: 'el-dorado-deluxe-cabins-8',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-9': {
          coords: '137,528,148,554',
          shape: 'rect',
          id: 8,
          accType: 'el-dorado-deluxe-cabins-9',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-10': {
          coords: '153,528,164,554',
          shape: 'rect',
          id: 9,
          accType: 'el-dorado-deluxe-cabins-10',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-11': {
          coords: '168,528,179,554',
          shape: 'rect',
          id: 10,
          accType: 'el-dorado-deluxe-cabins-11',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-12': {
          coords: '182,528,195,553',
          shape: 'rect',
          id: 11,
          accType: 'el-dorado-deluxe-cabins-12',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-15': {
          coords: '76,483,88,509',
          shape: 'rect',
          id: 14,
          accType: 'el-dorado-deluxe-cabins-15',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-16': {
          coords: '90,483,102,509',
          shape: 'rect',
          id: 15,
          accType: 'el-dorado-deluxe-cabins-16',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-17': {
          coords: '104,483,116,509',
          shape: 'rect',
          id: 16,
          accType: 'el-dorado-deluxe-cabins-17',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-18': {
          coords: '119,483,131,509',
          shape: 'rect',
          id: 17,
          accType: 'el-dorado-deluxe-cabins-18',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-19': {
          coords: '750,567,777,578',
          shape: 'rect',
          id: 18,
          accType: 'el-dorado-deluxe-cabins-19',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-20': {
          coords: '751,581,776,593',
          shape: 'rect',
          id: 19,
          accType: 'el-dorado-deluxe-cabins-20',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-21': {
          coords: '750,596,776,607',
          shape: 'rect',
          id: 20,
          accType: 'el-dorado-deluxe-cabins-21',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-22': {
          coords: '744,615,755,640',
          shape: 'rect',
          id: 21,
          accType: 'el-dorado-deluxe-cabins-22',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-23': {
          coords: '758,615,768,641',
          shape: 'rect',
          id: 22,
          accType: 'el-dorado-deluxe-cabins-23',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-24': {
          coords: '771,615,783,640',
          shape: 'rect',
          id: 23,
          accType: 'el-dorado-deluxe-cabins-24',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-25': {
          coords: '784,615,796,640',
          shape: 'rect',
          id: 24,
          accType: 'el-dorado-deluxe-cabins-25',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-26': {
          coords: '797,615,809,640',
          shape: 'rect',
          id: 25,
          accType: 'el-dorado-deluxe-cabins-26',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-27': {
          coords: '811,615,823,640',
          shape: 'rect',
          id: 26,
          accType: 'el-dorado-deluxe-cabins-27',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-28': {
          coords: '825,615,835,640',
          shape: 'rect',
          id: 27,
          accType: 'el-dorado-deluxe-cabins-28',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-29': {
          coords: '839,615,849,641',
          shape: 'rect',
          id: 28,
          accType: 'el-dorado-deluxe-cabins-29',
          acc: 'el-dorado-deluxe-cabins',
        },
        'el-dorado-deluxe-cabins-30': {
          coords: '852,615,863,640',
          shape: 'rect',
          id: 29,
          accType: 'el-dorado-deluxe-cabins-30',
          acc: 'el-dorado-deluxe-cabins',
        },
        'deluxe-rvs-room-5': {
          coords: '168,365,185,368,175,458,155,454,168,367',
          shape: 'poly',
          id: 34,
          accType: 'deluxe-rvs-room-5',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-6': {
          coords: '188,369,207,373,198,460,178,460,189,369',
          shape: 'poly',
          id: 35,
          accType: 'deluxe-rvs-room-6',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-7': {
          coords: '211,374,229,376,221,465,201,463',
          shape: 'poly',
          id: 37,
          accType: 'deluxe-rvs-room-7',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-8': {
          coords: '232,377,251,379,244,466,224,466,233,377',
          shape: 'poly',
          id: 38,
          accType: 'deluxe-rvs-room-8',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-9': {
          coords: '254,380,272,382,266,469,246,468,254,381',
          shape: 'poly',
          id: 39,
          accType: 'deluxe-rvs-room-9',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-10': {
          coords: '275,383,294,384,288,472,270,470,275,383',
          shape: 'poly',
          id: 40,
          accType: 'deluxe-rvs-room-10',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-11': {
          coords: '299,385,317,387,308,473,290,471,299,385',
          shape: 'poly',
          id: 41,
          accType: 'deluxe-rvs-room-11',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-12': {
          coords: '320,387,339,389,331,474,312,474,321,387',
          shape: 'poly',
          id: 42,
          accType: 'deluxe-rvs-room-12',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-13': {
          coords: '342,389,361,390,353,475,334,475,342,388',
          shape: 'poly',
          id: 43,
          accType: 'deluxe-rvs-room-13',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-14': {
          coords: '364,391,383,391,374,478,356,476,365,390',
          shape: 'poly',
          id: 44,
          accType: 'deluxe-rvs-room-14',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-15': {
          coords: '388,392,406,393,397,478,378,478,388,393',
          shape: 'poly',
          id: 45,
          accType: 'deluxe-rvs-room-15',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-16': {
          coords: '408,394,427,395,419,481,400,480,409,394',
          shape: 'poly',
          id: 46,
          accType: 'deluxe-rvs-room-16',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-17': {
          coords: '430,395,450,396,440,482,421,481,432,394',
          shape: 'poly',
          id: 47,
          accType: 'deluxe-rvs-room-17',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-18': {
          coords: '453,397,472,398,461,483,444,482,454,397',
          shape: 'poly',
          id: 48,
          accType: 'deluxe-rvs-room-18',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-19': {
          coords: '476,398,494,399,483,484,464,485,476,399',
          shape: 'poly',
          id: 49,
          accType: 'deluxe-rvs-room-19',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-20': {
          coords: '498,399,516,401,505,486,487,487,498,401',
          shape: 'poly',
          id: 50,
          accType: 'deluxe-rvs-room-20',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-21': {
          coords: '518,401,535,403,524,488,509,488,519,402',
          shape: 'poly',
          id: 51,
          accType: 'deluxe-rvs-room-21',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-22': {
          coords: '539,403,556,405,545,491,528,490,539,402',
          shape: 'poly',
          id: 52,
          accType: 'deluxe-rvs-room-22',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-23': {
          coords: '560,405,577,407,567,493,549,491',
          shape: 'poly',
          id: 53,
          accType: 'deluxe-rvs-room-23',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-24': {
          coords: '581,407,598,409,589,495,571,493',
          shape: 'poly',
          id: 54,
          accType: 'deluxe-rvs-room-24',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-25': {
          coords: '601,409,620,411,609,498,592,496',
          shape: 'poly',
          id: 55,
          accType: 'deluxe-rvs-room-25',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-26': {
          coords: '623,412,642,415,630,501,613,498',
          shape: 'poly',
          id: 56,
          accType: 'deluxe-rvs-room-26',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-27': {
          coords: '645,415,663,418,650,505,633,502',
          shape: 'poly',
          id: 57,
          accType: 'deluxe-rvs-room-27',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-28': {
          coords: '667,418,685,421,669,508,653,506',
          shape: 'poly',
          id: 58,
          accType: 'deluxe-rvs-room-28',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-29': {
          coords: '689,422,708,425,690,512,673,510',
          shape: 'poly',
          id: 59,
          accType: 'deluxe-rvs-room-29',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-30': {
          coords: '711,427,730,430,711,518,693,514',
          shape: 'poly',
          id: 60,
          accType: 'deluxe-rvs-room-30',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-31': {
          coords: '733,431,751,436,732,525,714,519',
          shape: 'poly',
          id: 61,
          accType: 'deluxe-rvs-room-31',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-32': {
          coords: '754,437,774,441,752,530,735,526',
          shape: 'poly',
          id: 62,
          accType: 'deluxe-rvs-room-32',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-33': {
          coords: '776,444,795,449,770,538,754,532',
          shape: 'poly',
          id: 63,
          accType: 'deluxe-rvs-room-33',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-34': {
          coords: '798,450,818,458,786,545,773,540',
          shape: 'poly',
          id: 64,
          accType: 'deluxe-rvs-room-34',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-35': {
          coords: '822,460,840,467,802,553,789,547',
          shape: 'poly',
          id: 65,
          accType: 'deluxe-rvs-room-35',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-36': {
          coords: '843,470,860,478,817,561,805,555',
          shape: 'poly',
          id: 66,
          accType: 'deluxe-rvs-room-36',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-37': {
          coords: '863,480,885,493,836,572,822,563',
          shape: 'poly',
          id: 67,
          accType: 'deluxe-rvs-room-37',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-38': {
          coords: '888,495,906,508,850,582,838,575',
          shape: 'poly',
          id: 68,
          accType: 'deluxe-rvs-room-38',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-39': {
          coords: '909,510,926,523,864,592,854,585',
          shape: 'poly',
          id: 69,
          accType: 'deluxe-rvs-room-39',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-40': {
          coords: '868,596,929,526,950,544,881,606',
          shape: 'poly',
          id: 70,
          accType: 'deluxe-rvs-room-40',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-41': {
          coords: '952,547,969,565,894,619,884,610',
          shape: 'poly',
          id: 71,
          accType: 'deluxe-rvs-room-41',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-42': {
          coords: '970,569,985,592,908,632,898,622',
          shape: 'poly',
          id: 72,
          accType: 'deluxe-rvs-room-42',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-43': {
          coords: '986,595,997,619,919,647,911,636',
          shape: 'poly',
          id: 73,
          accType: 'deluxe-rvs-room-43',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-44': {
          coords: '138,468,152,471,148,520,135,518',
          shape: 'poly',
          id: 74,
          accType: 'deluxe-rvs-room-44',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-48': {
          coords: '155,472,171,474,167,521,151,521',
          shape: 'poly',
          id: 75,
          accType: 'deluxe-rvs-room-48',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-49': {
          coords: '173,475,188,477,185,524,169,522',
          shape: 'poly',
          id: 76,
          accType: 'deluxe-rvs-room-49',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-50': {
          coords: '191,477,206,479,203,525,189,524',
          shape: 'poly',
          id: 77,
          accType: 'deluxe-rvs-room-50',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-51': {
          coords: '205,526,228,588',
          shape: 'rect',
          id: 78,
          accType: 'deluxe-rvs-room-51',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-52': {
          coords: '229,526,255,588',
          shape: 'rect',
          id: 79,
          accType: 'deluxe-rvs-room-52',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-53': {
          coords: '257,527,282,588',
          shape: 'rect',
          id: 80,
          accType: 'deluxe-rvs-room-53',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-54': {
          coords: '284,526,309,589',
          shape: 'rect',
          id: 81,
          accType: 'deluxe-rvs-room-54',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-55': {
          coords: '312,526,336,588',
          shape: 'rect',
          id: 82,
          accType: 'deluxe-rvs-room-55',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-56': {
          coords: '339,527,363,589',
          shape: 'rect',
          id: 83,
          accType: 'deluxe-rvs-room-56',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-57': {
          coords: '368,527,392,589',
          shape: 'rect',
          id: 84,
          accType: 'deluxe-rvs-room-57',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-58': {
          coords: '395,528,419,528,417,588,393,588',
          shape: 'poly',
          id: 85,
          accType: 'deluxe-rvs-room-58',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-59': {
          coords: '422,528,446,528,444,589,419,588',
          shape: 'poly',
          id: 86,
          accType: 'deluxe-rvs-room-59',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-60': {
          coords: '450,528,473,528,471,589,448,589',
          shape: 'poly',
          id: 87,
          accType: 'deluxe-rvs-room-60',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-61': {
          coords: '478,529,501,529,500,589,475,589',
          shape: 'poly',
          id: 88,
          accType: 'deluxe-rvs-room-61',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-62': {
          coords: '505,530,529,530,525,589,502,589',
          shape: 'poly',
          id: 89,
          accType: 'deluxe-rvs-room-62',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-63': {
          coords: '533,530,556,530,552,590,529,590',
          shape: 'poly',
          id: 90,
          accType: 'deluxe-rvs-room-63',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-64': {
          coords: '560,529,584,530,581,590,556,590',
          shape: 'poly',
          id: 91,
          accType: 'deluxe-rvs-room-64',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-65': {
          coords: '587,530,611,531,608,589,584,590',
          shape: 'poly',
          id: 92,
          accType: 'deluxe-rvs-room-65',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-66': {
          coords: '615,530,639,532,634,590,611,591',
          shape: 'poly',
          id: 93,
          accType: 'deluxe-rvs-room-66',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-67': {
          coords: '642,532,667,532,661,590,638,591',
          shape: 'poly',
          id: 94,
          accType: 'deluxe-rvs-room-67',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-68': {
          coords: '670,532,694,532,687,591,665,591',
          shape: 'poly',
          id: 95,
          accType: 'deluxe-rvs-room-68',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-94': {
          coords: '697,533,731,542,730,566,695,561',
          shape: 'poly',
          id: 96,
          accType: 'deluxe-rvs-room-94',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-93': {
          coords: '693,565,728,570,727,594,691,591',
          shape: 'poly',
          id: 97,
          accType: 'deluxe-rvs-room-93',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-92': {
          coords: '689,594,726,598,725,621,687,618',
          shape: 'poly',
          id: 98,
          accType: 'deluxe-rvs-room-92',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-91': {
          coords: '686,621,724,625,722,650,683,650',
          shape: 'poly',
          id: 99,
          accType: 'deluxe-rvs-room-91',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-90': {
          coords: '662,595,687,595,680,650,662,650',
          shape: 'poly',
          id: 100,
          accType: 'deluxe-rvs-room-90',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-71': {
          coords: '247,590,268,656',
          shape: 'rect',
          id: 102,
          accType: 'deluxe-rvs-room-71',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-72': {
          coords: '269,590,290,656',
          shape: 'rect',
          id: 103,
          accType: 'deluxe-rvs-room-72',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-73': {
          coords: '291,591,311,656',
          shape: 'rect',
          id: 104,
          accType: 'deluxe-rvs-room-73',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-74': {
          coords: '313,591,332,653',
          shape: 'rect',
          id: 105,
          accType: 'deluxe-rvs-room-74',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-75': {
          coords: '335,591,355,653',
          shape: 'rect',
          id: 106,
          accType: 'deluxe-rvs-room-75',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-76': {
          coords: '356,591,376,653',
          shape: 'rect',
          id: 107,
          accType: 'deluxe-rvs-room-76',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-77': {
          coords: '378,591,398,653',
          shape: 'rect',
          id: 108,
          accType: 'deluxe-rvs-room-77',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-78': {
          coords: '400,592,419,653',
          shape: 'rect',
          id: 109,
          accType: 'deluxe-rvs-room-78',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-79': {
          coords: '422,592,442,652',
          shape: 'rect',
          id: 110,
          accType: 'deluxe-rvs-room-79',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-80': {
          coords: '444,592,463,652',
          shape: 'rect',
          id: 111,
          accType: 'deluxe-rvs-room-80',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-81': {
          coords: '466,593,486,652',
          shape: 'rect',
          id: 112,
          accType: 'deluxe-rvs-room-81',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-82': {
          coords: '487,593,507,652',
          shape: 'rect',
          id: 113,
          accType: 'deluxe-rvs-room-82',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-83': {
          coords: '509,593,529,651',
          shape: 'rect',
          id: 114,
          accType: 'deluxe-rvs-room-83',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-84': {
          coords: '531,593,550,651',
          shape: 'rect',
          id: 115,
          accType: 'deluxe-rvs-room-84',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-85': {
          coords: '553,594,572,651',
          shape: 'rect',
          id: 116,
          accType: 'deluxe-rvs-room-85',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-86': {
          coords: '575,594,594,651',
          shape: 'rect',
          id: 117,
          accType: 'deluxe-rvs-room-86',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-87': {
          coords: '597,594,616,651',
          shape: 'rect',
          id: 118,
          accType: 'deluxe-rvs-room-87',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-88': {
          coords: '618,594,638,651',
          shape: 'rect',
          id: 119,
          accType: 'deluxe-rvs-room-88',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-89': {
          coords: '640,594,660,652',
          shape: 'rect',
          id: 120,
          accType: 'deluxe-rvs-room-89',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-1': {
          coords: '86,337,105,345,88,438,69,432,85,337',
          shape: 'poly',
          id: 30,
          accType: 'deluxe-rvs-room-1',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-2': {
          coords: '108,347,124,353,108,444,90,440,109,347',
          shape: 'poly',
          id: 31,
          accType: 'deluxe-rvs-room-2',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-3': {
          coords: '127,354,143,359,129,449,112,445,127,354',
          shape: 'poly',
          id: 32,
          accType: 'deluxe-rvs-room-3',
          acc: 'el-dorado-deluxe-rvs',
        },
        'deluxe-rvs-room-4': {
          coords: '145,359,165,364,151,454,132,450,146,360',
          shape: 'poly',
          id: 33,
          accType: 'deluxe-rvs-room-4',
          acc: 'el-dorado-deluxe-rvs',
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

            if (this.fromDate) {
              let splitDob = this.fromDate.split('/')
              startStr = `${splitDob[2]}-${splitDob[1]}-${splitDob[0]}`
            }

            if (new Date().getTime() - new Date(startStr).getTime() > 0)
              startStr = new Date()

            let endDate = new Date(startStr)
            endDate.setDate(endDate.getDate() + 1)

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
            this.updateDialogState({
              dialog: 'BookingDetail',
              val: true,
              properties: { ...this.bookings[event.key] },
            })
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
            return {
              key: item,
              selected: true,
              strokeColor: 'ff0000',
            }
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
