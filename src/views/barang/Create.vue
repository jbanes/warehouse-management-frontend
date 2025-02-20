<script setup>
import { nextTick, ref, reactive, computed, watch } from "vue";
import { useBarangStore } from "@/stores/barang";
import { onBeforeRouteLeave } from "vue-router";

const barangStore = useBarangStore();

const form = reactive({
    name: "",
    category: "",
    weight: "",
});

const nameInput = ref(null);
nextTick(() => nameInput.value.focus());

watch(
    () => form.category,
    (newValue) => {
        form.category = newValue.toUpperCase();
    }
);

const error = computed(() => barangStore.error);
const clearError = () => {
    barangStore.clearError();
};
onBeforeRouteLeave(clearError);

const saveBarang = async () => {
    await barangStore.storeBarang(form);
};
</script>

<template>
    <main class="container mx-auto">
        <div class="mt-10">
            <form @submit.prevent="saveBarang" class="max-w-sm mx-auto">
                <div class="mb-2">
                    <label for="name" class="block text-sm font-medium text-slate-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        ref="nameInput"
                        v-model="form.name"
                        class="block w-full px-3 py-2 border-2 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 text-slate-900 sm:text-sm focus:outline-none"
                        :class="{ 'border-rose-500': error.name }"
                        placeholder="Product Name"
                    />
                    <span v-if="error.name" class="text-sm text-rose-500">{{ error.name }}</span>
                </div>
                <div class="mb-2">
                    <label for="category" class="block text-sm font-medium text-slate-700">Category</label>
                    <input
                        type="text"
                        id="category"
                        v-model="form.category"
                        class="block w-full px-3 py-2 border-2 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 text-slate-900 sm:text-sm focus:outline-none"
                        :class="{ 'border-rose-500': error.category }"
                        placeholder="Category"
                    />
                    <span v-if="error.category" class="text-sm text-rose-500">{{ error.category }}</span>
                </div>
                <div class="mb-2">
                    <label for="weight" class="block text-sm font-medium text-slate-700">Weight</label>
                    <input
                        type="number"
                        id="weight"
                        v-model="form.weight"
                        class="block w-full px-3 py-2 border-2 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 text-slate-900 sm:text-sm focus:outline-none"
                        :class="{ 'border-rose-500': error.weight }"
                        placeholder="Weight"
                    />
                    <span v-if="error.weight" class="text-sm text-rose-500">{{ error.weight }}</span>
                </div>
                <div class="mt-2">
                    <button
                        :disabled="barangStore.loading"
                        type="submit"
                        class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold tracking-widest text-center text-black uppercase transition duration-150 ease-in-out border border-transparent rounded-lg shadow-md active:bg-amber-600 bg-amber-400 hover:bg-amber-500 focus:ring-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                        :class="{ 'cursor-not-allowed opacity-50': barangStore.loading }"
                    >
                        {{ barangStore.loading ? "Loading..." : "Save" }}
                    </button>
                </div>
            </form>
        </div>
    </main>
</template>
