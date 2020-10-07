import api from '../../../http-client';
import { sortByCategory } from './helperFns';
import { ShopItem } from './stateMgmt';

export async function fetchItems(): Promise<any> {
  try {
    const res = await api.get('/items');
    if (res && (res as any).status === 200) {
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

export async function fetchByCategory(category: string): Promise<any> {
  try {
    const res = await api.get(`/items?category=${category}`);
    if (res && (res as any).status === 200) {
      return [true, res.data];
    }

    return [false, res ? 'Server error' : 'Something went wrong'];
  } catch (error) {
    return [false, error];
  }
}

export async function fetchSingleItem(itemID: string): Promise<any> {
  try {
    const res = await api.get(`/items?itemID=${itemID}`);
    if (res && (res as any).status === 200) {
      return [true, res.data];
    }

    return [false, res ? 'Server error' : 'Something went wrong'];
  } catch (error) {
    return [false, error];
  }
}
