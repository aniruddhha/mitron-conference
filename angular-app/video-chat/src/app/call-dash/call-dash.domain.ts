export interface Chat {
    msg: string,
    to: string,
    from: string
}

export interface Participant {
    data : any,
    participantSocketId : string
}