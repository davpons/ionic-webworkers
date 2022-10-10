<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {

    let testWorker: Worker | undefined;

    const initWorkers = () => {
      if (window.Worker) {
        testWorker = new Worker('workers/testWorker.js')

        testWorker.onmessage = (e) => {
          alert(e.data)
        }

        setInterval(() => {
          let random = Math.random() * 10;
          testWorker!.postMessage([1, random])
        }, 2000)

      }
    }

    const stopWorkers = () => {
      testWorker?.terminate();
      testWorker = undefined;
    }

    onMounted(() => {
      initWorkers();
    })

    onUnmounted(() => {
      stopWorkers();
    })
  }
});
</script>