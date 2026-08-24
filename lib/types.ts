export type CheckInType='quick'|'weekly'|'deep';
export type QuestionType='rating'|'text'|'choice';
export interface Partner { id:'a'|'b'; displayName:string }
export interface Question { id:string; category:string; text:string; type:QuestionType; options?:string[]; required?:boolean; checkInTypes:CheckInType[] }
export interface Answer { questionId:string; partnerId:'a'|'b'; value:string|number }
export interface Intention { shared:string; actionA:string; actionB:string; nextDate?:string }
export interface CheckInSession { id:string; type:CheckInType; createdAt:string; completedAt?:string; partners:Partner[]; questionIds:string[]; answers:Answer[]; sharedIntention?:Intention }
export interface AppSettings { checkInFrequency:'weekly'|'biweekly'|'monthly'|'none'; privateMode:boolean; partnerNames:[string,string]; lastCheckInDate?:string }
export interface AppData { settings:AppSettings; sessions:CheckInSession[] }
