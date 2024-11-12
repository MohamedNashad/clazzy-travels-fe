'use client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/theme-config-slice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '@/store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMinus from '@/components/icon/icon-minus';
import IconMenuChat from '@/components/icon/menu/icon-menu-chat';
import IconMenuMailbox from '@/components/icon/menu/icon-menu-mailbox';
import IconMenuTodo from '@/components/icon/menu/icon-menu-todo';
import IconMenuNotes from '@/components/icon/menu/icon-menu-notes';
import IconMenuScrumboard from '@/components/icon/menu/icon-menu-scrumboard';
import IconMenuContacts from '@/components/icon/menu/icon-menu-contacts';
import IconMenuInvoice from '@/components/icon/menu/icon-menu-invoice';
import IconMenuCalendar from '@/components/icon/menu/icon-menu-calendar';
import IconMenuComponents from '@/components/icon/menu/icon-menu-components';
import IconMenuElements from '@/components/icon/menu/icon-menu-elements';
import IconMenuCharts from '@/components/icon/menu/icon-menu-charts';
import IconMenuWidgets from '@/components/icon/menu/icon-menu-widgets';
import IconMenuFontIcons from '@/components/icon/menu/icon-menu-font-icons';
import IconMenuDragAndDrop from '@/components/icon/menu/icon-menu-drag-and-drop';
import IconMenuTables from '@/components/icon/menu/icon-menu-tables';
import IconMenuDatatables from '@/components/icon/menu/icon-menu-datatables';
import IconMenuForms from '@/components/icon/menu/icon-menu-forms';
import IconMenuUsers from '@/components/icon/menu/icon-menu-users';
import IconMenuPages from '@/components/icon/menu/icon-menu-pages';
import IconMenuAuthentication from '@/components/icon/menu/icon-menu-authentication';
import IconMenuDocumentation from '@/components/icon/menu/icon-menu-documentation';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import { FaMale, FaFemale } from 'react-icons/fa';
import { AdminRoutes } from '@/constants/routes';
import { Box } from 'lucide-react';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { t } = getTranslation();
    const pathname = usePathname();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfigReducer);
    const semidark = useSelector((state: IRootState) => state.themeConfigReducer.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                        <Link href="/home" className="main-logo flex shrink-0 items-center">
                            <img className="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="logo" />
                            <span className="align-middle text-2xl font-semibold dark:text-white-light lg:inline ltr:ml-1.5 rtl:mr-1.5">CLAZZY TR</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/">{t('sales')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/analytics">{t('analytics')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/finance">{t('finance')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/crypto">{t('crypto')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('Enquiries')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'men' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('enquiries')}>
                                            <div className="flex items-center">
                                                <Box className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Manage')}</span>
                                            </div>

                                            <div className={currentMenu !== 'men' ? '-rotate-90 rtl:rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'enquiries' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link href={AdminRoutes?.ENQUIRIES_URL}>{t('Enquiries')}</Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    {/* <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'women' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('women')}>
                                            <div className="flex items-center">
                                                <FaFemale className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Women')}</span>
                                            </div>

                                            <div className={currentMenu !== 'women' ? '-rotate-90 rtl:rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>

                                        <AnimateHeight duration={300} height={currentMenu === 'women' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <Link href="/apps/invoice/list">{t('Gown')}</Link>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li> */}
                                </ul>
                            </li>

                            <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('manage')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <Link href="/permissions" className="group">
                                            <div className="flex items-center">
                                                <IconMenuChat className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Permissions')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/roles" className="group">
                                            <div className="flex items-center">
                                                <IconMenuMailbox className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Roles')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/users" className="group">
                                            <div className="flex items-center">
                                                <IconMenuTodo className="shrink-0 group-hover:!text-primary" />
                                                <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Users')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            {/* <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                                <IconMinus className="hidden h-5 w-4 flex-none" />
                                <span>{t('reports')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'component' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('component')}>
                                    <div className="flex items-center">
                                        <IconMenuComponents className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('components')}</span>
                                    </div>

                                    <div className={currentMenu !== 'component' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'component' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/components/tabs">{t('tabs')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/accordions">{t('accordions')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/modals">{t('modals')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/cards">{t('cards')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/carousel">{t('carousel')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/countdown">{t('countdown')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/counter">{t('counter')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/sweetalert">{t('sweet_alerts')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/timeline">{t('timeline')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/notifications">{t('notifications')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/media-object">{t('media_object')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/list-group">{t('list_group')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/pricing-table">{t('pricing_tables')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/components/lightbox">{t('lightbox')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'element' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('element')}>
                                    <div className="flex items-center">
                                        <IconMenuElements className="shrink-0 group-hover:!text-primary" />
                                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('elements')}</span>
                                    </div>

                                    <div className={currentMenu !== 'element' ? '-rotate-90 rtl:rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'element' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <Link href="/elements/alerts">{t('alerts')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/avatar">{t('avatar')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/badges">{t('badges')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/breadcrumbs">{t('breadcrumbs')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/buttons">{t('buttons')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/buttons-group">{t('button_groups')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/color-library">{t('color_library')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/dropdown">{t('dropdown')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/infobox">{t('infobox')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/jumbotron">{t('jumbotron')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/loader">{t('loader')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/pagination">{t('pagination')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/popovers">{t('popovers')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/progress-bar">{t('progress_bar')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/search">{t('search')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/tooltips">{t('tooltips')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/treeview">{t('treeview')}</Link>
                                        </li>
                                        <li>
                                            <Link href="/elements/typography">{t('typography')}</Link>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
