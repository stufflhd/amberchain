import React from 'react'
import { NavigationMenu } from '../ui/navigation-menu'
import { useTranslation } from 'react-i18next';
import { getNavConfig } from '@/constants/navConfig';
import NavigationItems from '../nav/NavigationItems';

export default function DashNav({ DashTitle = '' }) {
    const { t } = useTranslation();
    const navConfig = getNavConfig(t);
    return (
        <header className='flex flex-col lg:flex-row justify-between lg:items-center'>
            <h1 className='large text-primary'>{DashTitle}</h1>
            <NavigationMenu className={'-ml-2 lg:ml-0 hidden lg:flex'}>
                <NavigationItems navConfig={navConfig.clientDashNav} />
            </NavigationMenu>
        </header>
    )
}
