import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

const menuItemSchema = {
  name:   'menuItem',
  title:  'Menu Item',
  type:   'document' as const,
  fields: [
    { name: 'name',          title: 'Dish Name',      type: 'string'  },
    { name: 'description',   title: 'Description',    type: 'text'    },
    { name: 'price',         title: 'Price (Naira)',  type: 'number'  },
    { name: 'category',      title: 'Category',       type: 'string',
      options: { list: [
        { title: 'Starters', value: 'Starters' },
        { title: 'Mains',    value: 'Mains'    },
        { title: 'Desserts', value: 'Desserts' },
        { title: 'Drinks',   value: 'Drinks'   },
      ]}
    },
    { name: 'menuType',      title: 'Menu Type',      type: 'string',
      options: { list: [
        { title: 'Food',   value: 'food'   },
        { title: 'Drinks', value: 'drinks' },
      ]}
    },
    { name: 'dietaryTags',   title: 'Dietary Tags',   type: 'array',
      of: [{ type: 'string' }],
      options: { list: [
        { title: '🌶️ Spicy',       value: 'spicy'       },
        { title: '🌿 Vegetarian',  value: 'vegetarian'  },
        { title: '🌱 Vegan',       value: 'vegan'       },
        { title: 'GF Gluten-Free', value: 'gluten-free' },
        { title: '☪️ Halal',        value: 'halal'       },
      ]}
    },
    { name: 'isChefSpecial', title: "Chef's Special", type: 'boolean' },
    { name: 'isAvailable',   title: 'Available',      type: 'boolean' },
    { name: 'image',         title: 'Dish Photo',     type: 'image',
      options: { hotspot: true }
    },
  ],
};

const restaurantProfileSchema = {
  name:   'restaurantProfile',
  title:  'Restaurant Profile',
  type:   'document' as const,
  fields: [
    { name: 'restaurantName', title: 'Restaurant Name', type: 'string' },
    { name: 'tagline',        title: 'Tagline',         type: 'string' },
    { name: 'phone',          title: 'Phone',           type: 'string' },
    { name: 'email',          title: 'Email',           type: 'string' },
    { name: 'address',        title: 'Address',         type: 'text'   },
    { name: 'openingHours',   title: 'Opening Hours',   type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'day',      title: 'Day',    type: 'string'  },
          { name: 'hours',    title: 'Hours',  type: 'string'  },
          { name: 'isClosed', title: 'Closed', type: 'boolean' },
        ]
      }]
    },
  ],
};

export default defineConfig({
  name:      'savory-haven',
  title:     'Savory Haven CMS',
  projectId: 'v0wfjkok',
  dataset:   'production',
  plugins:   [structureTool()],
  schema: {
    types: [menuItemSchema, restaurantProfileSchema],
  },
});