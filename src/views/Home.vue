<template>
  <main class="home">
    <h1>Browse Football Club by Areas</h1>
    <div  class="content">
      <Table v-if="areas" :data="areas" :column="column" />
      <div v-else>No Data</div>
    </div>
  </main>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import Table from '@/components/Table.vue'

export default {
  name: 'Home',
  components: { Table },
  data () {
    return {
      column: [
        {
          key: 'name',
          name: 'name'
        },
        {
          key: 'countryCode',
          name: 'code'
        },
        {
          key: 'parentArea',
          name: 'area'
        }
      ]
    }
  },
  setup () {
    const areas = ref(null)
    const totalAreas = ref(null)
    const parentArea = ref(null)

    const getAreas = async () => {
      try {
        const { data } = await axios.get('https://api.football-data.org/v2/areas?limit=10', {
          headers: { 'X-Auth-Token': '1219b37dbeeb4f80ae814c6503484f76' }
        })
        areas.value = data.areas
        totalAreas.value = data.count
      } catch (err) {
        console.log(err)
      }
    }

    getAreas()

    return { areas, totalAreas, parentArea }
  }
}
</script>
