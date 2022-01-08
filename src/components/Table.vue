<template>
  <table id="table">
    <thead>
      <tr>
        <th>No</th>
        <th v-for="col in column" :key="col.key">{{ col.name }}</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in data" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td v-for="col in column" :key="col.key">{{ item[col.key] }}</td>
        <td>
          <router-link :to="{ name: 'TeamList', params: { id: item.id }}">
            <button class="table-button">More info</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['data', 'column']
}
</script>

<style>
#table {
  min-width: 80%;
  margin: 0 auto;
  border-collapse: collapse;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 20px;
}

#table thead th {
  background-color: #cd5b3c;
  color: #f7faf9;
  padding: 0.5rem;
  text-transform: capitalize;
}

#table td,
#table th {
  border: 1px solid #f7faf9;
  padding: 0.5rem;
}

#table tbody td:nth-of-type(odd) {
  text-align: center;
}

#table tbody td:nth-child(even) {
  text-align: left;
}

#table tbody tr:nth-of-type(even) {
  background-color: #e2d1bd;
}

.table-button {
  padding: 0.5rem 0.75rem;
  background: #cd5b3c;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  color: white;
  font-weight: 550;
}

.table-button:hover {
  background: #678478;
}

</style>
