<script setup>
	import { ref, computed } from 'vue'
	import NotFound from '@/assets/nt_found.png'	
	const props = defineProps({
	  modelValue: Boolean,
	  items: Array,
	})

	const emit = defineEmits(['update:modelValue', 'select'])
	const search = ref('')

	
	const filterOutlet = computed(() => {
		if(!search.value) return props.items

		return props.items.filter(item => 
			item.name.toLowerCase().includes(search.value.toLowerCase())
		)
	})

	const close = () =>{
		emit('update:modelValue',false)
	}

	function selectOutlide(item) {
		emit('select', item)
		emit('update:modelValue', false)
	}

</script>

<template>
	<v-dialog v-model="props.modelValue" max-width="600">
		<v-card class="pa-6 relative">
			<v-card-title>
				<span>Pilih Outlet</span>
			</v-card-title>
			<v-btn 
				icon 
				@click="close" 
				variant="text" 
				elevation="0" 
				style="position: absolute; top: 5px; right: 0px">
					<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-text class="pa-0 ma-0">
				<v-row class="pa-0 ma-0" gap="0">
					<v-col cols="12" class="pa-0 ma-0">
						<v-text-field
							v-model="search"
							type="text"
							rounded="xl"
							placeholder="Cari nama outlet disini"
							variant="outlined"
							class="pa-4"
							density="comfortable"	
							>
								<template #prepend-inner>
									<v-icon class="pa-5">
										mdi-magnify
									</v-icon>
								</template>
						</v-text-field>
					</v-col>
					<v-col cols="12" class="pa-0 ma-0">
						<v-list>
							<v-list-item
								class="d-flex align-center"
								v-for="item in filterOutlet"
								:key="item.id"
								@click="selectOutlide(item)"
							>
								<v-row class="align-center mb-2">
									<v-col class="mr-3" cols="auto">
								    	<v-icon  color="primary" size="36">mdi-store</v-icon>
								    </v-col>
								    <v-col>
								    	<div>{{ item.name }}</div>
								    	<div class="text-body-2 text-medium-emphasis">{{ item.address }}</div>
								    </v-col>
								  </v-row>
							</v-list-item>
							<v-list-item v-if="filterOutlet.length === 0">
								<v-row>
									<v-col cols="12" class="d-flex flex-column pa-10 text-center justify-center align-center">
										<v-img
											:src="NotFound"
											width="240"
											height="135" 
										 />
										 <span class="font-weight-bold text-h5 mt-2">Hasil tidak ditemukan</span>
										<span>Kami tidak menemukan kata yang Anda cari. Silahkan coba dengan kata kunci yang lain.</span>
									</v-col>
								</v-row>
							</v-list-item>
						</v-list>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
