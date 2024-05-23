<script setup>
import HighPassFilter from "@/components/fx/HighPassFilter.vue";
import LowPassFilter from "@/components/fx/LowPassFilter.vue";
import Panner from "@/components/fx/Panner.vue";
import Reverb from "@/components/fx/Reverb.vue";
import Chorus from "@/components/fx/Chorus.vue";
import Distortion from "@/components/fx/Distortion.vue";
import Flanger from "@/components/fx/Flanger.vue";
import draggable from 'vuedraggable'
import {markRaw, onMounted, ref} from "vue";
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
  {id: 5, component: markRaw(Chorus)},
  {id: 6, component: markRaw(Distortion)},
  {id: 7, component: markRaw(Flanger)},
]);


const onListEnd = (event) => {
  store.effectOrder = list.value.map((item) => item.id);
  console.log(store.effectOrder);
};

const dragOptions = ref(null);

onMounted(() => {
  dragOptions.value = {
    animation: 300,
    group: "description",
    ghostClass: "ghost",
    chosenClass: "no-move",
    forceFallback: true,
    fallbackOnBody: true,
    swapThreshold: 0.8,
    invertSwap: true,
    handle: ".handle",
  };
});

</script>

<template>
  <div class="effects">
    <draggable
        class="effects-list"
        :list="list" :itemKey="'id'"
        handle=".handle"
        v-slot:item="{element}"
        v-bind="dragOptions"
        @end="onListEnd">
      <transition-group name="list" tag="div">
        <div :key="element.id" class="handle-effect" :class="`effect-${element.id}`">
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
      </transition-group>
    </draggable>
  </div>
</template>

<style scoped>

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.8;
}

.effects-list {
  display: flex;
  height: 30vh;
}


.handle-effect {
  display: flex;
  align-items: center;
  position: relative;
  margin: 1rem;
  border: 1px solid var(--color-dark-blue);
  border-radius: 10px;
  -webkit-box-shadow: 1rem 1rem 1rem rgba(0.2, 0.9, 0.5, 0.7);
  min-height: 88%;
}

.handle-effect.effect-1{
  background: var(--color-pink);
}

.handle-effect.effect-2 {
  background: var(--color-light-orange);
}

.handle-effect.effect-3{
  background: var(--color-light-yellow);
}

.handle-effect.effect-4 {
  background: var(--color-light-green);
}

.handle-effect.effect-5{
  background: var(--color-light-blue);
}

.handle-effect.effect-6 {
  background: var(--color-turqoise);
}

.handle-effect.effect-7 {
  background: var(--color-light-purple);
}

.handle-effect:first-child{
  margin-left: 0;
}

.handle-effect.last-child{
  margin-right: 0;
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