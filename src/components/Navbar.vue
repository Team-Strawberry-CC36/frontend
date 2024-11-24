<template>
    <nav class="navbar">
        <div class="logo">LOGO HERE</div>
        <input type="text" placeholder="Search..." class="search-bar" />
        <div class="nav-links">
            <span>Username</span>
            <a href="/dashboard">Dashboard</a>
            <a href="/logout">Logout</a>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
    };
</script>

<style scoped>
.navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.search-bar {
    flex-grow: 1;
    margin: 0 1rem;
    padding: 0,5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.nav-links {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.nav-links a {
    text-decoration: none;
    color: #333;
}

.nav-links span {
    font-weight: bold;
}
</style>