import SimplePeer from 'simple-peer';
export interface Chat {
    msg: string,
    to: string,
    from: string
}

export interface Participant {
    participantSocketId: string,
    peer: SimplePeer.Instance
}