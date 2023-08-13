<script setup>
import { ref, onMounted } from "vue";
import { Midjourney } from "midjourney";

const SERVER_ID = "1082500871478329374";
const CHANNEL_ID = "1094892992281718894";
const SALAI_TOKEN = "MjY5MDQ3OTcwMzEyMjI0NzY4.GVgjx5.j10PTERhmtQt9JLa2Bg1eaFsbXAQAdb_D7MD1o";

const Imagine = ref(null);
const Varition = ref(null);
const Upscale = ref(null);
const CustomZoomout = ref(null);

const initializeMidjourney = async () => {
  const client = new Midjourney({
    ServerId: SERVER_ID,
    ChannelId: CHANNEL_ID,
    SalaiToken: SALAI_TOKEN,
    Debug: true,
    Ws: true,
  });

  await client.init();

  Imagine.value = await client.Imagine(prompt.value, (uri, progress) => {
    console.log("loading", uri, "progress", progress);
  });

  if (!Imagine.value) {
    console.log("no message");
    return;
  }

  const V1CustomID = Imagine.value.options?.find((o) => o.label === "V1")?.custom;
  if (!V1CustomID) {
    console.log("no V1");
    return;
  }

  Varition.value = await client.Custom({
    msgId: Imagine.value.id,
    flags: Imagine.value.flags,
    customId: V1CustomID,
    content: prompt.value,
    loading: (uri, progress) => {
      console.log("loading", uri, "progress", progress);
    },
  });

  console.log(Varition.value);

  const U1CustomID = Imagine.value.options?.find((o) => o.label === "U1")?.custom;
  if (!U1CustomID) {
    console.log("no U1");
    return;
  }

  Upscale.value = await client.Custom({
    msgId: Imagine.value.id,
    flags: Imagine.value.flags,
    customId: U1CustomID,
    loading: (uri, progress) => {
      console.log("loading", uri, "progress", progress);
    },
  });

  if (!Upscale.value) {
    console.log("no Upscale");
    return;
  }

  console.log(Upscale.value);

  const zoomout = Upscale.value?.options?.find((o) => o.label === "Custom Zoom");
  if (!zoomout) {
    console.log("no zoomout");
    return;
  }

  CustomZoomout.value = await client.Custom({
    msgId: Upscale.value.id,
    flags: Upscale.value.flags,
    content: `${prompt.value} --zoom 2`,
    customId: zoomout.custom,
    loading: (uri, progress) => {
      console.log("loading", uri, "progress", progress);
    },
  });

  console.log(CustomZoomout.value);
};

onMounted(() => {
  initializeMidjourney();
});
</script>



<template>


</template>