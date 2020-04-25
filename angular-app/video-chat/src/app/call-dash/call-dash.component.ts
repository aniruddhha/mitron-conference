import { SignalingService, Signal, SignalMessage } from './../shared-services/signaling.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat, Participant } from './call-dash.domain';
import SimplePeer from 'simple-peer';

@Component({
  selector: 'app-call-dash',
  templateUrl: './call-dash.component.html',
  styleUrls: ['./call-dash.component.css']
})
export class CallDashComponent implements OnInit {

  private peer: SimplePeer.Instance;

  roomName: string
  chats: Array<Chat> = new Array()
  participants: Array<Participant> = new Array()

  constructor(
    private signalingService: SignalingService,
    private actRt: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.initiateSignaling()

    this.peer = new SimplePeer({
      initiator: true,
      trickle: false
    })
    this.peer.on('signal', signal => {
      console.log(signal)
    })
  }

  btn() {
    console.log('hi')
  }

  private initiateSignaling() {
    this.roomName = this.actRt.snapshot.queryParams['roomName']
    this.signalingService.connect()
    this.signalingService.listenOnConnect(() => {
      this.signalingService.sendJoinRoomSignal({ socketId: this.signalingService.socketId, roomName: this.roomName, type: Signal.HANDSHAKE, userName: 'Android' })
    })

    this.signalingService.listenOnSignals((signal: SignalMessage) => {
      this.performActionOnSignal(signal)
    })
  }

  performActionOnSignal(signal: SignalMessage) {
    console.log(signal)
    if (signal.type == Signal.ROOM_JOINED) {
      this.actionRoomJoined(signal)
    }
    if (signal.type == Signal.DISCONNECTED) {
      this.populateParticipantsOnDisconnecting(signal)
    }
  }

  actionRoomJoined(signal: SignalMessage) {
    this.populateChats(signal)
    this.populateParticipants(signal)
  }

  populateChats(signal: SignalMessage) {
    this.chats.push({ msg: signal.msg, to: 'me', from: signal.userName })
  }

  populateParticipants(signal: SignalMessage) {
    this.participants = []
    const participantsExcludingMe = signal.participants.filter(socketId => this.signalingService.socketId != socketId)
    participantsExcludingMe.forEach(socketId => this.participants.push({ data: 'https://archive.org/download/Popeye_forPresident/Popeye_forPresident_512kb.mp4', participantSocketId: socketId }))
  }
  populateParticipantsOnDisconnecting(signal: SignalMessage) {
    this.participants = this.participants.filter(participant => participant.participantSocketId != signal.socketId)
    console.log(this.participants)
  }
}
