import {NativeModules, NativeEventEmitter} from 'react-native';
import {Message, wearableBridge} from './wearableBridge.ts';
import TdLib from 'react-native-tdlib';

const {WearBridge} = NativeModules;

export class WearableServer {
  constructor() {
    this.onMessage = this.onMessage.bind(this);

    wearableBridge.addListener(this.onMessage);
  }

  protected async onMessage(message: Message) {
    const request = message.title;

    switch (request) {
      case 'getProfile': {
        // if (!authorized) {
        //   wearableBridge.sendMessage({
        //     title: 'response',
        //     id: message.id,
        //     payload: {
        //       status: '401',
        //     }
        //   })
        // }

        const profile = await TdLib.getProfile();

        wearableBridge.sendMessage({
          title: 'response',
          id: message.id,
          payload: {
            status: '200',
            data: JSON.stringify(profile),
          }
        })
        break;
      }
      case 'getChats': {

        break;
      }
      case 'logout': {

        break;
      }
      case 'login': {

        break;
      }
      case 'getAuthStatus': {

        break;
      }
      case 'getChatMessages': {

        break;
      }
    }
  }
}


export const wearableServer = new WearableServer();