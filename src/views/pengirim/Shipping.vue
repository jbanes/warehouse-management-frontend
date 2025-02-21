<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { usePengirimStore } from "@/stores/pengirim";
import { useRoute } from "vue-router";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";

const pengirimStore = usePengirimStore();
const shippings = ref(pengirimStore.shipping);
watchEffect(() => {
    shippings.value = pengirimStore.shipping;
});

const route = useRoute();

onMounted(async () => {
    await pengirimStore.getShippingByShipper(route.params.id);
});
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
                                                Type
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500"
                                            >
                                                Product
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500"
                                            >
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-slate-200">
                                        <tr v-if="!shippings.length">
                                            <td class="px-6 py-4 whitespace-nowrap" colspan="3">
                                                <div class="text-sm text-center text-slate-900">
                                                    <span
                                                        class="px-3.5 py-1 rounded-md bg-amber-200 tracking-widest font-semibold text-amber-900 uppercase"
                                                    >
                                                        No shipping found
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr v-else v-for="(shipping, index) in shippings" :key="index">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ shipping.stock }}</div>
                                                <div class="text-sm text-slate-500">{{ shipping.type }}</div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ shipping.product }}</div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ shipping.date }}</div>
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
    </main>
</template>
