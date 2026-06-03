/**
 * KFC Admin Dashboard - Data Layer (js/data.js)
 * Manages the state, localStorage persistence, default seeds, validation, and analytics calculations.
 */

const STORAGE_KEYS = {
  CATEGORIES: 'kfc_admin_categories',
  PRODUCTS: 'kfc_admin_products',
  LOGS: 'kfc_admin_logs'
};

const defaultCategories = [
  { id: 'cat-chicken', name: 'Gà Rán & Gà Quay', code: 'CHICKEN', description: 'Gà rán truyền thống, gà giòn cay, gà quay giấy bạc thơm ngon nóng hổi.' },
  { id: 'cat-burgers', name: 'Burgers & Cơm & Mì Ý', code: 'MEALS', description: 'Các món ăn chính đầy đủ dinh dưỡng: Burgers, Cơm gà phi lê, Mì Ý sốt bò bằm.' },
  { id: 'cat-snacks', name: 'Thức Ăn Nhẹ', code: 'SNACKS', description: 'Khoai tây chiên, khoai tây múi cau, khoai tây nghiền, bánh trứng Egg Tart và các món ăn kèm.' },
  { id: 'cat-drinks', name: 'Thức Uống & Tráng Miệng', code: 'DRINKS', description: 'Nước ngọt giải khát, trà chanh, các món tráng miệng ngọt ngào.' }
];

const defaultProducts = [
  {
    id: 'prod-1',
    code: 'KFC-001',
    name: 'Gà Rán Truyền Thống (1 Miếng)',
    categoryId: 'cat-chicken',
    price: 38000,
    stock: 120,
    status: 'available', // available, out_of_stock, discontinued
    spicyLevel: 0,
    calories: 290,
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: '1 miếng Gà Rán Truyền Thống giòn rụm với hương vị 11 loại thảo mộc và gia vị bí mật.'
  },
  {
    id: 'prod-2',
    code: 'KFC-002',
    name: 'Gà Giòn Cay (1 Miếng)',
    categoryId: 'cat-chicken',
    price: 38000,
    stock: 95,
    status: 'available',
    spicyLevel: 2,
    calories: 320,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: '1 miếng Gà Giòn Cay cay nồng đậm đà giòn tan.'
  },
  {
    id: 'prod-3',
    code: 'KFC-003',
    name: 'Burger Zinger',
    categoryId: 'cat-burgers',
    price: 54000,
    stock: 50,
    status: 'available',
    spicyLevel: 1,
    calories: 450,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Burger Zinger trứ danh với nhân phi-lê gà giòn cay, xà lách tươi mát và sốt mayonnaise béo ngậy.'
  },
  {
    id: 'prod-4',
    code: 'KFC-004',
    name: 'Cơm Gà Xiên Que',
    categoryId: 'cat-burgers',
    price: 45000,
    stock: 3, // low stock for demonstration
    status: 'available',
    spicyLevel: 0,
    calories: 520,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Cơm nóng dẻo dùng kèm xiên gà nướng sốt teriyaki thơm lừng và rau củ chiên thanh mát.'
  },
  {
    id: 'prod-5',
    code: 'KFC-005',
    name: 'Khoai Tây Chiên (Vừa)',
    categoryId: 'cat-snacks',
    price: 28000,
    stock: 80,
    status: 'available',
    spicyLevel: 0,
    calories: 310,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Khoai tây cắt lát chiên giòn vàng đều, rắc muối nhẹ.'
  },
  {
    id: 'prod-6',
    code: 'KFC-006',
    name: 'Bánh Trứng Egg Tart (1 Cái)',
    categoryId: 'cat-snacks',
    price: 18000,
    stock: 0, // out of stock
    status: 'out_of_stock',
    spicyLevel: 0,
    calories: 200,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Bánh tart vỏ nhiều lớp giòn tan nướng vàng với lớp nhân kem trứng béo ngậy thơm lừng.'
  },
  {
    id: 'prod-7',
    code: 'KFC-007',
    name: 'Pepsi Lon',
    categoryId: 'cat-drinks',
    price: 19000,
    stock: 200,
    status: 'available',
    spicyLevel: 0,
    calories: 140,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    description: 'Nước giải khát Pepsi mát lạnh, sảng khoái tức thì.'
  }
];

const defaultLogs = [
  { time: new Date(Date.now() - 3600000 * 2).toISOString(), type: 'system', message: 'Hệ thống đã khởi tạo dữ liệu mẫu thành công.' },
  { time: new Date(Date.now() - 3600000).toISOString(), type: 'product', message: 'Cập nhật kho hàng: Sản phẩm KFC-006 tạm thời hết hàng.' },
  { time: new Date().toISOString(), type: 'category', message: 'Chào mừng bạn đến với KFC Admin Dashboard!' }
];

export const KFCStore = {
  // Initialize storage
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(defaultProducts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(defaultLogs));
    }
  },

  // Log events
  addLog(type, message) {
    const logs = this.getLogs();
    logs.unshift({
      time: new Date().toISOString(),
      type,
      message
    });
    // Keep max 50 logs
    const trimmedLogs = logs.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(trimmedLogs));
    return trimmedLogs;
  },

  getLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');
  },

  clearLogs() {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify([]));
    this.addLog('system', 'Lịch sử hoạt động đã được xóa.');
    return [];
  },

  // Category CRUD
  getCategories() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES) || '[]');
  },

  getCategoryById(id) {
    return this.getCategories().find(c => c.id === id);
  },

  addCategory(categoryData) {
    const categories = this.getCategories();
    
    // Validation
    if (!categoryData.name || !categoryData.code) {
      throw new Error('Tên và mã danh mục là bắt buộc.');
    }
    
    const formattedCode = categoryData.code.trim().toUpperCase();
    if (categories.some(c => c.code.toUpperCase() === formattedCode)) {
      throw new Error(`Mã danh mục "${formattedCode}" đã tồn tại.`);
    }

    const newCategory = {
      id: 'cat-' + Date.now(),
      name: categoryData.name.trim(),
      code: formattedCode,
      description: (categoryData.description || '').trim()
    };

    categories.push(newCategory);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    this.addLog('category', `Đã thêm danh mục mới: ${newCategory.name} (${newCategory.code})`);
    return newCategory;
  },

  updateCategory(id, categoryData) {
    const categories = this.getCategories();
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Không tìm thấy danh mục để cập nhật.');

    if (!categoryData.name || !categoryData.code) {
      throw new Error('Tên và mã danh mục là bắt buộc.');
    }

    const formattedCode = categoryData.code.trim().toUpperCase();
    if (categories.some(c => c.id !== id && c.code.toUpperCase() === formattedCode)) {
      throw new Error(`Mã danh mục "${formattedCode}" đã tồn tại ở danh mục khác.`);
    }

    const updatedCategory = {
      ...categories[index],
      name: categoryData.name.trim(),
      code: formattedCode,
      description: (categoryData.description || '').trim()
    };

    categories[index] = updatedCategory;
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    this.addLog('category', `Đã cập nhật danh mục: ${updatedCategory.name} (${updatedCategory.code})`);
    return updatedCategory;
  },

  deleteCategory(id) {
    const categories = this.getCategories();
    const category = categories.find(c => c.id === id);
    if (!category) throw new Error('Không tìm thấy danh mục.');

    // Check if category contains products
    const products = this.getProducts();
    const hasProducts = products.some(p => p.categoryId === id);
    if (hasProducts) {
      throw new Error('Không thể xóa danh mục này vì vẫn còn sản phẩm thuộc danh mục. Vui lòng chuyển các sản phẩm sang danh mục khác trước.');
    }

    const filtered = categories.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(filtered));
    this.addLog('category', `Đã xóa danh mục: ${category.name} (${category.code})`);
    return true;
  },

  // Product CRUD
  getProducts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS) || '[]');
  },

  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  },

  addProduct(productData) {
    const products = this.getProducts();
    
    // Validation
    this.validateProductData(productData);

    const formattedCode = productData.code.trim().toUpperCase();
    if (products.some(p => p.code.toUpperCase() === formattedCode)) {
      throw new Error(`Mã sản phẩm "${formattedCode}" đã tồn tại.`);
    }

    const newProduct = {
      id: 'prod-' + Date.now(),
      code: formattedCode,
      name: productData.name.trim(),
      categoryId: productData.categoryId,
      price: Number(productData.price),
      stock: Number(productData.stock),
      status: productData.stock <= 0 ? 'out_of_stock' : productData.status,
      spicyLevel: Number(productData.spicyLevel || 0),
      calories: productData.calories ? Number(productData.calories) : null,
      image: (productData.image || '').trim() || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3', // placeholder pizza/fast food if completely blank
      description: (productData.description || '').trim()
    };

    products.push(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.addLog('product', `Đã thêm sản phẩm mới: ${newProduct.name} (${newProduct.code})`);
    return newProduct;
  },

  updateProduct(id, productData) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Không tìm thấy sản phẩm.');

    this.validateProductData(productData);

    const formattedCode = productData.code.trim().toUpperCase();
    if (products.some(p => p.id !== id && p.code.toUpperCase() === formattedCode)) {
      throw new Error(`Mã sản phẩm "${formattedCode}" đã bị trùng.`);
    }

    // Force out of stock if stock is 0
    let status = productData.status;
    const stock = Number(productData.stock);
    if (stock <= 0) {
      status = 'out_of_stock';
    } else if (status === 'out_of_stock' && stock > 0) {
      status = 'available'; // auto resolve
    }

    const updatedProduct = {
      ...products[index],
      code: formattedCode,
      name: productData.name.trim(),
      categoryId: productData.categoryId,
      price: Number(productData.price),
      stock: stock,
      status: status,
      spicyLevel: Number(productData.spicyLevel || 0),
      calories: productData.calories ? Number(productData.calories) : null,
      image: (productData.image || '').trim(),
      description: (productData.description || '').trim()
    };

    products[index] = updatedProduct;
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.addLog('product', `Đã cập nhật sản phẩm: ${updatedProduct.name} (${updatedProduct.code})`);
    return updatedProduct;
  },

  deleteProduct(id) {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);
    if (!product) throw new Error('Không tìm thấy sản phẩm.');

    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
    this.addLog('product', `Đã xóa sản phẩm: ${product.name} (${product.code})`);
    return true;
  },

  validateProductData(data) {
    if (!data.name || !data.code || !data.categoryId || data.price === undefined || data.stock === undefined) {
      throw new Error('Vui lòng điền đầy đủ các thông tin bắt buộc.');
    }
    if (Number(data.price) < 0) {
      throw new Error('Giá sản phẩm không thể âm.');
    }
    if (Number(data.stock) < 0) {
      throw new Error('Số lượng tồn kho không thể âm.');
    }
    if (data.spicyLevel !== undefined && (Number(data.spicyLevel) < 0 || Number(data.spicyLevel) > 3)) {
      throw new Error('Độ cay chỉ được từ mức 0 đến 3.');
    }
  },

  // Quick toggle stock status
  toggleProductStatus(id) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Không tìm thấy sản phẩm.');

    const prod = products[index];
    if (prod.status === 'available') {
      prod.status = 'out_of_stock';
      prod.stock = 0;
    } else {
      prod.status = 'available';
      prod.stock = prod.stock === 0 ? 50 : prod.stock; // set default to 50 if it was 0
    }

    products[index] = prod;
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.addLog('product', `Đã chuyển đổi trạng thái ${prod.name}: hiện tại là ${prod.status === 'available' ? 'Còn hàng' : 'Hết hàng'}`);
    return prod;
  },

  // Analytics Helpers
  getAnalytics() {
    const products = this.getProducts();
    const categories = this.getCategories();

    const totalProducts = products.length;
    const totalCategories = categories.length;
    const outOfStockCount = products.filter(p => p.status === 'out_of_stock' || p.stock === 0).length;
    const lowStockCount = products.filter(p => p.status === 'available' && p.stock > 0 && p.stock < 10).length;
    
    // Average price
    const avgPrice = totalProducts > 0 
      ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / totalProducts) 
      : 0;

    // Product count per category
    const productsByCategory = categories.map(cat => {
      const count = products.filter(p => p.categoryId === cat.id).length;
      return {
        categoryId: cat.id,
        categoryName: cat.name,
        categoryCode: cat.code,
        count
      };
    });

    // Simulate average sales data based on prices and stocks for premium dashboard display
    const simulatedRevenue = products.reduce((acc, p) => acc + (p.price * (Math.floor(p.id.charCodeAt(p.id.length - 1) % 10) + 1)), 0);

    return {
      totalProducts,
      totalCategories,
      outOfStockCount,
      lowStockCount,
      avgPrice,
      productsByCategory,
      simulatedRevenue
    };
  },

  // Export data
  exportData() {
    const data = {
      categories: this.getCategories(),
      products: this.getProducts()
    };
    return JSON.stringify(data, null, 2);
  },

  // Import data
  importData(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data.categories || !data.products || !Array.isArray(data.categories) || !Array.isArray(data.products)) {
        throw new Error('Định dạng dữ liệu không hợp lệ. Phải chứa danh mục và sản phẩm.');
      }
      
      // Basic structures check
      data.categories.forEach((cat, index) => {
        if (!cat.id || !cat.name || !cat.code) {
          throw new Error(`Danh mục ở hàng số ${index + 1} thiếu thông tin bắt buộc.`);
        }
      });
      data.products.forEach((prod, index) => {
        if (!prod.id || !prod.code || !prod.name || !prod.categoryId || prod.price === undefined) {
          throw new Error(`Sản phẩm ở hàng số ${index + 1} thiếu thông tin bắt buộc.`);
        }
      });

      // Save
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(data.categories));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data.products));
      this.addLog('system', 'Khôi phục và nhập dữ liệu thành công.');
      return true;
    } catch (e) {
      throw new Error(`Lỗi nhập dữ liệu: ${e.message}`);
    }
  }
};
