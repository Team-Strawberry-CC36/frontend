<template>
    <div class="place-info">
        <h2>Name of Place</h2>
        <p>General info placeholder...</p>
        <a href="/guide">Guide</a>
        <p>Etiquette info placeholder...</p>
        <a href="/experiences">Experiences</a>
    </div>
</template>

<script>
export default {
    name: "PlaceInfo",
};
</script>

<style scoped>
.place-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f9f9f9;
}

.place-info h2 {
  margin: 0;
}

.place-info a {
  color: #007bff;
  text-decoration: none;
}

.place-info a:hover {
  text-decoration: underline;
}
</style>