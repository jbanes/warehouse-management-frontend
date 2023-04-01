<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import { usePengirimStore } from "../../stores/pengirim";

const pengirimStore = usePengirimStore();
const isOpen = ref(false);

const props = defineProps<{
    modalId: number;
}>();

watchEffect(() => {
    if (props.modalId) {
        isOpen.value = true;
    }
});

const emit = defineEmits(["close"]);
const closeModal = () => {
    isOpen.value = false;
    emit("close");
};

const closeOnEscape = (e: { key: string }) => {
    if (e.key === "Escape" && isOpen.value) {
        closeModal();
    }
};

onMounted(() => document.addEventListener("keydown", closeOnEscape));

onUnmounted(() => {
    document.removeEventListener("keydown", closeOnEscape);
});

async function deleteShipper() {
    await pengirimStore.deleteShipper(props.modalId);
    if (!pengirimStore.loading) closeModal();
}
</script>

<template>
    <div>
        <Transition name="bg-modal">
            <div v-if="isOpen" class="absolute inset-0 z-20 bg-black bg-opacity-50"></div>
        </Transition>
        <Transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-20 flex items-center justify-center -mt-[26rem]">
                <div class="p-4 m-auto w-[500px] bg-white shadow-lg rounded-2xl dark:bg-gray-800">
                    <div class="mb-6 text-lg font-semibold tracking-widest uppercase border-b">Delete Shipper</div>
                    <div class="font-normal">Are you sure you want to delete this shipper?</div>
                    <div class="flex items-center justify-end mt-6 space-x-4 border-t">
                        <button
                            @click="closeModal"
                            class="px-4 py-2 mt-2 text-sm font-semibold tracking-widest text-center uppercase transition duration-200 ease-in border rounded-md shadow hover:bg-slate-100 focus:ring-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            @click.prevent="deleteShipper"
                            :disabled="pengirimStore.loading"
                            type="button"
                            class="inline-flex items-center px-4 py-2 mt-2 text-sm font-semibold tracking-widest text-center uppercase transition duration-200 ease-in border rounded-md shadow border-slate-300 text-slate-900 active:bg-amber-600 bg-amber-400 hover:bg-amber-500 focus:ring-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                            :class="{
                                'cursor-progress opacity-50': pengirimStore.loading,
                            }"
                        >
                            <svg
                                v-if="pengirimStore.loading"
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
                            {{ pengirimStore.loading ? "Loading..." : "Delete" }}
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.bg-modal-enter-active {
    animation: fade-in 0.5s;
}
.bg-modal-leave-active {
    animation: fade-in 0.5s reverse;
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

/* Modal slide up to down */
.modal-enter-active {
    animation: slide-in 0.5s;
}
.modal-leave-active {
    animation: slide-in 0.5s reverse;
}

@keyframes slide-in {
    0% {
        transform: translateY(-100%);
        opacity: 0;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
