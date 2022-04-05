import { useState, useEffect } from 'react';

export default function useSidebarToggle(){
  const [sidebarShown, setSidebarShown] = useState(false);

	useEffect(() => {
		const body = document.getElementsByTagName('body')[0];
		if (sidebarShown) {
			body.classList.add('mobile-sidebar-toggle');
		} else {
			body.classList.remove('mobile-sidebar-toggle');
		}
	}, [sidebarShown]);

  return {
    sidebarShown,
    setSidebarShown
  }
}