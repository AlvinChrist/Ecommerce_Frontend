import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   type: 'item',
  //   icon: 'home',
  //   role: ['Admin'],
  //   url: '/dashboard'
  // }
  {
    id: 'shop',
    title: 'Shop',
    translate: 'MENU.APPS.ECOMMERCE.SHOP',
    type: 'item',
    icon: 'shopping-bag',
    role: ['User', 'Admin','All'],
    url: '/shop'
  },
  // {
  //   id: 'app1',
  //   title: 'app1',
  //   type: 'item',
  //   icon: 'chrome',
  //   role: ['All'],
  //   url: '/app1'
  // },
  {
    id: 'app1',
    title: 'app1',
    type: 'collapsible',
    icon: 'home',
    role: ['All'],
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        icon: 'home',
        role: ['All'],
        url: '/app1/home'
      },
      {
        id: 'fitur1',
        title: 'fitur1',
        type: 'item',
        icon: 'file',
        role: ['All'],
        url: '/app1/fitur1'
      }
    ]
  },
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   translate: 'MENU.DASHBOARD.COLLAPSIBLE',
  //   type: 'collapsible',
  //   // role: ['Admin'], //? To hide collapsible based on user role
  //   icon: 'home',
  //   badge: {
  //     title: '2',
  //     translate: 'MENU.DASHBOARD.BADGE',
  //     classes: 'badge-light-warning badge-pill'
  //   },
  //   children: [
  //     {
  //       id: 'analytics',
  //       title: 'Analytics',
  //       translate: 'MENU.DASHBOARD.ANALYTICS',
  //       type: 'item',
  //       role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
  //       icon: 'circle',
  //       url: 'dashboard/analytics'
  //     },
  //     {
  //       // If role is not assigned will be display to all
  //       id: 'ecommerce',
  //       title: 'eCommerce',
  //       translate: 'MENU.DASHBOARD.ECOMMERCE',
  //       type: 'item',
  //       icon: 'circle',
  //       url: 'dashboard/ecommerce'
  //     }
  //   ]
  // },
  {
    id: 'app2',
    title: 'app2',
    type: 'collapsible',
    icon: 'home',
    role: ['All'],
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        icon: 'home',
        role: ['All'],
        url: '/app2/home'
      },
      {
        id: 'sample',
        title: 'Sample',
        type: 'item',
        icon: 'file',
        role: ['All'],
        url: '/app2/sample'
      }
    ]
  },
  {
    id: 'products',
    title: 'Products',
    type: 'item',
    exactMatch: true,
    icon: 'package',
    role: ['Admin'],
    url: '/products'
  },
  {
    id: 'details',
    title: 'Details',
    translate: 'MENU.APPS.ECOMMERCE.DETAIL',
    type: 'item',
    role: [''],
    icon: 'circle',
    url: '/details'
  },
  {
    id: 'wishList',
    title: 'Wish List',
    translate: 'MENU.APPS.ECOMMERCE.WISHLIST',
    type: 'item',
    icon: 'list',
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
