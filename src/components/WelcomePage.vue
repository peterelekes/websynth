<script setup>

</script>

<template>
  <div class="welcome-page">
      <h1>WEBSynth</h1>
      <h2>Click anywhere to start the application</h2>
      <p>&copy; Elekes Péter</p>
  </div>
</template>

<style scoped>
.welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgb(34,193,195);
  background: linear-gradient(148deg, rgba(34,193,195,1) 0%, rgba(96,135,197,1) 39%, rgba(158,200,185,1) 100%);
  margin: 0;
  padding: 0;
  position: relative;
}

h1 {
  font-size: 8rem;
  color: #fff;
  font-weight: bold;
  -webkit-text-stroke: 3px #000;
  text-shadow: 2px 2px 0 #000, 4px 4px 0 #000, 6px 6px 0 #000, 8px 8px 0 #000;
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h2 {
  margin-top: 1rem;
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

p {
  color: #fff;
  font-size: 1rem;
  margin-top: 0;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
