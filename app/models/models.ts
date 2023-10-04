export type Wish = {
  id: number;
  name: string;
  description?: string;
  price?: number;
  shopUrl?: string;
  important?: boolean;
};

export class WishModel {
  constructor(
    public name: string,
    public id: number,
    public description: string = "",
    public price?: number,
    public shopUrl: string = "",
    public important: boolean = false
  ) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.price = price;
    this.shopUrl = shopUrl;
    this.important = important;
  }
}

export function toJson(wish: WishModel): string {
  return `{id: ${wish.id}, name: ${wish.name}, description: ${wish.description}, price: ${wish.price}, shopUrl: ${wish.shopUrl}, important: ${wish.important}}`;
}

export function fromJson(json: Map<string, any>) {
  console.log(json.get("name"));
  return JSON.parse(JSON.stringify(json));
}
