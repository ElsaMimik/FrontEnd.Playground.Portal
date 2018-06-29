import Vue from 'vue'
import ChattingView from '@/components/views/ChattingView.vue'
import WebsocketClient from '@/utilities/websocket.lib'
import EventBus from '@/utilities/event-bus.js'

new Vue({
  el: '#app',
  render: h => h(ChattingView),
});

EventBus.$on('start-chat', (token) => {
  var hub = WebsocketClient.get('cs-chatter');
  hub.start('ws://localhost:10002/chat', token).then(() => {
    console.info('signalr started...');
  }).catch(err => console.error(err));
});
