
<script setup>
	import { ref, computed, watch, reactive, onMounted } from 'vue'
	import DiskonNotFound from '../../assets/Nodiskon.png'
	import ModalTambahDiskon from '@/components/Modal/ModalTambahDiskon.vue'
	import ModalAPIURL from '@/components/Modal/ModalAPIURL.vue'
	import ModalListOutlide from '@/components/Modal/ModalListOutlide.vue'
	import ModalEditDiskon from '@/components/Modal/ModalEditDiskon.vue'


	import axios from 'axios'


	const state = reactive({
		outlide:null,
		discount:null
	})

	const dialog = reactive({
		api: false,
		listOutlide: false,
		discount: false,
		delete: false,
		editDiskon: false
	})

	const data = reactive({
		outlide: [],
		discount:[]
	})

	const dataDiskon = ref([])

	const dataalert = ref({
		show: false,
		message: '',
		type: 'success'
	})

	const apiUrl = import.meta.env.VITE_URL_API

	const loading = ref(false)
	const searchDiscount = ref('')
	const selectDiscount = ref([])
	const dataEdit = ref({})
	const headers = [
		{ 'title': 'Nama Diskon', 'value' : 'name' },
		{ 'title': 'Type Diskon', 'value' : 'tipe' },
		{ 'title': 'Diskon', 'value' : 'discount' },
		{ 'title' : 'Action', 'value'  : 'action', sortable: false}
	]

	async function getDiskon() {
		try {
			const res = await axios.get(`${apiUrl}/diskon`)
			const dataRes = res.data.filter(
				(item) => item.outledId === state.outlide._id
			)

			data.discount = dataRes
		} catch (e) {
			dataalert.value = {
				show: true,
				message: e,
				type: 'error'
			}
			data.discount = []
		}
	}
	
	
	async function handleSelectOutlideModal(outled) {
		try{
			state.outlide = {
				_id : outled._id,
				name: outled.name,
				address: outled.address
			}
			const res = await axios.get(`${apiUrl}/diskon`)
		    const dataRes = res.data
		    data.discount = dataRes.filter(items => items.outledId === outled._id)
						
			dialog.listOutlide = false	
		}catch(e){
			alert(e)
		}
	}
	
	const tambahDiskon = (diskon) => {
		getDiskon()
		dataalert.value = { show: true, message: 'Data berhasil ditambahkan' }				
	}

	async function handleOutlide(url) {
		loading.value = true
		try{
			const res = await axios.get(url)
			data.outlide = res.data
			dialog.api = false
			dialog.listOutlide = true
		} catch(e) {
			alert(e)
			console.error(e);
		} finally {
			loading.value = false
		}
	}

	async function handleDeleteDiscount() {
		for(const items of selectDiscount.value) {
			await axios.delete(`${apiUrl}/diskon/${items._id}`)
		}

		getDiskon()
		dialog.delete = false
		dataalert.value = { show: true, message: 'Data berhasil dihapus' }
		selectDiscount.value = []
	}

	function cancelSelectDiscount() {
		selectDiscount.value = []
	}

	

	function showEditDataDiskon(item) {
		dataEdit.value = {...item}
		dialog.editDiskon = true
		
	}

	async function editDiskon() {
		try {
			getDiskon()
			dataalert.value = { show: true, message: 'Data berhasil diubah' }
		}catch(e){
			alert(e)
		}
	}

	const hasOutlide = computed(() => !! state.outlide)

	const filterDiskon = computed(() => {
		if(!searchDiscount.value) return data.discount

		const search = searchDiscount.value.toLowerCase()

		return data.discount.filter(d => 
			d.name.toLowerCase().includes(search)
		)
	})


	const open = ref(false)
	const sOutled = ref('')

	const fOutled = computed(() => {
		if(!sOutled.value) return data.outlide
		return data.outlide.filter(p => 
			p.name.toLowerCase().includes(sOutled.value.toLowerCase())
		)
	})

	const selcOutlide = (outled) => {
		state.outlide = outled
		open.value = false
	}

</script>
<template>
	<div class="pa-4">
  		<v-alert
  			v-if="dataalert.show"
  			type="success"
  			prominent
  			style="position;absolute; min-width: 300px; max-width:400px; margin: 0px auto;"
  			elevation="0"
  		>
  			{{ dataalert.message }}
  			<v-btn variant="text" 
  				style="position: absolute; top: 20px; right: 5px;" small @click="dataalert.show = false">
					<v-icon size="24">mdi-close</v-icon>
  			</v-btn>
  		</v-alert>
		<v-row class="d-flex align-center">
			<v-col cols="6">
		    	<h1 class="text-h5 text-on-surface mb-4">
		      		Daftar Diskon
		    	</h1>	
			</v-col>
			<v-col cols="6">
				<div 
					class="d-flex align-center justify-end pa-5"
					style="width:100%;">
					<v-btn
						v-if="selectDiscount.length === 0 && data.discount.length > 0"
		            	color="success"
		            	variant="elevated"
		            	rounded="lg"
		            	@click="dialog.discount=true"
		            	prepend-icon="mdi-plus"
		            >
		              Tambah diskon
		            </v-btn>
		            <v-btn
		            	v-if="selectDiscount.length"
		            	color="error"
		            	variant="outlined"
		            	rounded="lg"
		            	elevation="0"
		            	@click="cancelSelectDiscount"
		            >
		              Batalkan
		            </v-btn>
	   	            <v-btn
		            	v-if="selectDiscount.length > 0"
	   	            	color="error"
	   	            	variant="elevated"
	   	            	rounded="lg"
	   	            	class="ml-2"
	   	            	elevation="0"
	   	            	@click="dialog.delete=true"
	   	            >
	   	              Hapus {{ selectDiscount.length }} Data
	   	            </v-btn>            
				</div>
			</v-col>
		</v-row>
		
		 <v-row
			class="d-flex align-center"
		 >
		 	<v-col cols="4">
				<div
					v-if="data.discount.length > 0" 
				>
					<v-text-field
						rounded="lg"
						v-model="searchDiscount"
						variant="outlined"
						label="search" />
					
				</div>
		 	</v-col>
			<v-col cols="4">
			
				<v-card
					v-if="hasOutlide" 
					variant="outlined"
					rounded="lg"
					class="select-box relative pa-3 ma-0 d-flex align-center justify-space-between"
				>
					<v-menu
						v-model="open"
						activator="parent"
						location="bottom"
						width="activator"
						style="right: 0px; "
						:close-on-content-click="false"
					>
						<v-card rounded="lg">
							<v-text-field
								v-model="sOutled"
								placeholder="Cari outlet"
								density="compact"
								variant="outlined"
								hide-details
								class="ma-2"
							/>

							<v-divider />

							<v-list>
								<v-list-item
									v-for="outlet in fOutled"
									:key="outlet._id"
									@click="selcOutlide(outlet)"
									:class="{ 'outlet-active': state.outlide?._id === outlet._id }"
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
											v-if="state.outlide?._id === outlet._id"
											color="green"
										>
											mdi-check
										</v-icon>
									</template>
								</v-list-item>
							</v-list>
						</v-card>
					</v-menu>

					<div class="d-flex align-center">
						<v-icon class="me-2">mdi-store</v-icon>

						<span v-if="selcOutlide">
							{{ state.outlide?.name }}
						</span>
						<span v-else class="text-grey">
							Pilih Outlet
						</span>
					</div>

					<v-icon>mdi-chevron-down</v-icon>
				</v-card>
			</v-col>
		</v-row>

    	<v-card
	    	v-if="!hasOutlide"
			rounded="xl"
			elevation="1"
			class="pa-6"
			min-height="420"
    	>
      		<div
        		class="d-flex flex-column align-center justify-center text-center h-100"
      		>
		        <div
		        	style="background: #f4f5f6; width: 240px;" 
		        	class="rounded-xl light pa-10 d-flex flex-column align-center  justify-center">
		        	<span style="font-size: 35px;">
		        		Ilustraion
		        	</span>
						Size 240 x 135
		        </div>

		        <h2 class="text-h6 text-on-surface mb-2">
		          Belum Ada Outlide Yang Dipilih
		        </h2>

		        <p class="text-body-2 text-medium-emphasis mb-4">
		          Silahkan pilih outlide terlebih dahulu.
		        </p>

		        <v-btn
		        	color="success"
		        	variant="text"
		        	rounded="lg"
		        	style="background: var(--bg-button-primary-subtle-enabled, #F0FBEF);"
		        	@click="dialog.api=true"
		        >
		        	Pilih Outlide
		        </v-btn>

		        <ModalAPIURL
		            v-model="dialog.api"
		            :loading="loading"
		            @submit="handleOutlide"
		         />
		         <ModalListOutlide
		            v-model="dialog.listOutlide"
		            :items="data.outlide"
		            @select="handleSelectOutlideModal"
		         />
          
    		</div>
    	</v-card>
    	<v-card
    		v-if="hasOutlide"
        	rounded="xl"
        	elevation="1"
          	min-height="420"
        >
        	<div
        		v-if="data.discount.length > 0" 
        		class="d-flex align-center">
				<v-data-table
				  	:headers="headers"
				  	:items="filterDiskon"
				  	show-select
				  	v-model="selectDiscount"
				  	:item-value="item => item"
				>
					<template #item.action="{ item }">
					    <v-btn
					      	variant="text"
					      	size="small"
					      	color="secondary"
					      	@click="showEditDataDiskon(item)"
					    >
					      	<v-icon>mdi-pencil</v-icon>
					    </v-btn>
					</template>
				</v-data-table>
        	</div>
          	<div
          		v-if="data.discount.length === 0"
            	class="d-flex flex-column align-center justify-center text-center h-100"
          	>
            	<v-img :src="DiskonNotFound" width="200" />
            
    
            	<h2 class="text-h6 text-on-surface mb-2">
              		Belum Ada Diskon
            	</h2>
           		<p class="text-body-2 text-medium-emphasis mb-4">
              		Silahkan tambah diskon untuk menarik pelanggan dan
              		meningkatkan penjualan.
            	</p>
    
	            <v-btn
	            	color="success"
	            	variant="elevated"
	            	rounded="lg"
	            	@click="dialog.discount=true"
	            	prepend-icon="mdi-plus"
	            >
	            	Tambah diskon
	            </v-btn>
    
            
              
          </div>
          <ModalTambahDiskon
              v-model="dialog.discount"
              :outled-id="state.outlide._id"
              @simpan="tambahDiskon"
           />
           
        </v-card>
        <ModalEditDiskon
            v-model="dialog.editDiskon"
            :data-edit="dataEdit"
            @simpan="editDiskon"
         />
        <v-dialog v-model="dialog.delete" max-width="400">
        	<v-card>
        		<v-card-title class="text-h6">
             		Konfirmasi Hapus
           		</v-card-title>
   
           		<v-card-text>
             		Yakin ingin menghapus
             		<b>{{ selectDiscount.length }}</b> data diskon?
           		</v-card-text>
   
           		<v-card-actions>
             		<v-spacer />
   
             		<v-btn
               			variant="text"
               			@click="dialog = false"
             		>
               			Batal
             		</v-btn>
   
             		<v-btn
               			color="error"
               			variant="flat"
               			@click="handleDeleteDiscount"
             		>
               			Ya, Hapus
             		</v-btn>
           		</v-card-actions>
         	</v-card>
       </v-dialog>
       
  	</div>
</template>




<style scoped>
.select-box {
	cursor: pointer;
}

.outlet-active {
	border-right: 4px solid #4CAF50;
	background-color: #f6fff8;
}
</style>

