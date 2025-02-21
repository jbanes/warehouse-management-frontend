<script setup>
import { ref, watchEffect, onMounted, watch } from "vue";
import { useBarangStore } from "@/stores/barang";
import { usePengirimStore } from "@/stores/pengirim";
import { useStockStore } from "@/stores/stock";
import { useRoute } from "vue-router";

const route = useRoute();
const type = route.params.type;

const barangStore = useBarangStore();
const barangs = ref(barangStore.barangs);

const pengirimStore = usePengirimStore();
const shippers = ref(pengirimStore.shippers);

watchEffect(() => {
    barangs.value = barangStore.barangs;
    shippers.value = pengirimStore.shippers;
});

onMounted(async () => {
    if (type === "IN") {
        document.title = "Recieve Goods";
    } else {
        document.title = "Ship Goods";
    }

    await barangStore.fetchBarang();
    await pengirimStore.fetchShipper();
});

const form = ref({
    type: "",
    shipperId: "",
    productId: "",
    stock: 0,
});

const stockStore = useStockStore();

const sendStock = async () => {
    form.value.type = type;
    await stockStore.sendStock(form.value);
};
</script>

<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <form @submit.prevent="sendStock" class="max-w-sm mx-auto">
                <div class="mb-2">
                    <label for="country" class="block text-sm font-medium text-gray-700">Product</label>
                    <select
                        v-model="form.productId"
                        id="barang"
                        autocomplete="barang-name"
                        class="block w-full px-3 py-2 mt-1 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option v-for="barang in barangs" :key="barang.id" :value="barang.id">{{ barang.name }}</option>
                    </select>
                </div>
                <div class="mb-2">
                    <label for="ship" class="block text-sm font-medium text-gray-700">Shipper</label>
                    <select
                        v-model="form.shipperId"
                        id="ship"
                        autocomplete="ship-name"
                        class="block w-full px-3 py-2 mt-1 bg-white border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option v-for="shipper in shippers" :key="shipper.id" :value="shipper.id">
                            {{ shipper.shortName + "-" + shipper.name }}
                        </option>
                    </select>
                </div>
                <div class="mb-2">
                    <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        v-model="form.stock"
                        type="number"
                        id="quantity"
                        class="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Quantity"
                    />
                </div>
                <div class="mt-2">
                    <button type="submit" class="block w-full py-2 text-white bg-gray-800 rounded-md">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
