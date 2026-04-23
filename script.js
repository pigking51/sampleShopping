// 상품 데이터 - 해당 배열을 수정하여 본문에 나오는 상품들을 만들 수 있음
// 상품 사진의 경우 images폴더에 들어가는 것이기 때문에 images에 사진을 넣고 경로상의 이름을 바꿔주거나 해당 이름에 맞게 덮어쓰기 해주면 됨
const defaultProducts = [
  {
    id: 1,
    name: '면 램프 심지 - 15m',
    price: '₩12,000',
    image: 'src/images/image1.png'
  },
  {
    id: 2,
    name: '핸드-푸어 소이 캔들 (218g/7.7oz)',
    price: '₩35,000',
    image: 'src/images/image2.png'
  },
  {
    id: 3,
    name: '필라 캔들 & 세라믹 트레이 세트',
    price: '₩58,000',
    image: 'src/images/image3.png'
  },
  {
    id: 4,
    name: '파인 세라믹 용기 세트',
    price: '₩42,000',
    image: 'src/images/image4.png'
  },
  {
    id: 5,
    name: '세라믹 아로마 디퓨저 & 오일',
    price: '₩45,000',
    image: 'src/images/image5.png'
  },
  {
    id: 6,
    name: '미니멀 홈 굿즈 세트',
    price: '₩78,000',
    image: 'src/images/image6.png'
  },
  {
    id: 7,
    name: '캔들 & 디퓨저 세트',
    price: '₩65,000',
    image: 'src/images/image7.png'
  }
];

// 데이터 관리자 클래스
class DataManager {
  constructor() {
    this.storageKey = 'myProducts';
    this.settingsKey = 'mySettings';
    this.initializeData();
  }

  initializeData() {
    // localStorage에 데이터가 없으면 초기값 저장
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(defaultProducts));
    }
    
    // 설정 초기화
    if (!localStorage.getItem(this.settingsKey)) {
      const defaultSettings = {
        brandName: 'POINTTWOFIVE · SECOND',
        copyrightBrand: 'POINTTWOFIVE · SECOND',
        logoImage: null,
        useLogo: false
      };
      localStorage.setItem(this.settingsKey, JSON.stringify(defaultSettings));
    }
  }

  getProducts() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveProducts(products) {
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  getSettings() {
    return JSON.parse(localStorage.getItem(this.settingsKey) || '{}');
  }

  saveSettings(settings) {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
  }

  addProduct(product) {
    const products = this.getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { ...product, id: newId };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  updateProduct(id, updates) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.saveProducts(products);
      return products[index];
    }
    return null;
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    this.saveProducts(filteredProducts);
    return filteredProducts.length !== products.length;
  }
}

// 모달 관리자 클래스
class ModalManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.modal = document.getElementById('settingsModal');
    this.backdrop = document.getElementById('modalBackdrop');
    this.deleteModal = document.getElementById('deleteModal');
    this.deleteBackdrop = document.getElementById('deleteModalBackdrop');
    this.logoImageInput = document.getElementById('logoImageInput');
    this.copyrightBrandInput = document.getElementById('copyrightBrandInput');
    this.productList = document.getElementById('productList');
    this.productToDelete = null;
    
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // 메인 모달 열기/닫기
    document.getElementById('settingsBtn').addEventListener('click', () => this.openModal());
    document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
    this.backdrop.addEventListener('click', () => this.closeModal());

    // 삭제 모달 이벤트
    document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.closeDeleteModal());
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.confirmDelete());
    this.deleteBackdrop.addEventListener('click', () => this.closeDeleteModal());

    // 로고 이미지 변경
    this.logoImageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const settings = this.dataManager.getSettings();
          settings.logoImage = event.target.result;
          settings.useLogo = true;
          this.dataManager.saveSettings(settings);
          this.updateBrandDisplay();
        };
        reader.readAsDataURL(file);
      }
    });

    // 저작권 브랜드명 변경
    this.copyrightBrandInput.addEventListener('input', (e) => {
      const settings = this.dataManager.getSettings();
      settings.copyrightBrand = e.target.value;
      this.dataManager.saveSettings(settings);
      this.updateCopyrightDisplay();
    });

    // 상품 추가 버튼
    document.getElementById('addProductBtn').addEventListener('click', () => {
      this.addNewProduct();
    });

    // 확인 버튼
    document.getElementById('confirmBtn').addEventListener('click', () => {
      this.showConfirmation();
    });

    // 이벤트 위임으로 상품 관리
    this.productList.addEventListener('click', (e) => {
      const productItem = e.target.closest('.product-item');
      if (!productItem) return;

      const productId = parseInt(productItem.dataset.productId);
      
      if (e.target.closest('.delete-product-btn')) {
        e.preventDefault();
        e.stopPropagation();
        this.openDeleteModal(productId);
      } else if (e.target.classList.contains('product-name-input')) {
        // 이름 변경은 input 이벤트로 처리
      } else if (e.target.classList.contains('product-image-input')) {
        // 이미지 변경은 change 이벤트로 처리
      }
    });

    // 상품 이름 변경 (이벤트 위임)
    this.productList.addEventListener('input', (e) => {
      if (e.target.classList.contains('product-name-input')) {
        const productItem = e.target.closest('.product-item');
        const productId = parseInt(productItem.dataset.productId);
        this.updateProductName(productId, e.target.value);
      }
    });

    // 상품 이미지 변경 (이벤트 위임)
    this.productList.addEventListener('change', (e) => {
      if (e.target.classList.contains('product-image-input')) {
        const productItem = e.target.closest('.product-item');
        const productId = parseInt(productItem.dataset.productId);
        const file = e.target.files[0];
        if (file) {
          this.handleProductImageChange(productId, file);
        }
      }
    });
  }

  openModal() {
    this.modal.style.display = 'block';
    this.backdrop.style.display = 'block';
    this.loadSettings();
    this.renderProductList();
    // Lucide 아이콘 다시 초기화
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  closeModal() {
    this.modal.style.display = 'none';
    this.backdrop.style.display = 'none';
  }

  openDeleteModal(productId) {
    this.productToDelete = productId;
    this.deleteModal.style.display = 'block';
    this.deleteBackdrop.style.display = 'block';
    
    // Lucide 아이콘 다시 초기화
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  closeDeleteModal() {
    this.deleteModal.style.display = 'none';
    this.deleteBackdrop.style.display = 'none';
    this.productToDelete = null;
  }

  confirmDelete() {
    if (this.productToDelete !== null) {
      this.dataManager.deleteProduct(this.productToDelete);
      this.renderProductList();
      this.renderMainProducts(); // 메인 화면 업데이트
      this.closeDeleteModal();
    }
  }

  loadSettings() {
    const settings = this.dataManager.getSettings();
    this.copyrightBrandInput.value = settings.copyrightBrand || '';
  }

  updateBrandDisplay() {
    const settings = this.dataManager.getSettings();
    const brandElements = document.querySelectorAll('.brand-name');
    const logoElements = document.querySelectorAll('.brand-logo');
    
    // 로고 이미지가 있으면 항상 로고 표시
    if (settings.useLogo && settings.logoImage) {
      brandElements.forEach(el => {
        el.style.display = 'none';
      });
      
      logoElements.forEach(el => {
        el.src = settings.logoImage;
        el.style.display = 'block';
      });
    } else {
      // 로고가 없으면 기본 브랜드명 표시
      brandElements.forEach(el => {
        el.style.display = 'block';
        el.textContent = settings.brandName || 'POINTTWOFIVE · SECOND';
      });

      logoElements.forEach(el => {
        el.style.display = 'none';
      });
    }
  }

  updateCopyrightDisplay() {
    const settings = this.dataManager.getSettings();
    const copyrightElements = document.querySelectorAll('.copyright-brand');
    
    copyrightElements.forEach(el => {
      el.textContent = settings.copyrightBrand || 'POINTTWOFIVE · SECOND';
    });
  }

  renderProductList() {
    const products = this.dataManager.getProducts();
    this.productList.innerHTML = products.map(product => `
      <div class="product-item border border-gray-200 rounded-lg p-4" data-product-id="${product.id}">
        <div class="flex justify-between items-start mb-3">
          <h4 class="font-medium text-gray-900">상품 #${product.id}</h4>
          <button class="delete-product-btn p-1 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">상품명</label>
            <input 
              type="text" 
              class="product-name-input w-full px-2 py-1 border border-gray-300 rounded text-sm"
              value="${product.name}"
              placeholder="상품명 입력"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">가격</label>
            <input 
              type="text" 
              class="product-price-input w-full px-2 py-1 border border-gray-300 rounded text-sm"
              value="${product.price}"
              placeholder="가격 입력"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">이미지</label>
            <input 
              type="file" 
              class="product-image-input w-full text-xs"
              accept="image/*"
            >
          </div>
        </div>
      </div>
    `).join('');

    // Lucide 아이콘 다시 초기화
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // 가격 변경 이벤트 (이벤트 위임)
    this.productList.addEventListener('input', (e) => {
      if (e.target.classList.contains('product-price-input')) {
        const productItem = e.target.closest('.product-item');
        const productId = parseInt(productItem.dataset.productId);
        this.updateProductPrice(productId, e.target.value);
      }
    });
  }

  addNewProduct() {
    const newProduct = this.dataManager.addProduct({
      name: '새 상품',
      price: '₩0',
      image: ''
    });
    this.renderProductList();
    this.renderMainProducts(); // 메인 화면 업데이트
  }

  updateProductName(id, name) {
    this.dataManager.updateProduct(id, { name });
    this.renderMainProducts(); // 메인 화면 업데이트
  }

  updateProductPrice(id, price) {
    this.dataManager.updateProduct(id, { price });
    this.renderMainProducts(); // 메인 화면 업데이트
  }

  handleProductImageChange(id, file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.dataManager.updateProduct(id, { image: event.target.result });
      this.renderMainProducts(); // 메인 화면 업데이트
    };
    reader.readAsDataURL(file);
  }

  deleteProduct(id) {
    // 이 함수는 더 이상 사용되지 않음 - openDeleteModal로 대체
  }

  showConfirmation() {
    // 간단한 알림으로 설정 변경 확인
    const confirmMessage = document.createElement('div');
    confirmMessage.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    confirmMessage.textContent = '✓ 설정이 저장되었습니다';
    document.body.appendChild(confirmMessage);
    
    // 3초 후 자동 제거
    setTimeout(() => {
      if (confirmMessage.parentNode) {
        confirmMessage.parentNode.removeChild(confirmMessage);
      }
    }, 3000);
  }

  renderMainProducts() {
    const products = this.dataManager.getProducts();
    const productGrid = document.getElementById('productGrid');
    
    productGrid.innerHTML = products.map(product => `
      <div class="group cursor-pointer">
        <div class="bg-gray-100 aspect-square mb-4 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          ${product.image ? `
            <img 
              src="${product.image}" 
              alt="${product.name}"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
          ` : ''}
          <div class="w-full h-full bg-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-in-out" style="${product.image ? 'display: none;' : 'display: flex;'}">
            <span class="text-gray-500 text-sm">상품 이미지</span>
          </div>
        </div>
        <h3 class="text-lg font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-200">
          ${product.name}
        </h3>
        <div class="flex justify-between items-center">
          <span class="text-xl font-light text-gray-900">${product.price}</span>
          <button class="bg-white border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-sm">
            장바구니 담기
          </button>
        </div>
      </div>
    `).join('');
  }
}

// DOM 요소들
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// 사이드바 토글 기능
menuToggle?.addEventListener('click', () => {
  sidebar.classList.toggle('-translate-x-full');
  sidebar.classList.toggle('translate-x-0');
  overlay.classList.toggle('hidden');
});

overlay?.addEventListener('click', () => {
  sidebar.classList.add('-translate-x-full');
  sidebar.classList.remove('translate-x-0');
  overlay.classList.add('hidden');
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  const dataManager = new DataManager();
  const modalManager = new ModalManager(dataManager);
  
  // 초기 렌더링
  modalManager.updateBrandDisplay();
  modalManager.updateCopyrightDisplay();
  modalManager.renderMainProducts();
  
  // Lucide 아이콘 초기화
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// 상품 데이터 수정 시 다시 렌더링 (개발용)
window.updateProducts = function(newProducts) {
  const dataManager = new DataManager();
  dataManager.saveProducts(newProducts);
  location.reload(); // 페이지 새로고침으로 간단히 처리
};
