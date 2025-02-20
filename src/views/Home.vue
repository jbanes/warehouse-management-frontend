<script setup></script>

<template>
    <main class="container mx-auto">
        <div class="mt-10">
            <div class="flex items-center justify-center space-x-4">
                <RouterLink
                    :to="{ name: 'ship.form', params: { type: 'IN' } }"
                    class="py-6 text-sm font-medium bg-white border-2 rounded-md border-slate-900 text-slate-900 px-14"
                >
                    <img src="img/001.png" alt="" class="h-14" />
                    Receive goods
                </RouterLink>
                <RouterLink
                    :to="{ name: 'ship.form', params: { type: 'OUT' } }"
                    class="py-6 text-sm font-medium bg-white border-2 rounded-md border-slate-900 text-slate-900 px-14"
                >
                    <img src="img/002.png" alt="" class="h-14" />
                    Ship goods
                </RouterLink>
            </div>
        </div>
    </main>
</template>
