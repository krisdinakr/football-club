<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn prev">Prev Page</button>
    <span class="pagination-pages">
      {{ currentPage }} of {{ pageSize }}
    </span>
    <button @click="nextPage" :disabled="currentPage * dataPerPage + 1 > totalRecords" class="pagination-btn next">Next Page</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: Math.ceil(this.totalRecords / this.dataPerPage),
      dataToShow: null
    }
  },
  props: ['dataPerPage', 'totalRecords', 'data'],
  methods: {
    nextPage () {
      this.currentPage += 1
      const start = (this.currentPage - 1) * this.dataPerPage
      this.dataToShow = this.filterData(start, start + this.dataPerPage)
      this.passEvent()
    },
    prevPage () {
      this.currentPage -= 1
      const start = (this.currentPage - 1) * this.dataPerPage
      const updatedData = this.filterData(start, start + this.dataPerPage)
      this.dataToShow = updatedData
      this.passEvent()
    },
    filterData (start, end) {
      return this.data.slice(start, end)
    },
    passEvent () {
      this.$emit('filterData', this.dataToShow)
    }
  },
  created () {
    this.dataToShow = this.filterData(0, this.dataPerPage)
    this.passEvent()
  }
}
</script>

<style>
.pagination-btn,
.pagination-pages {
  padding: 0.5rem;
  font-size: 0.8rem;
  width: 5rem;
}

.pagination-btn {
  background: transparent;
  border: 1.5px solid #cd5b3c;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.pagination-btn:nth-child(1) {
   border-radius: 5px 0 0 5px;
}

.pagination-pages {
  border-top: 1.5px solid #cd5b3c;
  border-bottom: 1.5px solid #cd5b3c;
}
</style>
