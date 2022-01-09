<template>
  <div class="home">
    <Loader v-if="isLoading" />
    <main v-else>
      <div>
        <h1>Browse Football Club by Areas</h1>
        <select @change="handleSelect" v-model="selectedArea" name="area">
          <option disabled value="">Select by Parent Area</option>
          <option :value="2014">Asia</option>
          <option :value="2267">World</option>
          <option :value="2077">Europe</option>
          <option :value="2001">Africa</option>
          <option :value="2175">Oceania</option>
          <option :value="2159">N/C America</option>
          <option :value="2220">South America</option>
        </select>
      </div>
      <Table v-if="areas" :data="areas" :column="column" />
      <div v-else>No Data</div>
    </main>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import Table from '@/components/Table.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Home',
  components: { Table, Loader },
  data () {
    return {
      column: [
        {
          key: 'name',
          name: 'area'
        },
        {
          key: 'countryCode',
          name: 'code'
        },
        {
          key: 'parentArea',
          name: 'parent area'
        }
      ],
      selectedArea: ''
    }
  },
  methods: {
    async handleSelect () {
      this.isLoading = true
      try {
        const { data } = await axios.get(`https://api.football-data.org/v2/areas/${this.selectedArea}`, {
          headers: { 'X-Auth-Token': process.env.VUE_APP_API_TOKEN }
        })
        this.areas = data.childAreas
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    }
  },
  setup () {
    const isLoading = ref(true)
    const areas = ref(null)
    const totalAreas = ref(null)
    const parentArea = ref(null)

    const getAreas = async () => {
      try {
        const { data } = await axios.get('https://api.football-data.org/v2/areas', {
          headers: { 'X-Auth-Token': process.env.VUE_APP_API_TOKEN }
        })
        areas.value = data.areas
        totalAreas.value = data.count
        const parentAreaArray = areas.value.filter(area => area.parentArea !== null).map(el => el.parentArea)
        parentArea.value = Array.from(new Set(parentAreaArray))
      } catch (err) {
        console.log(err)
      }
      isLoading.value = false
    }

    getAreas()

    return { areas, totalAreas, parentArea, isLoading }
  }
}
</script>

<style>
.home {
  max-width: 90%;
  margin: 1rem auto;
  padding: 0 1.25rem;
}

.home h1 {
  margin-bottom: 1rem;
}

.home select {
  padding: 0.25rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border-radius: 5px;
}

@media screen and (max-width: 600px) {
  #app .container {
    width: 100%;
    margin: 0;
  }

  .home {
    width: 100%;
    margin: 0.5rem auto;
    padding: 0;
  }

  .home main {
    width: 100%;
  }
}
</style>
