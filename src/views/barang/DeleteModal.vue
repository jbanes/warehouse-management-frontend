<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import { useBarangStore } from "@/stores/barang";

const barangStore = useBarangStore();
const isOpen = ref(false);

const props = defineProps({
    modalId: {
        type: Number,
        required: true,
    },
});

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

const closeOnEscape = (e) => {
    if (e.key === "Escape" && isOpen.value) {
        closeModal();
    }
};

onMounted(() => document.addEventListener("keydown", closeOnEscape));

onUnmounted(() => {
    document.removeEventListener("keydown", closeOnEscape);
});

async function deleteBarang() {
    await barangStore.deleteBarang(props.modalId);
    if (!barangStore.loading) closeModal();
}
</script>

<template>
    <Teleport to="body">
        <div>
            <Transition name="bg-modal">
                <div v-if="isOpen" class="absolute inset-0 z-20 bg-black bg-opacity-50"></div>
            </Transition>
            <Transition name="modal">
                <div v-if="isOpen" class="fixed inset-0 z-20 flex items-center justify-center -mt-[26rem]">
                    <div class="p-4 m-auto w-[500px] bg-white shadow-lg rounded-2xl dark:bg-gray-800">
                        <div class="mb-6 text-lg font-semibold tracking-widest uppercase border-b">Delete Barang</div>
                        <div class="font-normal">Are you sure you want to delete this item?</div>
                        <div class="flex items-center justify-end mt-6 space-x-4 border-t">
                            <button
                                @click="closeModal"
                                class="px-4 py-2 mt-2 text-sm font-semibold tracking-widest text-center uppercase transition duration-200 ease-in border rounded-md shadow hover:bg-slate-100 focus:ring-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                            <button
                                @click.prevent="deleteBarang"
                                :disabled="barangStore.loading"
                                type="button"
                                class="block px-4 py-2 mt-2 text-sm font-semibold tracking-widest text-center uppercase transition duration-200 ease-in border rounded-md shadow border-slate-300 text-slate-900 active:bg-amber-600 bg-amber-400 hover:bg-amber-500 focus:ring-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                                :class="{
                                    'cursor-not-allowed opacity-50': barangStore.loading,
                                }"
                            >
                                {{ barangStore.loading ? "Loading..." : "Delete" }}
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </Teleport>
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
