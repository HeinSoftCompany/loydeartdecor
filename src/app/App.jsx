import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header/Header.jsx';
import Footer from '../components/layout/Footer/Footer.jsx';
import MobileBottomNav from '../components/navigation/MobileBottomNav/MobileBottomNav.jsx';
import MobileCategorySheet from '../components/navigation/MobileCategorySheet/MobileCategorySheet.jsx';
import { navigationGroups } from '../data/navigation.js';
import { useMemo, useState } from 'react';

export default function App() {
  const [activeMobileGroupSlug, setActiveMobileGroupSlug] = useState(null);

  const activeGroup = useMemo(
    () => navigationGroups.find((group) => group.slug === activeMobileGroupSlug) ?? null,
    [activeMobileGroupSlug],
  );

  const openMobileSheet = (groupSlug) => setActiveMobileGroupSlug(groupSlug);
  const closeMobileSheet = () => setActiveMobileGroupSlug(null);

  return (
    <div className="site-shell">
      <Header navData={navigationGroups} />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />

      <MobileBottomNav
        groups={navigationGroups}
        activeGroupSlug={activeMobileGroupSlug}
        onSelectGroup={openMobileSheet}
      />

      <MobileCategorySheet
        open={Boolean(activeGroup)}
        group={activeGroup}
        onClose={closeMobileSheet}
      />
    </div>
  );
}