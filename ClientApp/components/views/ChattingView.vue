<template>
    <div>
        <div v-if="chattingSwitch">
            <Chatting></Chatting>
        </div>
    </div>
</template>


<script>

import Chatting from '@/components/home/Chatting.vue'

export default {
  name: 'ChattingView',
  components: { Chatting: Chatting },
  data() {
    return {
      chattingSwitch: true
    };
  }
};

</script>

