/**
 * KFC Admin Dashboard - Dashboard Page controller (js/dashboard.js)
 */

import { KFCStore } from './data.js';
import { KFCUI } from './ui.js';
import { initCommon, showToast, showConfirm } from './common.js';

// Render function
function renderDashboardPage() {
  const analytics = KFCStore.getAnalytics();
  const logs = KFCStore.getLogs();
  const products = KFCStore.getProducts();

  KFCUI.renderDashboard(analytics, logs, products);
  setupLocalListeners();
}

function setupLocalListeners() {
  // Clear Logs
  const clearLogsBtn = document.getElementById('btn-quick-log-clear');
  if (clearLogsBtn) {
    clearLogsBtn.addEventListener('click', () => {
      showConfirm('Xóa Lịch Sử', 'Bạn có chắc chắn muốn xóa toàn bộ lịch sử hoạt động không?', () => {
        KFCStore.clearLogs();
        showToast('Đã xóa lịch sử thành công.');
        renderDashboardPage();
      });
    });
  }

  // Quick Restock Warnings
  document.querySelectorAll('.btn-quick-restock').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const prod = KFCStore.getProductById(id);
      if (!prod) return;

      const amt = prompt(`Nhập số lượng bổ sung cho sản phẩm: "${prod.name}"`, "50");
      if (amt === null) return;

      const num = Number(amt);
      if (isNaN(num) || num <= 0) {
        showToast('Số lượng nhập không hợp lệ.', 'error');
        return;
      }

      try {
        KFCStore.updateProduct(id, {
          ...prod,
          stock: prod.stock + num,
          status: 'available'
        });
        showToast(`Đã nhập thêm ${num} cái vào kho cho: ${prod.name}`);
        renderDashboardPage();
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  });
}

// Initial draw
document.addEventListener('DOMContentLoaded', () => {
  KFCStore.init();
  initCommon(renderDashboardPage);
  renderDashboardPage();
});
