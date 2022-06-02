<template>
  <div class="div-relative">
    <div style="overflow: scroll" class="render-wrapper">
      <div class="div-graph" id="graph" v-html="dotHtml" @click="getId"></div>
    </div>
    <div class="div-description">
      <el-descriptions
        class="margin-top"
        title="详细信息"
        :column="1"
        border
        v-show="desShow"
      >
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">name</div>
          </template>
          {{ nodename }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">详情</div>
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, ref, onMounted, watch, reactive,nextTick } from "vue";
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

const dotHtml = ref("");
const nodename = ref("3123");
const desShow = ref(false);

const props = defineProps({
  dotData: String,
});

const { dotData } = toRefs(props);

let emit = defineEmits(["error"]);
onMounted(() => {
  console.log("1234:" + dotData.value);
  if (dotData.value) {
    renderFunc(dotData.value, dotHtml);
  }
});

async function renderFunc(data, dotFile) {
  try {
    const viz = new Viz({ Module, render });
    dotFile.value = await viz.renderString(data); // , this.config)
    dotFile.value= dotFile.value.replace("<svg","<svg id=\"svgtig\"");
  } catch (err) {
    // render error to label later
    console.log("error", err.message);

    emit("error", err.message);
  }

}
function getId(obj) {
  console.log("getId:" + obj.target.nodeName);
  if (obj.target.nodeName == "text") {
    console.log("getId:" + obj.target.innerHTML);
    desShow.value = true;
    nodename.value = obj.target.innerHTML;
  } else {
    desShow.value = false;
  }
}

</script>

<style type="text/css">
.div-relative {
  position: relative;
  background-color: #fff;
}
.render-wrapper {
  position: absolute;
  border: 1px solid #eeeeee;
  border-radius: 0 0 4px 4px;
  min-height: 200px;
  width: 100%;
  background-color: #fff;
}
.div-graph {
  margin: auto;
  padding-top: 30px;
  width: 60%;
}
.div-description {
  position: absolute;
  right: 50px;
  top: 30px;
  width: 200px;
  border: 1px solid #eeeeee;
}
svg {
  width: 100%;
  background-color: #fff;
}
</style>
