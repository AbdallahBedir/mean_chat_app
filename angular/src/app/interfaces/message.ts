/**
 * User Interface Describing the chat Object
 */
export interface Message{
    nickname:string,
    roomId:number,
    message:string,
    createdAt?:Date
}