import HttpHandler from './base-handler'

class ChatController {
  handler: HttpHandler;
  constructor() {
    this.handler = new HttpHandler('http://localhost:10001/api/v1');
  }
  async sendMessage(roomId, speaker, speakerId, speakerType, content) {
    let config = {
      url: '/chat/send',
      method: 'post',
      data: {
        RoomId: roomId,
        Speaker: speaker,
        SpeakerId: speakerId,
        SpeakerType: speakerType,
        Content: content,
      },
    };
    await this.handler.request(config);
  }
}

const chatController = new ChatController()

export default chatController;
