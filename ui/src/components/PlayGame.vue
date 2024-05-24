<template>
  <div class="col column">
    <div class="row q-pa-sm">
      <q-input
        dense
        outlined
        label="Node URL"
        v-model="nodeUrl"
        class="col q-mr-xs"
      />
      <q-btn color="primary" flat no-caps class="q-mr-xs" @click="connectToNode"
        >Connect</q-btn
      >
    </div>
    <q-separator />
    <div class="row q-pa-sm">
      <q-input dense outlined label="Your name" class="col q-mr-xs" />
      <q-btn color="primary" no-caps class="q-mr-xs">Join the game</q-btn>
      <q-btn no-caps color="negative">Reset</q-btn>
    </div>
    <div class="row q-pa-sm q-pt-md">
      <q-option-group
        v-model="model"
        dense
        no-caps
        toggle-color="primary"
        inline
        :options="[
          { label: '✊Rock', value: 'rock' },
          { label: '✋Paper', value: 'paper' },
          { label: '✌️Scissors', value: 'scissors' },
        ]"
      />
      <q-space />
      <q-btn no-caps dense color="secondary" disable>Submit</q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import {
//   RpcClient,
//   JsonRpcClient,
//   RpcMutateParams,
//   RpcMutateResponse,
// } from "@calimero-is-near/calimero-p2p-sdk";

const nodeUrl = ref("");

const connectToNode = () => {
  // console.log("connected");
  // const rpcClient: RpcClient = new JsonRpcClient(nodeUrl.value, "/jsonrpc");
  // console.log(rpcClient);
};
</script>
