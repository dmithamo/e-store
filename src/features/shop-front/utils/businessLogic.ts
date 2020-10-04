import api from '../../../http-client';
import { sortByCategory } from './helperFns';
import { ShopItem } from './stateMgmt';

export async function fetchItems(
  category: string | undefined = undefined,
): Promise<any> {
  try {
    const res = await api.get(`/items?category=${category || 'all'}`);
    if (res && res.status === 200) {
      return [
        true,
        sortByCategory(
          res.data.map(
            (item: any): ShopItem => ({
              id: item.id,
              name: item.name,
              rate: item.rate,
              category: item.category,
              quantityAvailable: item.quantityAvailable,
              dateAvailable: item.dateAvailable,
              img: item.img,
            }),
          ),
        ),
      ];
    }

    return [false, res ? 'Server error' : 'Something went wrong'];
  } catch (error) {
    return [false, error];
  }
}

export function placeOrder() {}
