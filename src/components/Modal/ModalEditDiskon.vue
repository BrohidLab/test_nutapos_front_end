 <script setup>
	import { ref, reactive, computed, defineProps, defineEmits, watch } from 'vue'
	import axios from "axios"
	
	const props = defineProps({
		modelValue: Boolean,
		dataEdit: Object
	})

	const emit = defineEmits(['update:modelValue', 'simpan'])

	const dialog = computed({
		get: () => props.modelValue,
		set: val => emit('update:modelValue', val)
	})

	const newDiskon = reactive({
		name: props.dataEdit.name,
		tipe: props.dataEdit.tipe,
		discount: props.dataEdit.discount
	})

	const error = ref({
		name: null,
		discount: null
	});

	const tipeOptions = ['Persentase', 'Rupiah']

	watch(
		() => props.dataEdit,
		(val) => {
			 if (!val) return

			 newDiskon.name = val.name
			 newDiskon.tipe = val.tipe
			 newDiskon.discount = val.discount
		},
		{ immediate: true, deep: true }
	)
	

	const diskonProps = computed(() => {
		if (newDiskon.tipe === 'Persentase') {
			return {
				prependInnerIcon: 'mdi-percent',
				label: 'Persentase (%)',
				suffix: '',
				type: 'number',
			}
		} else {
			return {
				prependInnerIcon: '',
				label: 'Nominal Rupiah',
				suffix: 'Rp',
				type: 'number',
			}
		}
	})

	function validationForm() {
		let valid = true

		error.value = {
			name: '',
			discount: ''
		}

		if(!newDiskon.name) {
			error.value.name = 'Nama diskon wajib diisi'

			valid = false
		}

		if(newDiskon.discount === null || newDiskon.discount === '') {
			error.value.discount = 'Masukkan besaran diskon'

			valid =  false
		}

		return valid
	}

	const simpanDiskon = async () => {
		try {
			const apiUrl = import.meta.env.VITE_URL_API

			const payload = {
				...newDiskon,
				outledId: props.dataEdit.outledId
			}
		
			const resData = await axios.put(`${apiUrl}/diskon/${props.dataEdit._id}`, payload )
			emit('simpan', resData)
			emit('update:modelValue', false)
		}catch(e){
			alert(e)
		}		
	}
</script>

<template>
	<v-dialog v-model="dialog" width="500">
		<v-card rounded="xl" class="pa-6 position-relative">
			<v-btn
			      icon
			      @click="dialog=false"
			      variant="text"
			      elevation="0"
			      style="position: absolute; top: 12px; right: 12px;"
			   	>
	      		<v-icon>mdi-close</v-icon>
		    </v-btn>
			<v-card-title class="text-h6 text-on-surface">
				Edit Diskon
			</v-card-title>
			
			<v-card-text>
				<v-row class="d-flex flex-coloumn" gap="2">
					<v-col cols="12" class="pa-0">
						<v-text-field
							v-model="newDiskon.name"
							label="Nama Diskon"
							variant="outlined"
							density="comfortable"
							:error="!!error.name"
						>
							<template #details>
							    <div
							      v-if="error.name"
							      style="width:100%;text-align:left;margin-bottom: 10px; margin-left:-5px;"
							      class="d-flex align-center justify-start text-error text-caption"
							    >
									<v-icon size="14" class="me-1">mdi-close-circle</v-icon>
						      		<span>{{ error.name }}</span>
							    </div>
							  </template>
						</v-text-field>
						
					</v-col>

					<v-col cols="12" class="pa-0">
						<div class="d-flex justify-center">
						  <v-text-field
						    v-model="newDiskon.discount"
						    :label="newDiskon.tipe === 'Persentase' ? 'Persentase' : 'Nominal Rupiah'"
						    type="number"
						    variant="outlined"
						    density="comfortable"
						    class="flex-grow-1"
						    :error="!!error.discount"
						  >
						  	<template #details>
							    <div
							      v-if="error.discount"
							      style="width:100%;text-align:left;margin-bottom: 10px; margin-left:-5px;"
							      class="d-flex align-center justify-start text-error text-caption"
							    >
									<v-icon size="14" class="me-1">mdi-close-circle</v-icon>
						      		<span>{{ error.discount }}</span>
							    </div>
						  	</template>
						    <template #prepend-inner>
						      <span>{{ newDiskon.tipe === 'Persentase' ? '%' : 'Rp' }}</span>
						    </template>
						  </v-text-field>
						  <v-btn-toggle
  						    v-model="newDiskon.tipe"
  						    mandatory
  						    rounded="lg"
  						    class="flex-grow-0 mx-3"
  						  >
  						    <v-btn
  						      value="Persentase"
  						      :class="newDiskon.tipe === 'Persentase' ? 'text-success' : 'text-gray'"
  						      variant="outlined"
  						    >
  						      %
  						    </v-btn>
  						    <v-btn
  						      value="Rupiah"
  						      :class="newDiskon.tipe === 'Rupiah' ? 'text-success' : 'text-gray'"
  						      variant="outlined"
  						    >
  						      Rp
  						    </v-btn>
  						  </v-btn-toggle>
						</div>
					</v-col>
				</v-row>
			</v-card-text>

			<v-card-actions class="d-flex align-center">
				<v-btn style="width:100%;" color="green" rounded="xl" variant="elevated" @click="simpanDiskon">
					Simpan
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
