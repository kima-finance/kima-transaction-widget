import { useEffect } from 'react';

function useHideWuiListItem(isModalOpen:boolean) {
  useEffect(() => {
    const modalSelector = 'w3m-modal';
    let observer: MutationObserver;

    const hideFirstWuiListItem = (parent:any) => {
      const stack = [parent];

      while (stack.length > 0) {
        const current = stack.shift();

        if (!current) continue;

        // Check if the current element is the target
        if (current.tagName === 'WUI-LIST-ITEM') {
          current.style.display = 'none';
          break;
        }

        // If the current element has a shadowRoot, traverse into it
        if (current.shadowRoot) {
          stack.push(current.shadowRoot);
        }

        // Otherwise, traverse its children
        stack.push(...Array.from(current.children));
      }
    };

    const observeModal = () => {
      const modal = document.querySelector(modalSelector);

      if (modal?.shadowRoot) {
        const shadowRoot = modal.shadowRoot;

        // Select the container where `wui-list-item` might be
        const wuiFlex = shadowRoot.querySelector('wui-flex');
        if (wuiFlex) {
          hideFirstWuiListItem(wuiFlex);
        }
      }
    };

    const setupObserver = () => {
      observer = new MutationObserver(() => {
        const modal = document.querySelector(modalSelector);
        if (modal) {
          observeModal();
        }
      });

      // Observe the body for modal re-rendering
      observer.observe(document.body, { childList: true, subtree: true });
    };

    if (isModalOpen) {
      // Start observing and check if the modal is already loaded
      setupObserver();
      observeModal();
    } else {
      // Disconnect observer when the modal is closed
      if (observer) {
        observer.disconnect();
      }
    }

    // Clean up when the component unmounts
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isModalOpen]);
}

export default useHideWuiListItem;
