<script setup>
import { nextTick, ref, reactive, computed, watch } from "vue";
import { usePengirimStore } from "@/stores/pengirim";
import { onBeforeRouteLeave } from "vue-router";

const pengirimStore = usePengirimStore();

const form = reactive({
    nama: "",
    codeShipper: "",
});

const namaInput = ref(null);
nextTick(() => namaInput.value.focus());

watch(
    () => form.codeShipper,
    (newValue) => {
        form.codeShipper = newValue.toUpperCase();
    }
);

const error = computed(() => pengirimStore.error);
const clearError = () => {
    pengirimStore.clearError();
};
onBeforeRouteLeave(clearError);

const saveShipper = async () => {
    await pengirimStore.storeShipper(form);
};
</script>

<template>
    <div class="container mx-auto">
        <div class="mt-10">
            <form @submit.prevent="saveShipper" class="max-w-sm mx-auto">
                <div class="mb-2">
                    <label for="nama" class="block text-sm font-medium text-gray-700">Nama pengirim</label>
                    <input
                        v-model="form.nama"
                        type="text"
                        id="nama"
                        ref="namaInput"
                        class="block w-full px-3 py-2 border-2 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 text-slate-900 sm:text-sm focus:outline-none"
                        :class="{ 'border-rose-500': error.nama }"
                        placeholder="nama pengirim"
                    />
                    <span v-if="error.nama" class="text-sm text-rose-500">{{ error.nama }}</span>
                </div>
                <div class="mb-2">
                    <label for="code" class="block text-sm font-medium text-gray-700">ID pengirim</label>
                    <input
                        v-model="form.codeShipper"
                        type="text"
                        id="code"
                        class="block w-full px-3 py-2 border-2 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 focus:border-amber-500 dark:focus:border-amber-600 focus:ring-amber-500 dark:focus:ring-amber-600 text-slate-900 sm:text-sm focus:outline-none"
                        :class="{ 'border-rose-500': error.codeShipper }"
                        placeholder="kode pengirim"
                    />
                    <span v-if="error.codeShipper" class="text-sm text-rose-500">{{ error.codeShipper }}</span>
                </div>
                <div class="mt-2">
                    <button
                        :disabled="pengirimStore.loading"
                        type="submit"
                        class="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-semibold tracking-widest text-center text-black uppercase transition duration-150 ease-in-out border border-transparent rounded-lg shadow-md active:bg-amber-600 bg-amber-400 hover:bg-amber-500 focus:ring-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                        :class="{ 'cursor-progress opacity-50': pengirimStore.loading }"
                    >
                        <svg
                            v-show="pengirimStore.loading"
                            class="w-5 h-5 mr-3 -ml-1 text-black animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        {{ pengirimStore.loading ? "Loading..." : "Simpan" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
