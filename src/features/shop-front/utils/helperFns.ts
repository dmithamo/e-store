import { ShopItem } from './stateMgmt';

type Categories = { [category: string]: ShopItem[]; uncategorised: ShopItem[] };

/**
 * @description Sort store items into categories
 * @param items
 */
export function sortByCategory(items: ShopItem[]): Categories {
  let categorisedProducts: Categories = { uncategorised: [] };

  const isPresent = (category: string) =>
    categorisedProducts[category]?.length > 0;

  categorisedProducts = items.reduce((acc: Categories, item) => {
    switch (true) {
      case isPresent(item.category.toLowerCase()):
        acc[item.category.toLowerCase()].push(item);
        break;
      case !item.category || item.category === '':
        acc.uncategorised.push({ ...item, category: 'uncategorised' });
        break;
      default:
        acc[item.category.toLowerCase()] = [item];
    }

    return acc;
  }, categorisedProducts);

  return categorisedProducts;
}
