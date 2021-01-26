import { NavigationItem, Navigation } from '../theme/layout/admin/navigation/navigation';


export const MENUS = [
    {
        id: 'other',
        title: 'Admin',
        type: 'group',
        icon: 'feather icon-align-left',
        children: [
            {
                id: 'sample-page',
                title: 'Sample Page',
                type: 'item',
                url: '/sample-page',
                classes: 'nav-item',
                icon: 'feather icon-sidebar'
            },
            {
                id: 'menu-level',
                title: 'Menu Levels',
                type: 'collapse',
                icon: 'feather icon-menu',
                children: [
                    {
                        id: 'menu-level-2.1',
                        title: 'Menu Level 2.1',
                        type: 'item',
                        url: 'javascript:',
                        external: true
                    },
                    {
                        id: 'menu-level-2.2',
                        title: 'Menu Level 2.2',
                        type: 'collapse',
                        children: [
                            {
                                id: 'menu-level-2.2.1',
                                title: 'Menu Level 2.2.1',
                                type: 'item',
                                url: 'javascript:',
                                external: true
                            },
                            {
                                id: 'menu-level-2.2.2',
                                title: 'Menu Level 2.2.2',
                                type: 'item',
                                url: 'javascript:',
                                external: true
                            }
                        ]
                    }
                ]
            }
        ]
    }
];