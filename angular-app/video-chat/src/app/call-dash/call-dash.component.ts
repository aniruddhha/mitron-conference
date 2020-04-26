import { SignalingService, SignalMessage } from './../shared-services/signaling.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SimplePeer from 'simple-peer';

@Component({
  selector: 'app-call-dash',
  templateUrl: './call-dash.component.html',
  styleUrls: ['./call-dash.component.css']
})
export class CallDashComponent implements OnInit {

  roomName: string

  constructor(
    private signalingService: SignalingService,
    private actRt: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.signalingService.connect()

    this.signalingService.onConnect(() => {

      console.log(`My Socket Id ${this.signalingService.socketId}`)
      this.signalingService.requestForJoiningRoom({ roomName: this.roomName })

      this.signalingService.onRoomParticipants(participants => {
        console.log(participants)
        this.initilizePeersWhenIJoinRoom(participants)
      })

      this.signalingService.onOffer(msg => {
        console.log(msg)
        this.initilizePeersWhenOthersJoin(msg)
      })

      this.signalingService.onAnswer(msg => {
        console.log(msg)
      })
    })
  }

  initilizePeersWhenIJoinRoom(participants: Array<string>) {
    const participantsExcludingMe = participants.filter(id => id != this.signalingService.socketId)
    participantsExcludingMe.forEach(participant => {
      const peer: SimplePeer.Instance = new SimplePeer({
        initiator: true,
        trickle: false
      })

      peer.on('signal', signal => {
        this.signalingService.sendOfferSignal({ signalData: signal, callerId: this.signalingService.socketId, calleeId: participant })
      })
    })
  }

  initilizePeersWhenOthersJoin(msg: SignalMessage) {
    const peer: SimplePeer.Instance = new SimplePeer({
      initiator: false,
      trickle: false
    })

    peer.on('signal', signal => {
      this.signalingService.sendAnswerSignal({ signalData: signal, callerId: msg.callerId })
    })

    peer.signal(msg.signalData)
  }
}
