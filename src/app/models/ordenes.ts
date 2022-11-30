export class Ordenes{
  constructor(
    public _id: string,
    public table_id: number,
    public customer_id :number,
    public product_id: number,
    public menu_id: number,
    public quantity: string,
  ){}
}
