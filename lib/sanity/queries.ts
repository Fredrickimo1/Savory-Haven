import { sanityClient } from './client';

export async function getMenuItems() {
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
      { next: { revalidate: 3600 } }
    );
  } catch {
    return [];
  }
}

export async function getRestaurantProfile() {
  try {
    return await sanityClient.fetch(
      `*[_type == "restaurantProfile"][0]`,
      {},
      { next: { revalidate: 3600 } }
    );
  } catch {
    return null;
  }
}

export async function getFeaturedDishes() {
  try {
    return await sanityClient.fetch(
      `*[_type == "menuItem" && isChefSpecial == true && isAvailable == true][0...3] {
        _id,
        name,
        description,
        price,
        dietaryTags,
        "imageUrl": image.asset->url
      }`,
      {},
      { next: { revalidate: 3600 } }
    );
  } catch {
    return [];
  }
}