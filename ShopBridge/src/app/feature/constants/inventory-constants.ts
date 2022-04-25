
export interface InventoryItem {
  name: string;
  model: string;
  price: number;
  specs: string;
  weight: number;
  country: string;
}

export class AddEditItemRequest {
  name: string;
  model: string;
  specs: string;
  price: number;
  id: string;
}
