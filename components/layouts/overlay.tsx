'use client';
import { IRootState } from '@/store';
import { toggleSidebar } from '@/store/theme-config-slice';
import { useDispatch, useSelector } from 'react-redux';

const Overlay = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfigReducer);
    const dispatch = useDispatch();
    return (
        <>
            {/* sidebar menu overlay */}
            <div className={`${(!themeConfig.sidebar && 'hidden') || ''} fixed inset-0 z-50 bg-[black]/60 lg:hidden`} onClick={() => dispatch(toggleSidebar())}></div>
        </>
    );
};

export default Overlay;
