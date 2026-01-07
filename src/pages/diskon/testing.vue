<script setup>
import { ref, computed } from 'vue'

const open = ref(false)
const search = ref('')
const selectedOutlet = ref(null)

const outlets = ref([
  {
    _id: '1',
    name: 'Dapoer Rasa',
    address: 'Jl. Asia Afrika No. 25'
  },
  {
    _id: '2',
    name: 'Kopi Anak Bangsa',
    address: 'Jl. Gatot Subroto No. 33'
  },
  {
    _id: '3',
    name: 'Ruang Kopi',
    address: 'Jl. Sudirman No. 45'
  }
])

const filteredOutlets = computed(() => {
  if (!search.value) return outlets.value
  return outlets.value.filter(o =>
    o.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

function selectOutlet(outlet) {
  selectedOutlet.value = outlet
  open.value = false
}
</script>
<template>
  <div style="max-width:420px">
    <!-- SELECT LOOK -->
    <v-card
      variant="outlined"
      rounded="lg"
      class="select-box pa-3 d-flex align-center justify-space-between"
    >
      <!-- MENU -->
      <v-menu
        v-model="open"
        activator="parent"
        location="bottom"
        width="activator"
        :close-on-content-click="false"
      >
        <!-- DROPDOWN -->
        <v-card rounded="lg">
          <!-- SEARCH -->
          <v-text-field
            v-model="search"
            placeholder="Cari outlet"
            density="compact"
            variant="outlined"
            hide-details
            class="ma-2"
          />

          <v-divider />

          <!-- LIST OUTLET -->
          <v-list>
            <v-list-item
              v-for="outlet in filteredOutlets"
              :key="outlet._id"
              @click="selectOutlet(outlet)"
              :class="{ 'outlet-active': selectedOutlet?._id === outlet._id }"
            >
              <template #prepend>
                <v-icon>mdi-store</v-icon>
              </template>

              <v-list-item-title>
                {{ outlet.name }}
              </v-list-item-title>

              <v-list-item-subtitle>
                {{ outlet.address }}
              </v-list-item-subtitle>

              <template #append>
                <v-icon
                  v-if="selectedOutlet?._id === outlet._id"
                  color="green"
                >
                  mdi-check
                </v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- VALUE -->
      <div class="d-flex align-center">
        <v-icon class="me-2">mdi-store</v-icon>

        <span v-if="selectedOutlet">
          {{ selectedOutlet.name }}
        </span>
        <span v-else class="text-grey">
          Pilih Outlet
        </span>
      </div>

      <v-icon>mdi-chevron-down</v-icon>
    </v-card>
  </div>
</template>
<style scoped>
.select-box {
  cursor: pointer;
}

/* ITEM TERPILIH */
.outlet-active {
  border-right: 4px solid #4CAF50;
  background-color: #f6fff8;
}
</style>
