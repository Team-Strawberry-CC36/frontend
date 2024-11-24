<template>
    <nav class="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
        <div class="text-xl font-bold">LOGO HERE</div>
        <input type="text" placeholder="Search..." class="flex-grow mx-4 p-2 border border-gray-300 rounded" />
        <div class="flex items-center gap-4">
            <span class="font-medium">Username</span>
            <a href="/dashboard" class="text-blue-600 hover:underline">Dashboard</a>
            <a href="/logout" class="text-red-600 hover:underline">Logout</a>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
    };
</script>