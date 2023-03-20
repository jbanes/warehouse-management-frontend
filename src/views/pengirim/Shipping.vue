<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { usePengirimStore } from "@/stores/pengirim";
import { useRoute } from "vue-router";

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
                            <div class="overflow-hidden border-b shadow border-slate-200 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-slate-200">
                                    <thead class="bg-slate-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500"
                                            >
                                                Tipe
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500"
                                            >
                                                Barang
                                            </th>
                                            <th
                                                scope="col"
                                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-slate-500"
                                            >
                                                Tanggal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-slate-200">
                                        <tr v-for="(shipping, index) in shippings" :key="index">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ shipping.stok }}</div>
                                                <div class="text-sm text-slate-500">{{ shipping.tipe }}</div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ shipping.barang }}</div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-slate-900">{{ shipping.tanggal }}</div>
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
