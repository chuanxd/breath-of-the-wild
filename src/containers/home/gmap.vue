<template>
  <div class='gmap-wrapper'>
    <gmap-map
      id='map'
      ref='map'
      :center='center'
      :zoom='10'
      :options='mapOptions'
      style='width: 100%; height: 100vh'>

      <gmap-info-window
        :options='infoOptions'
        :position='infoWindowPos'
        :opened='infoWinOpen'
        :content='infoContent'
        @closeclick='infoWinOpen=false'/>

      <gmap-marker
        :key='index'
        v-for='(m, index) in markers'
        :position='m.position'
        :clickable='true'
        :draggable='false'
        icon='https://github.com/chuanxd/breath-of-the-wild/blob/master/src/assets/pin01.png?raw=true'
        @click='toggleInfoWindow(m, index)'/>

      <gmap-marker
        :key='index'
        v-for='(m, index) in factoryMarkers'
        :position='m.position'
        :clickable='true'
        :draggable='false'
        icon="https://github.com/chuanxd/breath-of-the-wild/blob/master/src/assets/factoryMarker.png?raw=true"
        @click='toggleInfoWindow(m, index)'/>
    </gmap-map>
  </div>
</template>

<script>
import fetch from '~utils/fetch'

export default {
  name: 'gmap',

  data () {
    return {
      center: {
        // Taiwan center position
        // lat: 23.799410,
        // lng: 121.058143
        // Chiayi center position
        lat: 23.506225,
        lng: 120.485101
      },
      mapOptions: {
        styles: require('./gmap-styles').default
      },
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      // optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: [],
      factoryMarkers: []
    }
  },

  mounted () {
    const AQIopts = {
      url: 'https://gist.githubusercontent.com/chuanxd/8c4282d169fddb673a0b63540c1f385d/raw/5cb8d84cfc9a34dd71e8f5a36c1901467dfcd5a6/aqi-station-geo.json'
    }

    fetch(AQIopts)
      .then((res) => {
        console.log(res.data.features)
        this.markers = res.data.features.map((data) => {
          return {
            position: {
              lat: data.geometry.coordinates[1],
              lng: data.geometry.coordinates[0]
            },
            infoText: data.properties.SiteName
          }
        })
      })
      .catch((err) => {
        console.error(err.response)
      })

    const factoryOpts = {
      url: 'https://gist.githubusercontent.com/chuanxd/621fe47ad0f7caf831a1ea42049aba0b/raw/4fb74862c8e1a63b62206d549f25ea952073afdb/factory-num-10k.json'
    }

    fetch(factoryOpts)
      .then((res) => {
        console.log(res.data)
        res.data.map((data) => {
          this.factoryMarkers.push({
            position: {
              lat: window.numeral(data.lat).value(),
              lng: window.numeral(data.lng).value()
            },
            infoText: data.name
          })
        })
      })
      .catch((err) => {
        console.error(err.response)
      })
  },

  methods: {
    toggleInfoWindow (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = marker.infoText
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        // if different marker set infowindow to open and reset current marker index
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  }
}

</script>

<style lang='scss' scoped>

</style>
