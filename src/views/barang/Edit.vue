<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useBarangStore } from "@/stores/barang";
import { onBeforeRouteLeave, useRoute } from "vue-router";

const barangStore = useBarangStore();

const form = ref({
    nama: "",
    kategori: "",
    berat: "",
});

const route = useRoute();
const id = route.params.id;

onMounted(async () => {
    if (id) {
        await barangStore.fetchBarangById(id).then((barang) => {
            form.value = barang;
        });
    }
});

watch(
    () => form.value.kategori,
    (newValue) => {
        form.value.kategori = newValue.toUpperCase();
    }
);

const error = computed(() => barangStore.error);
const clearError = () => {
    barangStore.clearError();
};
onBeforeRouteLeave(clearError);

const updateBarang = async () => {
    await barangStore.updateBarang(form.value);
};
</script>

<template>
    <main class="container mx-auto">
        <div class="mt-10">
            <form @submit.prevent="updateBarang" class="max-w-sm mx-auto">
                <div class="mb-2">
                    <label for="nama" class="block text-sm font-medium text-slate-700">Nama</label>
                    <input
                        type="text"
                        id="nama"
                        v-model="form.nama"
                        class="block w-full px-3 py-2 border-2 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 text-slate-900 sm:text-sm focus:outline-none"
                        :class="{ 'border-rose-500': error.nama }"
                        placeholder="Nama barang"
                    />
                    <span v-if="error.nama" class="text-sm text-rose-500">{{ error.nama }}</span>
                </div>
                <div class="mb-2">
                    <label for="kategori" class="block text-sm font-medium text-slate-700">Kategori</label>
                    <input
                        type="text"
                        id="kategori"
                        v-model="form.kategori"
                        class="block w-full px-3 py-2 border-2 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 text-slate-900 sm:text-sm focus:outline-none"
                        :class="{ 'border-rose-500': error.kategori }"
                        placeholder="Kategori"
                    />
                    <span v-if="error.kategori" class="text-sm text-rose-500">{{ error.kategori }}</span>
                </div>
                <div class="mb-2">
                    <label for="berat" class="block text-sm font-medium text-slate-700">Berat</label>
                    <input
                        type="number"
                        id="berat"
                        v-model="form.berat"
                        class="block w-full px-3 py-2 border-2 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 text-slate-900 sm:text-sm focus:outline-none"
                        :class="{ 'border-rose-500': error.berat }"
                        placeholder="Berat"
                    />
                    <span v-if="error.berat" class="text-sm text-rose-500">{{ error.berat }}</span>
                </div>
                <div class="mt-2">
                    <button
                        :disabled="barangStore.loading"
                        type="submit"
                        class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold tracking-widest text-center text-black uppercase transition duration-150 ease-in-out border border-transparent rounded-lg shadow-md active:bg-amber-600 bg-amber-400 hover:bg-amber-500 focus:ring-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                        :class="{ 'cursor-not-allowed opacity-50': barangStore.loading }"
                    >
                        {{ barangStore.loading ? "Loading..." : "Update" }}
                    </button>
                </div>
            </form>
        </div>
    </main>
</template>
