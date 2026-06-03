/**
 * KFC Admin Dashboard - UI Rendering Layer (js/ui.js)
 * Manages rendering of lists, stats, charts, logs, and modal overlays.
 */

// Format currency in VND
export function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Format time
export function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' + 
         date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
}

// Generate inline SVG icon templates for UI uniformity
export const SVGIcons = {
  dashboard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>`,
  products: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5ZM12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 12.5523 7.05228 13 6.5 13C5.94772 13 5.5 12.5523 5.5 12C5.5 8.41015 8.41015 5.5 12 5.5C15.5899 5.5 18.5 8.41015 18.5 12C18.5 12.5523 18.0523 13 17.5 13C16.9477 13 16.5 12.5523 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5Z"/></svg>`,
  categories: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
  edit: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
  delete: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,
  add: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
  grid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 11h5V5H4v6zm0 8h5v-6H4v6zm7 0h5v-6h-5v6zm8 0h5v-6h-5v6zm-8-8h5V5h-5v6zm8 0h5V5h-5v6z"/></svg>`,
  list: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>`,
  flame: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.5 2c-5.62 3.24-6.1 6.5-6.1 8.5 0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5c0-2-1.35-6.07-4.9-8.5zm-3.5 11.5c-.83 0-1.5-.67-1.5-1.5 0-1.17.67-2.33 1.5-3 .83.67 1.5 1.83 1.5 3 0 .83-.67 1.5-1.5 1.5z"/></svg>`,
  empty: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM12 6c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/></svg>`,
  export: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`,
  import: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>`,
  log: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13 3H6c-1.1 0-2 .9-2 2v14c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-7-7zm2 16H8v-2h7v2zm0-4H8v-2h7v2zm-3-5V3.5L18.5 9H12z"/></svg>`
};

// UI Rendering Functions
export const KFCUI = {
  // Render Dashboard Home metrics
  renderDashboard(analytics, logs, products) {
    const productsKPI = document.getElementById('kpi-products');
    const categoriesKPI = document.getElementById('kpi-categories');
    const stockKPI = document.getElementById('kpi-stock');
    const outOfStockKPI = document.getElementById('kpi-out-of-stock');
    const chartContainer = document.getElementById('chart-container');
    const logsList = document.getElementById('logs-list');
    const lowStockContainer = document.getElementById('low-stock-container');

    // Update KPI Text content
    if (productsKPI) productsKPI.textContent = analytics.totalProducts;
    if (categoriesKPI) categoriesKPI.textContent = analytics.totalCategories;
    if (stockKPI) {
      const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
      stockKPI.textContent = totalStock;
    }
    if (outOfStockKPI) outOfStockKPI.textContent = analytics.outOfStockCount;

    // Render SVG bar charts
    if (chartContainer) {
      const maxCount = Math.max(...analytics.productsByCategory.map(c => c.count), 1);
      chartContainer.innerHTML = analytics.productsByCategory.map(cat => {
        const percentage = (cat.count / maxCount) * 100;
        return `
          <div class="chart-bar-wrapper">
            <div class="chart-bar-tooltip">${cat.count} sản phẩm</div>
            <div class="chart-bar" style="height: ${Math.max(percentage, 5)}%"></div>
            <div class="chart-label" title="${cat.categoryName}">${cat.categoryCode}</div>
          </div>
        `;
      }).join('');
    }

    // Render Logs List
    if (logsList) {
      if (logs.length === 0) {
        logsList.innerHTML = '<div class="text-center text-muted" style="padding: 20px;">Không có hoạt động nào gần đây.</div>';
      } else {
        logsList.innerHTML = logs.map(log => `
          <div class="log-row">
            <div class="log-indicator ${log.type}"></div>
            <div class="log-text">${log.message}</div>
            <div class="log-time">${formatTime(log.time)}</div>
          </div>
        `).join('');
      }
    }

    // Render Low Stock Section
    if (lowStockContainer) {
      const lowStockProducts = products.filter(p => p.status === 'available' && p.stock > 0 && p.stock < 10);
      if (lowStockProducts.length === 0) {
        lowStockContainer.innerHTML = '<div class="text-center text-muted" style="padding: 20px; font-size: 13px;">Không có sản phẩm nào sắp hết hàng.</div>';
        const warningBadge = document.getElementById('kpi-lowstock-badge');
        if (warningBadge) warningBadge.classList.add('d-none');
      } else {
        const warningBadge = document.getElementById('kpi-lowstock-badge');
        if (warningBadge) {
          warningBadge.textContent = `${lowStockProducts.length} sản phẩm`;
          warningBadge.classList.remove('d-none');
        }

        lowStockContainer.innerHTML = lowStockProducts.map(p => `
          <div class="log-row" style="background-color: rgba(255, 199, 44, 0.05); border-color: rgba(255, 199, 44, 0.2);">
            <div class="log-indicator category" style="background-color: var(--accent-yellow);"></div>
            <div class="log-text">
              <span class="font-bold" style="color: var(--accent-yellow);">${p.name} (${p.code})</span> chỉ còn lại <strong>${p.stock}</strong> sản phẩm trong kho.
            </div>
            <div>
              <button class="btn btn-secondary btn-icon btn-quick-restock" data-id="${p.id}" style="padding: 4px 8px; font-size: 11px;">
                Nhập Thêm
              </button>
            </div>
          </div>
        `).join('');
      }
    }
  },

  // Render Products list inside products-list-container
  renderProducts(products, categories, viewMode = 'table') {
    const listContainer = document.getElementById('products-list-container');
    if (!listContainer) return;

    if (products.length === 0) {
      listContainer.innerHTML = `
        <div class="card empty-state">
          ${SVGIcons.empty}
          <h4>Không tìm thấy sản phẩm nào</h4>
          <p>Hãy thử thay đổi từ khóa tìm kiếm, lọc theo bộ lọc khác hoặc nhấn thêm mới sản phẩm.</p>
          <button id="btn-empty-add-product" class="btn btn-primary">
            ${SVGIcons.add} Thêm Sản Phẩm Mới
          </button>
        </div>
      `;
      return;
    }

    if (viewMode === 'table') {
      const tableRows = products.map(p => {
        const cat = categories.find(c => c.id === p.categoryId) || { name: 'Chưa phân loại' };
        
        let statusBadge = `<span class="badge badge-success">Còn hàng</span>`;
        if (p.status === 'out_of_stock' || p.stock <= 0) {
          statusBadge = `<span class="badge badge-danger">Hết hàng</span>`;
        } else if (p.status === 'discontinued') {
          statusBadge = `<span class="badge badge-warning">Ngưng bán</span>`;
        }

        let flamesHTML = '<span class="spicy-flames">';
        for (let i = 1; i <= 3; i++) {
          flamesHTML += `<span class="${i <= p.spicyLevel ? '' : 'inactive'}">${SVGIcons.flame}</span>`;
        }
        flamesHTML += '</span>';

        return `
          <tr class="table-row">
            <td>
              <div class="product-cell">
                <img class="product-img-thmb" src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&auto=format&fit=crop'">
                <div class="product-info-text">
                  <span class="product-name-lbl">${p.name}</span>
                  <span class="product-code-lbl">${p.code}</span>
                </div>
              </div>
            </td>
            <td>${cat.name}</td>
            <td class="font-bold price-text">${formatVND(p.price)}</td>
            <td>
              <span class="badge badge-info" style="cursor: pointer;" title="Nhấn để đổi" data-toggle-stock="${p.id}">
                ${p.stock} chiếc
              </span>
            </td>
            <td>${statusBadge}</td>
            <td>${flamesHTML}</td>
            <td>
              <div class="action-buttons">
                <button class="action-btn btn-edit-active btn-edit-product" data-id="${p.id}" title="Chỉnh Sửa">
                  ${SVGIcons.edit}
                </button>
                <button class="action-btn btn-delete-active btn-delete-product" data-id="${p.id}" title="Xóa">
                  ${SVGIcons.delete}
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      listContainer.innerHTML = `
        <div class="table-responsive">
          <table class="kfc-table">
            <thead>
              <tr>
                <th style="width: 35%">Sản Phẩm</th>
                <th style="width: 15%">Danh Mục</th>
                <th style="width: 15%">Giá Bán</th>
                <th style="width: 10%">Kho Hàng</th>
                <th style="width: 10%">Trạng Thái</th>
                <th style="width: 10%">Độ Cay</th>
                <th style="width: 5%">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      `;
    } else {
      const gridCards = products.map(p => {
        const cat = categories.find(c => c.id === p.categoryId) || { name: 'Chưa phân loại' };
        
        let statusBadge = `<span class="badge badge-success">Còn hàng</span>`;
        if (p.status === 'out_of_stock' || p.stock <= 0) {
          statusBadge = `<span class="badge badge-danger">Hết hàng</span>`;
        } else if (p.status === 'discontinued') {
          statusBadge = `<span class="badge badge-warning">Ngưng bán</span>`;
        }

        let flamesHTML = '<div class="spicy-flames">';
        for (let i = 1; i <= 3; i++) {
          flamesHTML += `<span class="${i <= p.spicyLevel ? '' : 'inactive'}">${SVGIcons.flame}</span>`;
        }
        flamesHTML += '</div>';

        return `
          <div class="card product-card">
            <div class="product-card-img-wrapper">
              <div class="product-card-badges">
                ${statusBadge}
                ${p.calories ? `<span class="badge badge-info" style="backdrop-filter: blur(10px); background: rgba(0,0,0,0.5);">${p.calories} kcal</span>` : ''}
              </div>
              <img class="product-card-img" src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop'">
            </div>
            <div class="product-card-body">
              <div class="product-card-meta">
                <span class="product-card-category">${cat.name}</span>
                ${flamesHTML}
              </div>
              <h4 class="product-card-title">${p.name}</h4>
              <p class="product-card-desc">${p.description || 'Chưa có mô tả.'}</p>
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">
                Mã: <span class="font-bold">${p.code}</span> | Kho: <span class="font-bold" style="color: var(--text-white);">${p.stock} cái</span>
              </div>
              <div class="product-card-footer">
                <span class="price-text" style="color: var(--primary-red); font-size: 18px;">${formatVND(p.price)}</span>
                <div class="action-buttons">
                  <button class="action-btn btn-edit-active btn-edit-product" data-id="${p.id}" title="Chỉnh Sửa">
                    ${SVGIcons.edit}
                  </button>
                  <button class="action-btn btn-delete-active btn-delete-product" data-id="${p.id}" title="Xóa">
                    ${SVGIcons.delete}
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      listContainer.innerHTML = `
        <div class="grid-container">
          ${gridCards}
        </div>
      `;
    }
  },

  // Render Categories inside categories-list-container
  // renderCategories(categories, products, viewMode = 'grid') {
  //   const listContainer = document.getElementById('categories-list-container');
  //   if (!listContainer) return;
  //
  //   if (categories.length === 0) {
  //     listContainer.innerHTML = `
  //       <div class="card empty-state">
  //         ${SVGIcons.empty}
  //         <h4>Chưa có danh mục nào</h4>
  //         <p>Vui lòng thêm mới danh mục thực đơn đầu tiên.</p>
  //         <button id="btn-empty-add-category" class="btn btn-primary">
  //           ${SVGIcons.add} Thêm Danh Mục Mới
  //         </button>
  //       </div>
  //     `;
  //     return;
  //   }
  //
  //   if (viewMode === 'table') {
  //     const tableRows = categories.map(cat => {
  //       const prodCount = products.filter(p => p.categoryId === cat.id).length;
  //
  //       return `
  //         <tr class="table-row">
  //           <td class="font-bold" style="color: var(--primary-red);">${cat.code}</td>
  //           <td class="font-bold">${cat.name}</td>
  //           <td style="color: var(--text-gray);">${cat.description || 'Không có mô tả.'}</td>
  //           <td>
  //             <span class="badge badge-info">${prodCount} sản phẩm</span>
  //           </td>
  //           <td>
  //             <div class="action-buttons">
  //               <button class="action-btn btn-edit-active btn-edit-category" data-id="${cat.id}" title="Chỉnh Sửa">
  //                 ${SVGIcons.edit}
  //               </button>
  //               <button class="action-btn btn-delete-active btn-delete-category" data-id="${cat.id}" title="Xóa">
  //                 ${SVGIcons.delete}
  //               </button>
  //             </div>
  //           </td>
  //         </tr>
  //       `;
  //     }).join('');
  //
  //     listContainer.innerHTML = `
  //       <div class="table-responsive">
  //         <table class="kfc-table">
  //           <thead>
  //             <tr>
  //               <th style="width: 15%">Mã</th>
  //               <th style="width: 25%">Tên Danh Mục</th>
  //               <th style="width: 40%">Mô Tả</th>
  //               <th style="width: 10%">Số Lượng Món</th>
  //               <th style="width: 10%">Thao Tác</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             ${tableRows}
  //           </tbody>
  //         </table>
  //       </div>
  //     `;
  //   } else {
  //     const gridCards = categories.map(cat => {
  //       const prodCount = products.filter(p => p.categoryId === cat.id).length;
  //
  //       return `
  //         <div class="card category-card">
  //           <div class="category-card-header">
  //             <div class="category-card-title-box">
  //               <span class="category-card-code">${cat.code}</span>
  //               <h4 class="category-card-name">${cat.name}</h4>
  //             </div>
  //             <span class="badge badge-success">Hoạt động</span>
  //           </div>
  //           <p class="category-card-desc">${cat.description || 'Chưa nhập mô tả chi tiết cho danh mục này.'}</p>
  //           <div class="category-card-footer">
  //             <span class="category-prod-count">Gồm: <strong>${prodCount}</strong> sản phẩm</span>
  //             <div class="action-buttons">
  //               <button class="action-btn btn-edit-active btn-edit-category" data-id="${cat.id}" title="Chỉnh Sửa">
  //                 ${SVGIcons.edit}
  //               </button>
  //               <button class="action-btn btn-delete-active btn-delete-category" data-id="${cat.id}" title="Xóa">
  //                 ${SVGIcons.delete}
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       `;
  //     }).join('');
  //
  //     listContainer.innerHTML = `
  //       <div class="grid-container">
  //         ${gridCards}
  //       </div>
  //     `;
  //   }
  // },

  // Modals manager
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      
      const form = modal.querySelector('form');
      if (form) {
        form.reset();
        
        const idField = form.querySelector('[name="id"]');
        if (idField) idField.value = '';

        const preview = modal.querySelector('.image-preview-img');
        const placeholder = modal.querySelector('.image-preview-placeholder');
        if (preview && placeholder) {
          preview.src = '';
          preview.classList.add('d-none');
          placeholder.classList.remove('d-none');
        }
      }
    }
  }
};
