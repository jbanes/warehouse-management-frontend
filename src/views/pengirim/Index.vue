<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { usePengirimStore } from "@/stores/pengirim";
import router from "@/router";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import DeleteModal from "./DeleteModal.vue";

const pengirimStore = usePengirimStore();
const shippers = ref(pengirimStore.shippers);
watchEffect(() => {
    shippers.value = pengirimStore.shippers;
});

onMounted(async () => {
    await pengirimStore.fetchShipper();
});

function showPengirmanShipper(id) {
    router.push({ name: "pengirim.shipping", params: { id: id } });
}

const modalId = ref(0);

function deleteModalShipper(id) {
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
                            <TableSkeleton v-if="pengirimStore.loading" />

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
                                            <th scope="col" class="relative px-6 py-3">
                                                <span class="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-slate-200">
                                        <tr v-for="shipper in shippers" :key="shipper.id">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ shipper.name }}</div>
                                                <div class="text-sm text-slate-500">{{ shipper.shortName }}</div>
                                            </td>
                                            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                <button
                                                    @click.prevent="showPengirmanShipper(shipper.id)"
                                                    class="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Shipments
                                                </button>
                                                |
                                                <RouterLink
                                                    :to="{ name: 'pengirim.edit', params: { id: shipper.id } }"
                                                    class="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </RouterLink>
                                                |
                                                <button
                                                    @click.prevent="deleteModalShipper(shipper.id)"
                                                    href="#"
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
                    :to="{ name: 'pengirim.create' }"
                    class="block py-2 text-sm font-semibold tracking-widest text-center uppercase border rounded-md shadow border-slate-300 text-slate-900 active:bg-amber-600 bg-amber-400 hover:bg-amber-500 focus:ring-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                    Tambah Pengirim
                </RouterLink>
            </div>
        </div>
    </main>

    <DeleteModal :modal-id="modalId" @close="modalId = 0" />
</template>
