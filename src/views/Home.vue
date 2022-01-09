<template>
  <div class="home">
    <Loader v-if="isLoading" />
    <main class="home-content" v-else>
      <h1>Browse Football Club by Areas</h1>
      <div class="home-filter">
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
        <div>
          <button @click="prevPage" :disabled="currentPage === 1" class="home-btn btn-prev">Prev Page</button>
          <span class="home-pages">
            {{ currentPage }} of {{ pageSize }}
          </span>
          <button @click="nextPage" :disabled="currentPage * dataPerPage + 1 > totalAreas" class="home-btn btn-next">Next Page</button>
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
import { onUpdated } from '@vue/runtime-core'

export default {
  name: 'Home',
  components: { Table, Loader },
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
      try {
        const { data } = await axios.get(`https://api.football-data.org/v2/areas/${this.selectedArea}`, {
          headers: { 'X-Auth-Token': process.env.VUE_APP_API_TOKEN }
        })
        this.areas = data.childAreas
        this.totalAreas = data.childAreas.length
        this.areasDataToShow = this.filterData(0, this.dataPerPage)
        this.currentPage = 1
      } catch (err) {
        console.log(err)
      }
      this.isLoading = false
    },
    nextPage () {
      this.currentPage += 1
      const start = (this.currentPage - 1) * this.dataPerPage
      const updatedData = this.filterData(start, start + this.dataPerPage)
      this.areasDataToShow = updatedData
    },
    prevPage () {
      this.currentPage -= 1
      const start = (this.currentPage - 1) * this.dataPerPage
      const updatedData = this.filterData(start, start + this.dataPerPage)
      this.areasDataToShow = updatedData
    }
  },
  setup () {
    const isLoading = ref(true)
    const areas = ref(null)
    const totalAreas = ref(null)
    const areasDataToShow = ref(null)
    const currentPage = ref(1)
    const dataPerPage = ref(15)
    const pageSize = ref(null)

    const getAreas = async () => {
      try {
        const { data } = await axios.get('https://api.football-data.org/v2/areas', {
          headers: { 'X-Auth-Token': process.env.VUE_APP_API_TOKEN }
        })
        areas.value = data.areas
        totalAreas.value = data.count
        areasDataToShow.value = filterData(0, dataPerPage.value)
      } catch (err) {
        console.log(err)
      }
      isLoading.value = false
    }

    getAreas()

    const filterData = (start, end) => {
      return areas.value.slice(start, end)
    }

    onUpdated(() => {
      pageSize.value = Math.ceil(totalAreas.value / dataPerPage.value)
    })

    return { areas, totalAreas, isLoading, areasDataToShow, filterData, currentPage, dataPerPage, pageSize }
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

.home-btn,
.home-pages {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  width: 5rem;
}

.home-btn {
  background: transparent;
  border: 1.5px solid #cd5b3c;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.home-btn:nth-child(1) {
   border-radius: 5px 0 0 5px;
}

.home-pages {
  border-top: 1.5px solid #cd5b3c;
  border-bottom: 1.5px solid #cd5b3c;
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
