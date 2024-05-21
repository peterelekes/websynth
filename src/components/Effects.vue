<script setup>
import HighPassFilter from "@/components/fx/HighPassFilter.vue";
import LowPassFilter from "@/components/fx/LowPassFilter.vue";
import Panner from "@/components/fx/Panner.vue";
import Reverb from "@/components/fx/Reverb.vue";
import draggable from 'vuedraggable'
import {markRaw, ref} from "vue";
import {Icon} from "@iconify/vue";
import {store} from "@/store/store.js";

const props = defineProps({
  audioContext: Object,
});

const list = ref([
  {id: 1, component: markRaw(HighPassFilter)},
  {id: 2, component: markRaw(LowPassFilter)},
  {id: 3, component: markRaw(Panner)},
  {id: 4, component: markRaw(Reverb)},
]);


const onListEnd = (event) => {
  store.effectOrder = list.value.map((item) => item.id);
  console.log(store.effectOrder);
};

</script>

<template>
  <div class="effects">
    <draggable class="effects-list" :list="list" :itemKey="'id'" handle=".handle" v-slot:item="{element}" @end="onListEnd">
      <div :key="element.id" class="handle-effect">
          <div class="handle">
            <Icon
                icon="radix-icons:drag-handle-horizontal"
                color="black"
                width="32"
            />
          </div>
          <div class="effect">
            <component :is="element.component" :audioContext="props.audioContext"/>
          </div>
        </div>
    </draggable>
  </div>
</template>

<style scoped>
.effects-list {
  display: flex;
}

.handle-effect {
  display: flex;
  align-items: center;
  border: 1px solid black;
  position: relative;
  margin: 1rem;
}

.handle {
  cursor: move;
  position: absolute;
  top: 0;
  left: 0;
}

.effect {
  display: flex;
  flex-grow: 1;
  padding: 10px;
}

</style>