<template>
  <div class="team-list">
    <Loader v-if="isLoading" />
    <div v-else>
      <button @click="back" class="prev-btn">Go back</button>
      <div v-if="count">
        <div class="team-list-info">
          <h1>Team of {{ teamList[0].area.name }}</h1>
          <h4>Total : {{ count }} teams</h4>
        </div>
        <Pagination @filterData="paginate($event)" :data="teamList" :dataPerPage="8" :totalRecords="count" class="team-list-pag" />
        <div class="team-list-container">
          <Card v-for="team in dataToShow" :key="team.id" :title="team.name" :link="{ name: 'Profile', params: { id: team.id }}" :alt="team.shortName" :img="team.crestUrl" />
        </div>
      </div>
      <div v-else>No data team in this area</div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import Loader from '@/components/Loader.vue'
import Card from '@/components/Card.vue'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      dataToShow: null
    }
  },
  props: ['id'],
  components: { Loader, Card, Pagination },
  methods: {
    back () {
      this.$router.go(-1)
    },
    paginate (data) {
      this.dataToShow = data
    }
  },
  setup (props) {
    const count = ref(null)
    const teamList = ref(null)
    const isLoading = ref(true)

    const getTeamList = async () => {
      try {
        const { data } = await axios.get(`https://api.football-data.org/v2/teams?areas=${props.id}`, {
          headers: { 'X-Auth-Token': process.env.VUE_APP_API_TOKEN }
        })
        console.log(data)
        teamList.value = data.teams
        count.value = data.count
        isLoading.value = false
      } catch (err) {
        console.log(err)
      }
    }

    getTeamList()

    return { teamList, count, isLoading }
  }
}
</script>

<style>
.team-list {
  max-width: 90%;
  margin: 1rem auto;
}

.team-list-container {
  display: flex;
  padding: 1rem;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

.team-list-info h1 {
  margin-bottom: 0.5rem;
}

.team-list-pag {
  text-align: right;
}

@media screen and (max-width: 1023px) and (min-width: 768px) {
  .team-list .card {
    width: 10rem;
  }

  .team-list .card-title {
    font-size: 1rem;
  }
}

@media screen and (max-width: 600px) {
  .team-list-info {
    margin-bottom: 0.8rem;
  }
  .team-list .card {
    width: 100%;
  }
}

</style>
