<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isOpen = ref(false);
</script>

<template>
    <nav class="relative bg-white shadow dark:bg-slate-800">
        <div class="container px-6 py-3 mx-auto md:flex">
            <div class="flex items-center justify-between">
                <RouterLink to="/" class="flex items-center w-32">
                    <img class="w-6 sm:w-7 h-6 sm:h-7" src="/img/001.png" alt="warehouse management" />
                    <span class="text-sm font-bold">Warehouse</span>
                </RouterLink>

                <!-- Mobile menu button -->
                <div class="flex lg:hidden">
                    <button
                        @click="isOpen = !isOpen"
                        type="button"
                        class="text-slate-500 dark:text-slate-200 hover:text-slate-600 dark:hover:text-slate-400 focus:outline-none focus:text-slate-600 dark:focus:text-slate-400"
                        aria-label="toggle menu"
                    >
                        <svg
                            v-show="!isOpen"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
                        </svg>

                        <svg
                            v-show="isOpen"
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
            <div
                :class="[isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full']"
                class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between"
            >
                <div class="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
                    <RouterLink
                        to="/"
                        class="px-2.5 py-2 text-slate-700 transition-colors duration-300 transform rounded-lg dark:text-slate-200 hover:bg-amber-200 dark:hover:bg-slate-700 md:mx-2"
                        :class="{ 'bg-amber-200 dark:bg-slate-700': $route.name === 'home' }"
                        >Dashboard
                    </RouterLink>
                    <RouterLink
                        :to="{ name: 'barang.index' }"
                        class="px-2.5 py-2 text-slate-700 transition-colors duration-300 transform rounded-lg dark:text-slate-200 hover:bg-amber-200 dark:hover:bg-slate-700 md:mx-2"
                        :class="{ 'bg-amber-200 dark:bg-slate-700': $route.path.includes('barang') }"
                        >Products
                    </RouterLink>
                    <RouterLink
                        :to="{ name: 'pengirim.index' }"
                        class="px-2.5 py-2 text-slate-700 transition-colors duration-300 transform rounded-lg dark:text-slate-200 hover:bg-amber-200 dark:hover:bg-slate-700 md:mx-2"
                        :class="{ 'bg-amber-200 dark:bg-slate-700': $route.path.includes('pengirim') }"
                        >Shippers
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>
