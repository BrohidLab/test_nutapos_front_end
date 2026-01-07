<script setup>
	import { ref, reactive, computed, defineProps, defineEmits } from 'vue'

	const props = defineProps({
		modelValue: Boolean,
		loading: Boolean
	})

	const dialog = computed({ 
		get: () => props.modelValue,
		set: val => emit('update:modelValue', val)
	})

	const emit = defineEmits(['update:modelValue', 'submit'])
	const urlApi = ref('')
</script>

<template>
	<v-dialog v-model="dialog" width="500">
		<v-card rounded="xl" class="pa-5 position-relative">
			<v-btn
				icon
				@click="dialog=false"
				variant="text"
				elevation="0"
				style="position: absolute; top: 5px; right: 12px;"
			>
				<v-icon>mdi-close</v-icon>
		    </v-btn>
			
			<v-card-text>
				<v-row class="d-flex flex-coloumn justify-end" dense gap="0">
					<v-col cols="12" class="pt-5">
						<v-text-field
							v-model="urlApi"
							label="API URL crudcrud.com"
							variant="outlined"
							focused="true"
							placeholder="https://crudcrud.com/api/xxxxxxxxx/outlide"
							density="comfortable"
						/>
					</v-col>
					<v-col cols="4">
						<v-btn 
							class="px-10"
							:loading="loading"  
							color="green" 
							rounded="xl" 
							variant="elevated" 
							@click="emit('submit', urlApi)">
							Terapkan
						</v-btn>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
