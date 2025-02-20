<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { useBarangStore } from "@/stores/barang";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import DeleteModal from "./DeleteModal.vue";

const barangStore = useBarangStore();
const barangs = ref(barangStore.barangs);
watchEffect(() => {
    barangs.value = barangStore.barangs;
});

onMounted(async () => {
    await barangStore.fetchBarang();
});

const modalId = ref(0);

function deleteModal(id) {
    modalId.value = id;
}
</script>

<template>
    <main class="container mx-auto">
        <div class="mt-10">
            <div class="max-w-3xl mx-auto">
                <div class="flex flex-col">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <TableSkeleton v-if="barangStore.loading" />

                            <div v-else class="overflow-hidden border-b shadow border-slate-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-slate-200">
                                    <thead class="bg-slate-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500"
                                            >
                                                Weight
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500"
                                            >
                                                Stock
                                            </th>
                                            <th scope="col" class="relative px-6 py-3">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-slate-200">
                                        <tr v-for="barang in barangs" :key="barang.id">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ barang.name }}</div>
                                                <div class="text-sm text-slate-500">{{ barang.category }}</div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ barang.weight }} KG</div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ barang.stock }}</div>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <RouterLink
                                                    :to="{ name: 'barang.edit', params: { id: barang.id } }"
                                                    class="text-indigo-600 hover:text-indigo-900"
                                                    >Edit
                                                </RouterLink>
                                                |
                                                <button
                                                    @click.prevent="deleteModal(barang.id)"
                                                    class="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-2">
            <div class="max-w-3xl mx-auto">
                <RouterLink
                    :to="{ name: 'barang.create' }"
                    class="block py-2 text-sm font-semibold tracking-widest text-center uppercase border rounded-md shadow border-slate-300 text-slate-900 active:bg-amber-600 bg-amber-400 hover:bg-amber-500 focus:ring-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                    Add Product
                </RouterLink>
            </div>
        </div>
    </main>

    <DeleteModal :modal-id="modalId" @close="modalId = 0" />
</template>
