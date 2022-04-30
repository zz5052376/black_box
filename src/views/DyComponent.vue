<template>
  <div>
    <input v-model="com" type="radio" value="v3" />3<br />
    <input v-model="com" type="radio" value="v4" />4
    <transition name="comp" mode="out-in">
      <div>
      <component :is="com" />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "vue";
import v3 from "./Vis3.vue";
import v4 from "./Vis4.vue";
export default {
    components: {
    v3,
    v4,
  },
  setup() {
    const com = ref("v3");
    return {
      com,
    };
  },
};
</script>
