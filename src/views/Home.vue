<template>
  <div class="home">
    <Loader v-if="isLoading" />
    <main class="home-content" v-else>
      <h1>Browse Football Club by Areas</h1>
      <div class="home-filter">
        <select @change="handleSelect" v-model="selectedArea" name="area">
          <option disabled value="">Select by Parent Area</option>
          <option value="all">All</option>
          <option :value="2014">Asia</option>
          <option :value="2267">World</option>
          <option :value="2077">Europe</option>
          <option :value="2001">Africa</option>
          <option :value="2175">Oceania</option>
          <option :value="2159">N/C America</option>
          <option :value="2220">South America</option>
        </select>
        <div>
          <Pagination @filterData="paginate($event)" :data="areas" :totalRecords="totalAreas" :dataPerPage="15" />
        </div>
      </div>
      <Table v-if="areas" :data="areasDataToShow" :column="column" />
      <div v-else>No Data</div>
    </main>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import Table from '@/components/Table.vue'
import Loader from '@/components/Loader.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  name: 'Home',
  components: { Table, Loader, Pagination },
  data () {
    return {
      column: [
        {
          key: 'id',
          name: 'id'
        },
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
      if (this.selectedArea === 'all') {
        this.getAreas()
      } else {
        try {
          const { data } = await axios.get(`https://api.football-data.org/v2/areas/${this.selectedArea}`, {
            headers: { 'X-Auth-Token': process.env.VUE_APP_API_TOKEN }
          })
          this.areas = data.childAreas
          this.totalAreas = data.childAreas.length
        } catch (err) {
          console.log(err)
        }
        this.isLoading = false
      }
    },
    paginate (data) {
      this.areasDataToShow = data
    }
  },
  setup () {
    const isLoading = ref(true)
    const areas = ref(null)
    const totalAreas = ref(null)
    const areasDataToShow = ref(null)

    const getAreas = async () => {
      try {
        const { data } = await axios.get('https://api.football-data.org/v2/areas', {
          headers: { 'X-Auth-Token': process.env.VUE_APP_API_TOKEN }
        })
        areas.value = data.areas
        totalAreas.value = data.count
      } catch (err) {
        console.log(err)
      }
      isLoading.value = false
    }

    getAreas()

    return { areas, totalAreas, isLoading, areasDataToShow, getAreas }
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
  font-size: 1rem;
  border-radius: 5px;
}

.home-filter {
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 600px) {
  #app .container {
    max-width: 100%;
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

  .home-filter{
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
  }
}
</style>
