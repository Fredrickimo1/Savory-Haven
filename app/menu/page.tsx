import { sanityClient } from '@/lib/sanity/client';
import { Search, ChefHat } from 'lucide-react';
import MenuClient from './MenuClient';

async function getMenuItems() {
  try {
    return await sanityClient.fetch(
      `*[_type == "menuItem" && isAvailable == true] | order(category asc) {
        _id,
        name,
        description,
        price,
        category,
        menuType,
        dietaryTags,
        isChefSpecial,
        "imageUrl": image.asset->url
      }`,
      {},
      { next: { revalidate: 60 } }
    );
  } catch {
    return [];
  }
}

export default async function MenuPage() {
  const items = await getMenuItems();
  return <MenuClient items={items} />;
}