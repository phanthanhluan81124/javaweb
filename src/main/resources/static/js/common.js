/**
 * KFC Admin Dashboard - Common Multi-page Scripts (js/common.js)
 * Manages shared components like mobile sidebar toggles, toasts, confirmations, and backup tools.
 */

import { KFCStore } from './data.js';

// Setup Toast Notification
export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconSVG = '';
  switch (type) {
    case 'success':
      iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
      break;
    case 'error':
      iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
      break;
    case 'warning':
      iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
      break;
    case 'info':
      iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 20px; height: 20px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
      break;
  }

  toast.innerHTML = `
    <div class="toast-icon">${iconSVG}</div>
    <div class="toast-message">${message}</div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: currentColor;"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Setup Custom Confirm Modal
let currentConfirmCallback = null;

export function showConfirm(title, message, onConfirm) {
  const modal = document.getElementById('modal-confirm');
  const titleEl = document.getElementById('confirm-title');
  const messageEl = document.getElementById('confirm-message');
  
  if (!modal || !titleEl || !messageEl) return;

  titleEl.textContent = title;
  messageEl.textContent = message;
  currentConfirmCallback = onConfirm;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Initialize shared sidebar structures, mobile buttons, and import/exports
export function initCommon(onDataReloadCallback) {
  // Mobile drawer controls
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const overlay = document.getElementById('sidebar-overlay');
  const container = document.querySelector('.app-container');

  if (menuBtn && container) {
    menuBtn.addEventListener('click', () => {
      container.classList.add('sidebar-open');
    });
  }

  if (overlay && container) {
    overlay.addEventListener('click', () => {
      container.classList.remove('sidebar-open');
    });
  }

  // Bind Confirm Dialog 'Yes' button
  const confirmYesBtn = document.getElementById('confirm-yes');
  if (confirmYesBtn) {
    confirmYesBtn.addEventListener('click', () => {
      if (currentConfirmCallback) {
        currentConfirmCallback();
        currentConfirmCallback = null;
      }
      const modal = document.getElementById('modal-confirm');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Bind Confirm dialog closers
  document.querySelectorAll('.modal-close, .btn-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (modal.id === 'modal-confirm') {
          currentConfirmCallback = null;
        }
      }
    });
  });

  // Export Data Action
  const exportBtn = document.getElementById('btn-export-data');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      try {
        const dataStr = KFCStore.exportData();
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const fileName = `kfc_menu_backup_${new Date().toISOString().split('T')[0]}.json`;
        
        const link = document.createElement('a');
        link.setAttribute('href', dataUri);
        link.setAttribute('download', fileName);
        link.click();
        
        showToast('Sao lưu và tải về dữ liệu thành công.');
      } catch (err) {
        showToast('Không thể xuất dữ liệu: ' + err.message, 'error');
      }
    });
  }

  // Import Data Action
  const importBtn = document.getElementById('btn-import-data');
  const fileInput = document.getElementById('import-file-input');

  if (importBtn && fileInput) {
    importBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const contents = event.target.result;
          KFCStore.importData(contents);
          showToast('Nhập và khôi phục dữ liệu KFC thành công!');
          if (onDataReloadCallback) {
            onDataReloadCallback();
          }
        } catch (err) {
          showToast(err.message, 'error');
        }
      };
      reader.readAsText(file);
      fileInput.value = '';
    });
  }
}
