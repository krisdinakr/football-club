<template>
  <Loader v-if="isLoading" />
  <div v-else>
    <div v-if="count" class="team-list">
      <div class="info">
        <h1>Team of {{ teamList[0].area.name }}</h1>
        <h4>Total : {{ count }} teams</h4>
      </div>
      <div class="container">
        <Card v-for="team in teamList" :key="team.id" :title="team.name" :link="{ name: 'Profile', params: { id: team.id }}" :alt="team.shortName" :img="team.crestUrl" />
      </div>
    </div>
    <div v-else>No data team in this area</div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import Loader from '@/components/Loader.vue'
import Card from '@/components/Card.vue'

export default {
  props: ['id'],
  components: { Loader, Card },
  setup (props) {
    const count = ref(null)
    const teamList = ref(null)
    const isLoading = ref(true)

    const getTeamList = async () => {
      try {
        const { data } = await axios.get(`https://api.football-data.org/v2/teams?areas=${props.id}`, {
          headers: { 'X-Auth-Token': '1219b37dbeeb4f80ae814c6503484f76' }
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
  margin-bottom: 2rem;
}

.team-list .container {
  display: flex;
  padding: 1rem;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
