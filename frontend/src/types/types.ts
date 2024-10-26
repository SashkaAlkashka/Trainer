export interface IUserData {
    //Я тут добавила поля, а то после пула ошибки выдавало, что нет name/class!
    login: string, 
    password: string, 
    course?: number, 
    group?: string,
    name?: string,
    class_: string,
    token?: string
}