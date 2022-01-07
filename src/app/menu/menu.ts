import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'home',
    role: ['Admin'],
    url: '/dashboard'
  },
  {
    id: 'products',
    title: 'Products',
    type: 'item',
    icon: 'package',
    role: ['Admin'],
    url: '/products'
  },
  {
    id: 'shop',
    title: 'Shop',
    translate: 'MENU.APPS.ECOMMERCE.SHOP',
    type: 'item',
    icon: 'circle',
    role: ['User'],
    url: '/shop'
  },
  {
    id: 'details',
    title: 'Details',
    translate: 'MENU.APPS.ECOMMERCE.DETAIL',
    type: 'item',
    icon: 'circle',
    url: '/details'
  },
  {
    id: 'wishList',
    title: 'Wish List',
    translate: 'MENU.APPS.ECOMMERCE.WISHLIST',
    type: 'item',
    icon: 'circle',
    role: ['User'],
    url: '/wishlist'
  },
  {
    id: 'checkout',
    title: 'Checkout',
    translate: 'MENU.APPS.ECOMMERCE.CHECKOUT',
    type: 'item',
    icon: 'circle',
    role: ['User'],
    url: '/checkout'
  }
]
