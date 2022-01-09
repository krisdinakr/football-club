<template>
  <div class="player">
    <Loader v-if="isLoading" />
    <div v-else>
      <div v-if="player">
        <button @click="back" class="prev-btn">Go back</button>
        <div class="player-content">
          <p class="player-header">Player Profile</p>
          <h1>{{ player.name }}</h1>
          <hr>
          <p v-if="player.position"><b>Position: </b> {{ player.position }}</p>
          <p v-if="player.firstName"><b>First name: </b> {{ player.firstName }}</p>
          <p v-if="player.lastName"><b>Last name: </b> {{ player.lastName }}</p>
          <p v-if="player.nationality"><b>Nationality: </b> {{ player.nationality }}</p>
          <p v-if="player.dateOfBirth"><b>Date of Birth: </b> {{ player.dateOfBirth }}</p>
          <p v-if="player.countryOfBirth"><b>Country of Birth: </b> {{ player.countryOfBirth }}</p>
          <p v-if="player.lastUpdated"><b>Last Updated: </b> {{ new Date(player.lastUpdated).toUTCString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import Loader from '@/components/Loader.vue'

export default {
  props: ['id'],
  components: { Loader },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  setup (props) {
    const player = ref(null)
    const isLoading = ref(null)

    const getPlayer = async () => {
      isLoading.value = true
      try {
        const { data } = await axios.get(`https://api.football-data.org/v2/players/${props.id}`, {
          headers: { 'X-Auth-Token': process.env.VUE_APP_API_TOKEN }
        })
        console.log(data)
        player.value = data
      } catch (err) {
        console.log(err)
      }
      isLoading.value = false
    }

    getPlayer()

    return { player, isLoading }
  }
}
</script>

<style>
.player {
  max-width: 90%;
  margin: 1rem auto;
}

.player-content {
  background: #e2d1bd;
  border-radius: 20px;
  min-height: 70vh;
  padding: 1.5rem 1.8rem;
}

.player-header {
  width: 12rem;
  text-align: center;
  padding: 0.5rem;
  font-weight: 550;
  border: 2px solid #3e4642;
  border-radius: 10px;
  margin-left: auto;
}

.player-content h1 {
  margin: 1rem 0;
  font-size: 2.25rem;
  letter-spacing: 0.5px;
}

.player-content hr {
  border-color: #3e4642;
  margin-bottom: 1rem;
}

.player-content p {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
}
</style>
