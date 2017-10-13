/**
 * User Interface Describing the Message Object
 */
export interface Message{
    nickname:string,
    roomId:number,
    message:string,
    createdAt?:Date
}