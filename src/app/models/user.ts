export class User{
  constructor(
    public _id: string,
    public nombre: string,
    public email:string,
    public role: string,
    public telefono: string,
    public movil: string,
    public password:string,
    public password_confirmation :string,

  ){}
}
