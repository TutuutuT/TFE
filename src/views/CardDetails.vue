<script>
    fetch('http://localhost:3000/prompts/')
    .then(response => response.json())
    .then(data => prompts.value = data)
    .catch(err => console.log("error fetch"));
</script>

<template>

</template>