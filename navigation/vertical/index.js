// Assume lStore is defined and contains the necessary logic
const isAuthenticated = () => {
  return lStore.authToken && lStore.isAuthenticated;
};

const routes = [
  {
    title: 'DASHBOARD',
    to: { name: 'dashboard' },
    icon: { icon: 'tabler-smart-home' },
    meta: { requiresAuth: true }
  },
  {
    title: 'CLIENTS',
    to: { name: 'clients' },
    icon: { icon: 'tabler-user-plus' },
    meta: { requiresAuth: true },
    children:[
      {
        title:'View Clients',
        to:{name:'viewClients'},
        icon:{icon:'tabler-chevron-right'}
      },
      {
         title:'Unapproved Clients',
         to:{name:'unApprovedClients'},
         icon:{icon:'tabler-chevron-right'}
      }
    ]
  },
  {
    title: 'CONTACTS',
    to: { name: 'contacts' },
    icon: { icon: 'tabler-user-plus' },
    meta: { requiresAuth: true },
    children:[
      {
        title:'view contacts',
        to:{ name:'viewcontact'},
        icon:{icon:'tabler-chevron-right'}
      },
      {
        title:'view unapproved contacts',
        to:{name:'viewunapprovedcontacts'},
        icon:{icon:'tabler-chevron-right'}
      }
    ]
  },
  {
    title: 'ACCOUNTS',
    to: { name: 'accounts' },
    icon: { icon: 'tabler-users-group' },
    meta: { requiresAuth: true }
  },
  {
    title:'MATERIALS',
    to:{name:'material'},
    icon:{icon:'tabler-rectangular-prism'},
    meta: { requiresAuth: true },
    children:[
      {
        title:'View Materials',
        to:{ name:'viewMaterial'},
        icon:{icon:'tabler-chevron-right'}
      },
      {
        title:'View Materials Rates',
        to:{ name:'ViewMaterialRates'},
        icon:{icon:'tabler-chevron-right'}
      }
    ]
  },
  {
    title:'FLEET',
    to:{name:'fleets'},
    icon:{icon:'tabler-truck'},
    meta: { requiresAuth: true }
  },
  {
    title:'   OUTBOUNDS LOCATIONS',
    to:{name:'OutBoundsLocation'},
    icon:{icon:'tabler-map-pin'},
    meta: { requiresAuth: true }
  },
  {
    title:'EZWEIGH',
    to:{name:'ezWeigh'},
    icon:{icon:'tabler-square-rounded'},
    meta: { requiresAuth: true }
  },
  {
    title:'EMPLOYEES',
    to:{name:'employees'},
    icon:{icon:'tabler-user-plus'},
    meta: { requiresAuth: true }
  },
  {
    title:'ROLES & PERMISSIONS',
    to:{name:'RolesAndPermission'},
    icon:{icon:'tabler-anchor'},
    meta: { requiresAuth: true },
    children:[
      {
        title:'ROLES',
        to:{name:'roles'},
        meta: { requiresAuth: true },
      },
    ]
  },
  {
    title:'REPORTS',
    to:{name:'Reports'},
    icon:{icon:'tabler-file-description'},
    meta: { requiresAuth: true }
  },
  {
       title:'SETTINGS',
      to:{name:'setting'},
      icon:{icon:'tabler-settings'},
       meta: { requiresAuth: true },
    }

];


export default routes;
