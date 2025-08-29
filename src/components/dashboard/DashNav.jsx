import React from 'react'
import { NavigationMenu } from '../ui/navigation-menu'
import { useTranslation } from 'react-i18next';
import { getNavConfig } from '@/constants/navConfig';
import NavigationItems from '../nav/NavigationItems';

export default function DashNav({ DashTitle = '' }) {
    const { t } = useTranslation();
    const navConfig = getNavConfig(t);
    return (
        <header className='flex justify-between items-center'>
            <h1 className='large text-primary'>{DashTitle}</h1>
            <NavigationMenu>
                <NavigationItems navConfig={navConfig.clientDashNav} />
            </NavigationMenu>
        </header>
    )
}
