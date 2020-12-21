<template>
      <div class="progress" v-if="progress > 0 ">
      <div class="progress-bar bg-info" role="progressbar" :style="{ width: progress + '%' }" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
        {{ currentItem }}/10
      </div>
    </div>
</template>
<script>

import { eventBus } from '../main'


export default {

    data(){
        return {
            currentItem : 0,
            progress: 0
        }
    },

    created(){
        eventBus.$on("progressBarUpdated", (kayıtSayısıAl) => {
            this.currentItem = kayıtSayısıAl;
            this.progress = kayıtSayısıAl * 10;
        })
    }
    
}
</script>

<style scoped>

</style>