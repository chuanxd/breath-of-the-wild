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

      <!-- Markers -->
      <gmap-marker
        :key='index'
        v-for='(m, index) in rank1'
        :position='m.position'
        :clickable='true'
        :draggable='false'
        icon='https://github.com/chuanxd/breath-of-the-wild/blob/master/src/assets/pin01.png?raw=true'
        @click='toggleInfoWindow(m, index)'/>
      <gmap-marker
        :key='index'
        v-for='(m, index) in rank2'
        :position='m.position'
        :clickable='true'
        :draggable='false'
        icon='https://github.com/chuanxd/breath-of-the-wild/blob/master/src/assets/pin02.png?raw=true'
        @click='toggleInfoWindow(m, index)'/>
      <gmap-marker
        :key='index'
        v-for='(m, index) in rank3'
        :position='m.position'
        :clickable='true'
        :draggable='false'
        icon='https://github.com/chuanxd/breath-of-the-wild/blob/master/src/assets/pin03.png?raw=true'
        @click='toggleInfoWindow(m, index)'/>
      <gmap-marker
        :key='index'
        v-for='(m, index) in rank3'
        :position='m.position'
        :clickable='true'
        :draggable='false'
        icon='https://github.com/chuanxd/breath-of-the-wild/blob/master/src/assets/pin04.png?raw=true'
        @click='toggleInfoWindow(m, index)'/>
      <gmap-marker
        :key='index'
        v-for='(m, index) in rank3'
        :position='m.position'
        :clickable='true'
        :draggable='false'
        icon='https://github.com/chuanxd/breath-of-the-wild/blob/master/src/assets/pin05.png?raw=true'
        @click='toggleInfoWindow(m, index)'/>
      <gmap-marker
        :key='index'
        v-for='(m, index) in rank3'
        :position='m.position'
        :clickable='true'
        :draggable='false'
        icon='https://github.com/chuanxd/breath-of-the-wild/blob/master/src/assets/pin06.png?raw=true'
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
      factoryMarkers: [],
      rank1: [],
      rank2: [],
      rank3: [],
      rank4: [],
      rank5: [],
      rank6: []
    }
  },

  mounted () {
    this._fetchAQIGeo()
      .then(() => {
        this._fetchAQI()
          .then((res) => {
            const _markers = [...this.markers]
            const arr = res.data.result
            _markers.map((marker, idx) => {
              arr.map((aqi) => {
                if (marker.infoText === aqi.SiteName) {
                  this.markers[idx].infoText = `<h3>${aqi.SiteName}: ${aqi.AQI}</h3>`
                  const _aqi = window.numeral(aqi.AQI).value()
                  switch (true) {
                    case _aqi >= 0 && _aqi <= 50:
                      this.rank1.push(this.markers[idx])
                      break
                    case _aqi >= 51 && _aqi <= 100:
                      this.rank2.push(this.markers[idx])
                      break
                    case _aqi >= 100 && _aqi <= 150:
                      this.rank3.push(this.markers[idx])
                      break
                    case _aqi >= 151 && _aqi <= 200:
                      this.rank4.push(this.markers[idx])
                      break
                    case _aqi >= 201 && _aqi <= 300:
                      this.rank5.push(this.markers[idx])
                      break
                    case _aqi >= 301 && _aqi <= 500:
                      this.rank6.push(this.markers[idx])
                      break

                    default:
                      break
                  }
                  return
                }
              })
            })
          })
      })

    this._fetchfactory()
  },

  methods: {
    _fetchAQIGeo () {
      const AQIopts = {
        url: 'https://gist.githubusercontent.com/chuanxd/8c4282d169fddb673a0b63540c1f385d/raw/5cb8d84cfc9a34dd71e8f5a36c1901467dfcd5a6/aqi-station-geo.json'
      }

      return new Promise((resolve, reject) => {
        fetch(AQIopts)
          .then((res) => {
            this.markers = res.data.features.map((data) => {
              return {
                position: {
                  lat: data.geometry.coordinates[1],
                  lng: data.geometry.coordinates[0]
                },
                infoText: data.properties.SiteName
              }
            })
            resolve(res)
          })
          .catch((err) => {
            console.error(err.response)
            reject(err)
          })
      })
    },

    _fetchAQI () {
      const opts = {
        url: '//tw.diverbox.org/aqis'
      }
      return new Promise((resolve, reject) => {
        fetch(opts)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            console.error(err.response)
            reject(err)
          })
      })
    },

    _fetchfactory () {
      const factoryOpts = {
        url: 'https://gist.githubusercontent.com/chuanxd/621fe47ad0f7caf831a1ea42049aba0b/raw/4fb74862c8e1a63b62206d549f25ea952073afdb/factory-num-10k.json'
      }
      fetch(factoryOpts)
        .then((res) => {
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
