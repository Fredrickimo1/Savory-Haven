export type DietaryTag =
  | 'vegetarian' | 'vegan' | 'gluten-free'
  | 'spicy' | 'nuts' | 'dairy-free' | 'halal';

export type MenuType = 'food' | 'drinks';

export interface MenuCategory {
  _id:         string;
  title:       string;
  slug:        string;
  description: string;
  menuType:    MenuType;
  order:       number;
}

export interface MenuItem {
  _id:           string;
  name:          string;
  slug:          string;
  description:   string;
  price:         number;
  category:      MenuCategory;
  dietaryTags:   DietaryTag[];
  isAvailable:   boolean;
  isFeatured:    boolean;
  isChefSpecial: boolean;
}

export interface ReservationInput {
  fullName:     string;
  email:        string;
  phone:        string;
  date:         string;
  time:         string;
  partySize:    number;
  specialReqs?: string;
}

export type ContactSubject =
  | 'general_enquiry' | 'private_event'
  | 'feedback' | 'complaint' | 'other';

export interface ContactInput {
  fullName: string;
  email:    string;
  subject:  ContactSubject;
  message:  string;
}