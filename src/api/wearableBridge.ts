import {NativeModules, NativeEventEmitter} from 'react-native';

const {WearBridge} = NativeModules;
const wearEmitter = new NativeEventEmitter(WearBridge);

export type Message<T = any> = {
  title: string,
  id: string,
  payload: T,
}

export class WearableBridge {
  public listeners: ((message: Message) => void)[] = [];

  constructor() {
    wearEmitter.addListener('WearMessage', ({message}) => {
      this.listeners.forEach(value => {
        value(JSON.parse(message));
      });

      console.log('С часов пришло:', message);
    });
  }

  public async sendMessage<T>(message: Message<T>) {
    return WearBridge.sendToWatch(JSON.stringify(message));
  }

  public addListener(listener: (message: Message) => void) {
    this.listeners.push(listener);
  }

  public removedListener(listenerToRemove: (message: Message) => void) {
    this.listeners = this.listeners.filter(listener => listener !== listenerToRemove);
  }
}


export const wearableBridge = new WearableBridge();