/* eslint-disable */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'inici',
        title: 'Inici',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/inici'
    },
    {
        id: 'indrets',
        title: 'Indrets',
        type: 'basic',
        icon: 'heroicons_outline:building-office',
        link: '/indrets'
    },
    {
        id: 'usuaris',
        title: 'Usuaris',
        type: 'basic',
        icon: 'heroicons_outline:user-circle',
        link: '/users'
    },
    {
        id: 'actuacions',
        title: 'Actuacions',
        type: 'basic',
        icon: 'heroicons_outline:chart-bar-square',
        link: '/actions'
    },
    {
        id: 'mostres',
        title: 'Mostres',
        type: 'basic',
        icon: 'heroicons_outline:eye-dropper',
        link: '/dummy'
    },
    {
        id: 'incidències',
        title: 'Incidències',
        type: 'basic',
        icon: 'heroicons_outline:exclamation-triangle',
        link: '/dummy'
    },
    {
        id: 'configuracio',
        title: 'Configuració',
        type: 'collapsable',
        icon: 'heroicons_outline:cog-6-tooth',
        children: [
            {
                id: 'general_master_tables',
                title: 'Taules mestres generals',
                type: 'basic',
                link: '/general_master_tables',
                exactMatch: true
            }
        ]

    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'inici',
        title: 'Inici',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/inici'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'inici',
        title: 'Inici',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/inici'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'inici',
        title: 'Inici',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/inici'
    }
];
