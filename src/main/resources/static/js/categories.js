// /**
//  * KFC Admin Dashboard - Categories Page controller (js/categories.js)
//  */
//
// import { KFCStore } from './data.js';
// import { KFCUI } from './ui.js';
// import { initCommon, showToast, showConfirm } from './common.js';
//
// // Local Page State
// const State = {
//   viewMode: 'grid',
//   search: ''
// };
//
// // Render categories view
// function renderPage() {
//   const categories = KFCStore.getCategories();
//   const products = KFCStore.getProducts();
//
//   let filtered = [...categories];
//   if (State.search) {
//     const searchVal = State.search.toLowerCase().trim();
//     filtered = filtered.filter(c =>
//         c.name.toLowerCase().includes(searchVal) ||
//         c.code.toLowerCase().includes(searchVal)
//     );
//   }
//
//   KFCUI.renderCategories(filtered, products, State.viewMode);
//   setupDynamicListeners();
// }
//
// // Setup static triggers on load
// function setupStaticListeners() {
//   // Add Category buttons
//   const addBtn = document.getElementById('btn-add-category');
//   if (addBtn) {
//     addBtn.addEventListener('click', () => {
//       document.getElementById('category-modal-title').textContent = 'Thêm Danh Mục KFC Mới';
//       document.getElementById('form-category').reset();
//       KFCUI.openModal('modal-category');
//     });
//   }
//
//   // Search input
//   const searchInput = document.getElementById('category-search');
//   if (searchInput) {
//     searchInput.addEventListener('input', (e) => {
//       State.search = e.target.value;
//       renderPage();
//     });
//   }
//
//   // View Mode toggles
//   document.querySelectorAll('.btn-view-mode-cat').forEach(btn => {
//     btn.addEventListener('click', () => {
//       document.querySelectorAll('.btn-view-mode-cat').forEach(b => b.classList.remove('active'));
//       btn.classList.add('active');
//       State.viewMode = btn.dataset.mode;
//       renderPage();
//     });
//   });
// }
//
// // Dynamic triggers setup
// function setupDynamicListeners() {
//   // Empty State Add Button
//   const emptyAddBtn = document.getElementById('btn-empty-add-category');
//   if (emptyAddBtn) {
//     emptyAddBtn.addEventListener('click', () => {
//       document.getElementById('category-modal-title').textContent = 'Thêm Danh Mục KFC Mới';
//       document.getElementById('category-id').value = '';
//       document.getElementById('form-category').reset();
//       KFCUI.openModal('modal-category');
//     });
//   }
//
//   // Edit category buttons
//   document.querySelectorAll('.btn-edit-category').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const id = btn.dataset.id;
//       const name = btn.dataset.name;
//
//       // Gán thông tin vào form cập nhật (nếu các trường đó tồn tại trên giao diện backend)
//       const updateIdInput = document.getElementById('category-update-id');
//       const updateNameInput = document.getElementById('category-update-name');
//
//       if (updateIdInput) {
//         updateIdInput.value = id || '';
//       }
//       if (updateNameInput) {
//         updateNameInput.value = name || '';
//       }
//
//       // Cơ chế dự phòng (fallback) sang mock data nếu không dùng Spring Boot backend
//       if (!updateNameInput) {
//         const cat = KFCStore.getCategoryById(id);
//         if (cat) {
//           document.getElementById('category-modal-title').textContent = 'Cập Nhật Danh Mục';
//           document.getElementById('category-id').value = cat.id;
//           document.getElementById('category-code').value = cat.code;
//           document.getElementById('category-name').value = cat.name;
//           document.getElementById('category-desc').value = cat.description;
//           KFCUI.openModal('modal-category');
//           return;
//         }
//       }
//
//       // Mở modal cập nhật danh mục
//       KFCUI.openModal('modal-update-category');
//     });
//   });
//
//   // Delete category buttons
//   document.querySelectorAll('.btn-delete-category').forEach(btn => {
//     btn.addEventListener('click', () => {
//       const id = btn.dataset.id;
//       const cat = KFCStore.getCategoryById(id);
//       if (!cat) return;
//
//       showConfirm(
//           'Xóa Danh Mục',
//           `Bạn có chắc chắn muốn xóa danh mục: "${cat.name}" (${cat.code})? Hành động này không thể hoàn tác.`,
//           () => {
//             try {
//               KFCStore.deleteCategory(id);
//               showToast(`Đã xóa thành công danh mục: ${cat.name}`);
//               renderPage();
//             } catch (err) {
//               showToast(err.message, 'error');
//             }
//           }
//       );
//     });
//   });
// }
//
// // Initialization bootstrap
// document.addEventListener('DOMContentLoaded', () => {
//   KFCStore.init();
//   initCommon(renderPage);
//   setupStaticListeners();
//   renderPage();
// });

/**
 * KFC Admin Dashboard - Categories Page controller (js/categories.js)
 */

import { initCommon } from './common.js';

// Local Page State
const State = {
  search: ''
};

// Modal helper functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

// Setup static triggers on load
function setupStaticListeners() {
  // Add Category button
  const addBtn = document.getElementById('btn-add-category');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const form = document.getElementById('form-category');
      if (form) form.reset();
      openModal('modal-category');
    });
  }

  // Empty State Add Button
  const emptyAddBtn = document.getElementById('btn-empty-add-category');
  if (emptyAddBtn) {
    emptyAddBtn.addEventListener('click', () => {
      const form = document.getElementById('form-category');
      if (form) form.reset();
      openModal('modal-category');
    });
  }

  // Search input filtering (filtering Thymeleaf rendered elements directly)
  const searchInput = document.getElementById('category-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchVal = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.category-card').forEach(card => {
        const nameEl = card.querySelector('.category-card-name');
        const nameText = nameEl ? nameEl.textContent.toLowerCase() : '';
        if (nameText.includes(searchVal)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

// Dynamic triggers setup
function setupDynamicListeners() {
  // Edit category buttons (btn-update-category)
  // Edit category buttons (btn-update-category)
  document.querySelectorAll('.btn-edit-category').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Ngăn chặn hành động mặc định

      const id = btn.getAttribute('data-id') || btn.dataset.id;
      const name = btn.getAttribute('data-name') || btn.dataset.name;
      const image = btn.getAttribute('data-image') || btn.dataset.image;

      const updateIdInput = document.getElementById('category-update-id');
      const updateNameInput = document.getElementById('category-update-name');
      const previewImg = document.getElementById('category-update-image-preview');

      if (updateIdInput) {
        updateIdInput.value = id || '';
      }
      if (updateNameInput) {
        updateNameInput.value = name || '';
      }
      console.log(image);
      // Hiển thị ảnh cũ nếu tồn tại
      if (previewImg) {
        if (image) {
          previewImg.src = '/img/category_img/' + image;
          previewImg.style.display = 'block';
        } else {
          previewImg.src = '';
          previewImg.style.display = 'none';
        }
      }

      openModal('modal-update-category');
    });
  });
}

// Initialization bootstrap
document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  setupStaticListeners();
  setupDynamicListeners();
});
