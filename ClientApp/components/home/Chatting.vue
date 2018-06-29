<template>
    <div id="ChatIndex" class="container theme-showcase">
        <h1>Player Chat Service</h1>
        <div>
          Name <input v-model="vm.name"/>
        </div>
        <br>
        <div>
          Token <input v-model="vm.token"/>
        </div>
        <br>
        <div>
          RoomId <input v-model="vm.roomId"/>
        </div>
        <br>
        <div>
          <button @click="startChat()">start chat</button>
        </div>
        <br>
        <div>
          <input v-model="pendingMessage"/>
          <button @click="sendMessage()">send messaage</button>
        </div>
        <br>
        <div class="container theme-showcase">
            <div class="header"></div>    
            <div class="container">            
                <ul :key="index" v-for="(message, index) in vm.history">
                    <li>
                        <div :class="{bubble: message.isSelf, bubble2: !message.isSelf}"> 
                        <span :class="{personName: message.isSelf, personName2: !message.isSelf}">{{message.speaker}}</span> <br>
                        <span :class="{personSay: message.isSelf, personSay2: !message.isSelf}">{{message.content}} </span> </div>
                        <span :class="{'time round': message.isSelf, 'time2 round': !message.isSelf}"> {{message.datetime}} <span></span> </span>
                    </li>        
                </ul>
            </div>
        </div>
    </div>  
</template>

<script>

import Moment from 'moment'
import EventBus from '@/utilities/event-bus.js'
import { WebsocketRegister } from '@/utilities/websocket.lib'
import Controller from '@/api/chatting.controller'

class MessageModel {
  constructor() {
    this.messageId = 0;
    this.roomId = '';
    this.content = '';
    this.speaker = '';
    this.speakerId = '';
    this.isSelf = false;
    this.datetime = new Moment().format('YYYY-MM-DD HH:mm:ss');
  }
  set(callback) {
    callback(this);
  }
}

class DataModel {
  constructor() {
    this.history = [];
    this.roomId = '';
    this.name = 'alpha';
    this.userId = '4060e949-2476-4f25-9aaf-b31f14d61767';
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0LmNvbSIsImlzcyI6ImNoYXQuY29tIiwianRpIjoiNDA2MGU5NDktMjQ3Ni00ZjI1LTlhYWYtYjMxZjE0ZDYxNzY3Iiwic3BlYWtlciI6ImFscGhhIiwic2tpbGwiOiIxIiwibmJmIjoxNTMwMDExNjU0LCJleHAiOjE1MzI2MDM2NTQsImlhdCI6MTUzMDAxMTY1NH0.Q3sbedd8JZs_v997VfTpkEd77ShQdsLm36-sLa-W4_8';
  }
};

let viewData = new DataModel();

let contentHandler = {
  message(speaker, content) { 
    var message = new MessageModel();
    message.set(a => {
      a.speaker = speaker;
      a.content = content;
      a.isSelf = speaker == viewData.name;
    });
    viewData.history.push(message);
  },
  dispatched(speaker, content) { 
    var message = new MessageModel();
    message.set(a => {
      a.speaker = speaker;
      a.content = content;
      a.isSelf = speaker == viewData.name;
    });
    viewData.history.push(message);
  },
  join(speaker, content, roomId) { 
    var message = new MessageModel();
    message.set(a => {
      a.speaker = speaker;
      a.content = `hi ${viewData.name}, welcome join the room [${roomId}]`;
      a.roomId = roomId;
      a.isSelf = speaker == viewData.name;
    });
    viewData.history.push(message);
    viewData.roomId = roomId;
  },
  close(speaker, content) { 
    var message = new MessageModel();
    message.set(a => {
      a.speaker = speaker;
      a.content = content;
      a.isSelf = speaker == viewData.name;
    });
    viewData.history.push(message);
  }
};

var actions = {
  sendMessage(roomId, speaker, speakerId, content) {
    return Controller.sendMessage(roomId, speaker, speakerId, 1, content);
  }
};

export default {
  name: 'Chatting',
  data() {
    return {
      vm: viewData,
      pendingMessage: ''
    }
  },
  methods: {
    startChat() {
      EventBus.$emit('start-chat', this.vm.token);
    },
    sendMessage() {
      actions
        .sendMessage(this.vm.roomId, this.vm.name, this.vm.userId, this.pendingMessage)
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    new WebsocketRegister('cs-chatter')
      .set('message', contentHandler.message)
      .set('dispatched', contentHandler.dispatched)
      .set('join', contentHandler.join)
      .set('close', contentHandler.close);
  }
}
</script>
