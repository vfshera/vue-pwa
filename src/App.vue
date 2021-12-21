<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>PWA Example</h1>
    <p>With Notifications and Update!</p>

    <div v-if="isRefresh" id="updateBanner">
      <span>New Update Available!</span>
    <button  @click="update">Refresh</button>

    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      registration: null,
      isRefresh: false,
      refreshing: false,
    };
  },
  methods: {
    appUpdateUI: function (e) {
      this.registration = e.detail;
      this.isRefresh = true;
    },
    update() {
      this.isRefresh = false;
      if (this.registration || this.registration.waiting) {
        this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
      }
    },
  },
  created() {
    document.addEventListener("serviceWorkerUpdateEvent", this.appUpdateUI, {
      once: true,
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-size: 64px;
}

p {
  font-style: italic;
}

#updateBanner {
  padding: 20px;
  color: green;
  background-color: #f1f1f1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

button{
  color:green;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
