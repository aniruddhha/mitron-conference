import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Participant } from '../call-dash/call-dash.domain';

@Injectable({
  providedIn: 'root'
})
export class SignalingService {

  private socket: SocketIOClient.Socket

  get socketId() {
    return this.socket.id
  }

  constructor() { }

  connect() {
    this.socket = io.connect('http://localhost:3000')
  }

  listen(channel: string, fn: Function) {
    this.socket.on(channel, fn)
  }

  listenOnConnect(fn: Function) {
    this.listen(Signal.CONNECT, fn)
  }

  listenOnSignals(fn: Function) {
    this.listen(Signal.SIGNAL, fn)
  }

  send(chanel: string, message: SignalMessage) {
    this.socket.emit(chanel, message)
  }

  sendJoinRoomSignal(msg: SignalMessage) {
    this.send(Signal.HANDSHAKE, msg)
  }

  sendSignal(msg: SignalMessage) {
    this.send(Signal.SIGNAL, msg)
  }

  sendCallRequest(msg: SignalMessage) {
    this.sendSignal(msg)
  }
}

export interface SignalMessage {
  socketId: string
  type: Signal,
  participants?: Array<string>
  userName?: string,
  roomName?: string
  msg?: string,
  tm?: number
}

export enum Signal {
  HANDSHAKE = 'handshake',
  CONNECT = 'connect',
  VIDEO_CALL = 'video_call',
  SIGNAL = 'signal',
  ROOM_JOINED = 'room_joined',
  PING = 'ping',
  DISCONNECTED = 'disconnected'
}
