// 상품 데이터 - 고객이 여기서 수정 가능
const products = [
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

// DOM 요소들
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const productGrid = document.getElementById('productGrid');

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

// 상품 렌더링 함수
function renderProducts() {
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

// 페이지 로드 시 상품 렌더링
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  
  // Lucide 아이콘 초기화
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

// 상품 데이터 수정 시 다시 렌더링 (개발용)
window.updateProducts = function(newProducts) {
  products.length = 0;
  products.push(...newProducts);
  renderProducts();
};
