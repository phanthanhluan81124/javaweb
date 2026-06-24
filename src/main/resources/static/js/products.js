/**
 * KFC Admin Dashboard - Products Page controller (js/products.js)
 */

import { KFCStore } from './data.js';
import { KFCUI } from './ui.js';
import { initCommon, showToast, showConfirm } from './common.js';

// Local Page State
const State = {
  viewMode: 'table',
  search: '',
  category: '',
  status: '',
  sort: 'name-asc'
};

// Render Products
// function renderPage() {
//   const products = KFCStore.getProducts();
//   const categories = KFCStore.getCategories();
//
//   // Filter products
//   let filtered = [...products];
//
//   if (State.search) {
//     const searchVal = State.search.toLowerCase().trim();
//     filtered = filtered.filter(p =>
//       p.name.toLowerCase().includes(searchVal) ||
//       p.code.toLowerCase().includes(searchVal)
//     );
//   }
//
//   if (State.category) {
//     filtered = filtered.filter(p => p.categoryId === State.category);
//   }
//
//   if (State.status) {
//     filtered = filtered.filter(p => p.status === State.status);
//   }
//
//   // Sort products
//   filtered.sort((a, b) => {
//     switch (State.sort) {
//       case 'name-asc':
//         return a.name.localeCompare(b.name);
//       case 'name-desc':
//         return b.name.localeCompare(a.name);
//       case 'price-asc':
//         return a.price - b.price;
//       case 'price-desc':
//         return b.price - a.price;
//       case 'stock-asc':
//         return a.stock - b.stock;
//       case 'stock-desc':
//         return b.stock - a.stock;
//       default:
//         return 0;
//     }
//   });
//
//   KFCUI.renderProducts(filtered, categories, State.viewMode);
//   setupDynamicListeners();
// }

// // Populate Category dropdowns in filters and modals
// function populateCategorySelectors() {
//   const categories = KFCStore.getCategories();
//
//   const filterCat = document.getElementById('product-filter-category');
//   const modalCat = document.getElementById('product-category');
//
//   if (filterCat) {
//     filterCat.innerHTML = '<option value="">Tất cả danh mục</option>' + categories.map(c => `
//       <option value="${c.id}">${c.name}</option>
//     `).join('');
//     filterCat.value = State.category;
//   }
//
//   if (modalCat) {
//     modalCat.innerHTML = '<option value="">-- Chọn danh mục --</option>' + categories.map(c => `
//       <option value="${c.id}">${c.name}</option>
//     `).join('');
//   }
// }

// Global setups
function setupStaticListeners() {
  // Add product buttons
  const addBtn = document.getElementById('btn-add-product');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      document.getElementById('product-modal-title').textContent = 'Thêm Sản Phẩm KFC Mới';
      document.getElementById('product-id').value = '';
      document.getElementById('form-product').reset();
      updateImagePreview('');
      KFCUI.openModal('modal-product');
    });
  }

  // Search input
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      State.search = e.target.value;
      renderPage();
    });
  }

  // Filters
  const filterCat = document.getElementById('product-filter-category');
  if (filterCat) {
    filterCat.addEventListener('change', (e) => {
      State.category = e.target.value;
      renderPage();
    });
  }

  const filterStat = document.getElementById('product-filter-status');
  if (filterStat) {
    filterStat.addEventListener('change', (e) => {
      State.status = e.target.value;
      renderPage();
    });
  }

  const sortSelect = document.getElementById('product-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      State.sort = e.target.value;
      renderPage();
    });
  }

  // View Mode toggles
  document.querySelectorAll('.btn-view-mode').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-view-mode').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      State.viewMode = btn.dataset.mode;
      renderPage();
    });
  });

  // Modal image preview typing listener
  const imgInput = document.getElementById('product-image');
  if (imgInput) {
    imgInput.addEventListener('input', (e) => {
      updateImagePreview(e.target.value);
    });
  }

  // Form submit handler
//   const form = document.getElementById('form-product');
//   if (form) {
//     form.addEventListener('submit', (e) => {
//       e.preventDefault();
//
//       const id = document.getElementById('product-id').value;
//       const data = {
//         code: document.getElementById('product-code').value,
//         name: document.getElementById('product-name').value,
//         categoryId: document.getElementById('product-category').value,
//         price: document.getElementById('product-price').value,
//         stock: document.getElementById('product-stock').value,
//         status: document.getElementById('product-status').value,
//         spicyLevel: document.getElementById('product-spicy').value,
//         calories: document.getElementById('product-calories').value,
//         image: document.getElementById('product-image').value,
//         description: document.getElementById('product-desc').value
//       };
//
//       try {
//         if (id) {
//           KFCStore.updateProduct(id, data);
//           showToast('Cập nhật món ăn thành công.');
//         } else {
//           KFCStore.addProduct(data);
//           showToast('Đã thêm sản phẩm vào thực đơn.');
//         }
//         KFCUI.closeModal('modal-product');
//         renderPage();
//       } catch (err) {
//         showToast(err.message, 'error');
//       }
//     });
//   }
}

// Dynamic elements event listeners (edit/delete/toggle)
// function setupDynamicListeners() {
//   // Empty State Add Product button
//   const emptyAddBtn = document.getElementById('btn-empty-add-product');
//   if (emptyAddBtn) {
//     emptyAddBtn.addEventListener('click', () => {
//       document.getElementById('product-modal-title').textContent = 'Thêm Sản Phẩm KFC Mới';
//       document.getElementById('product-id').value = '';
//       document.getElementById('form-product').reset();
//       document.getElementById("form-product").action = "/admin/add-product";
//       updateImagePreview('');
//       KFCUI.openModal('modal-product');
//     });
//   }
//
//   // Edit triggers
//
//
  // Delete triggers
  document.querySelectorAll('.btn-delete-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;

      showConfirm(
          'Xóa Sản Phẩm',
          `Bạn có chắc muốn xóa món ăn: "${btn.dataset.ten}" (${btn.dataset.ma}) ra khỏi thực đơn?`,
          () => {
            fetch(`/admin/deleteProduct/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            })
                .then(response => {
                  if (response.ok) {
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                    showToast(`Đã xóa thành công`);
                    // renderPage();
                  } else {
                    showToast('Xóa thất bại! Vui lòng thử lại.', 'error');
                  }
                })
                .catch(error => {
                  console.error('Lỗi kết nối:', error);
                  showToast('Lỗi kết nối đến máy chủ!', 'error');
                });
          }
      );
    });
  });
//
//   // Click badge stock toggle
//   document.querySelectorAll('[data-toggle-stock]').forEach(badge => {
//     badge.addEventListener('click', () => {
//       const id = badge.dataset.toggleStock;
//       try {
//         const updated = KFCStore.toggleProductStatus(id);
//         showToast(`Đã đổi trạng thái ${updated.name} sang ${updated.status === 'available' ? 'Còn hàng' : 'Hết hàng'}`);
//         renderPage();
//       } catch (err) {
//         showToast(err.message, 'error');
//       }
//     });
//   });
// }

// Live Image Preview inside modal form
function updateImagePreview(url) {
  const preview = document.getElementById('product-img-preview');
  const placeholder = document.getElementById('product-img-placeholder');
  
  if (!preview || !placeholder) return;

  if (url && url.trim().length > 0) {
    preview.src = url;
    preview.classList.remove('d-none');
    placeholder.classList.add('d-none');
  } else {
    preview.src = '';
    preview.classList.add('d-none');
    placeholder.classList.remove('d-none');
  }
}

// Reload callback on Data Import from sidebar
function handleImportReload() {
  populateCategorySelectors();
  renderPage();
}

document.addEventListener('DOMContentLoaded', () => {
  KFCStore.init();
  initCommon(handleImportReload);
  setupStaticListeners();
  document.querySelectorAll('.btn-edit-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const form = document.getElementById("form-product");
      if (form) {
        form.setAttribute("action", "/admin/update-product");
      }
      console.log(btn.dataset.categories)
      document.getElementById('product-modal-title').textContent = 'Cập Nhật Món Ăn';
      document.getElementById('product-id').value = btn.dataset.id;
      document.getElementById('product-code').value = btn.dataset.ma;
      document.getElementById('product-name').value = btn.dataset.ten;
      document.getElementById('product-price').value = btn.dataset.gia;
      document.getElementById('product-stock').value = btn.dataset.slton;
      document.getElementById('product-status').value = btn.dataset.status;
      document.getElementById('product-desc').value = btn.dataset.mota;
      const selectElement = document.querySelector('select[name="category_id"]');
      if (selectElement) {
        Array.from(selectElement.options).forEach(opt => opt.selected = false);

        const categoriesStr = btn.dataset.categories;

        if (categoriesStr) {
          const categoryIds = categoriesStr.split(',');

          Array.from(selectElement.options).forEach(option => {
            if (categoryIds.includes(option.value)) {
              option.selected = true;
            }
          });
        }
      }
      const imageName = btn.dataset.image;
      const inputOldImage = document.getElementById('product-image-old');
      if (inputOldImage) {
        inputOldImage.value = imageName;
      }

      document.getElementById('product-image').value = "";
      const imgPreview = document.getElementById('product-img-preview');
      const imgPlaceholder = document.getElementById("product-img-placeholder");

      if (imageName) {
        if (imgPreview) {
          imgPreview.src = '/img/product_img/' + imageName;
          imgPreview.classList.remove('d-none');
        }
        if (imgPlaceholder) imgPlaceholder.classList.add("d-none");
      } else {
        if (imgPreview) {
          imgPreview.src = '/img/default.png';
          imgPreview.classList.remove('d-none');
        }
        if (imgPlaceholder) imgPlaceholder.classList.remove("d-none");
      }

      KFCUI.openModal('modal-product');
    });
  });

  const btn = document.getElementById("btn-add-product")

  // document.querySelectorAll(addBtnSelector).forEach(btn => {
    btn.addEventListener('click', () => {
      const form = document.getElementById('form-product');
      if (!form) return;

      form.reset();

      form.setAttribute("action", "/admin/add-product");

      document.getElementById('product-modal-title').textContent = 'Thêm Sản Phẩm KFC Mới';
      document.getElementById('product-id').value = '';

      const imgPreview = document.getElementById('product-img-preview');
      const imgPlaceholder = document.getElementById("product-img-placeholder");

      if (imgPreview) {
        imgPreview.src = '/img/default.png';
        imgPreview.classList.remove('d-none');
      }
      if (imgPlaceholder) {
        imgPlaceholder.classList.remove("d-none");
      }

      KFCUI.openModal('modal-product');
    // });
  });

  // setupDynamicListeners();
});
