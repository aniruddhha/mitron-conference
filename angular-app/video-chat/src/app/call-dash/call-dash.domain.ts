import SimplePeer from 'simple-peer';
export interface Chat {
    msg: string,
    to: string,
    from: string
}

export interface MitronPeer {
    peerId: string,
    peer: SimplePeer.Instance
}