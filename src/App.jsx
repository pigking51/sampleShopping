import React, { useState } from 'react'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const menuItems = [
    '컬렉션',
    '홈', 
    '케어',
    '소개',
    '쇼핑 & 대리점',
    '고객 지원',
    'FAQ',
    '문의'
  ]
  //  products 배열을 수정 or 추가하여 상품 관리 가능
  const products = [
    {
      id: 1,
      name: '면 램프 심지 - 15m',
      price: '₩12,000',
      image: '/images/image1.png'
    },
    {
      id: 2,
      name: '핸드-푸어 소이 캔들 (218g/7.7oz)',
      price: '₩35,000',
      image: '/images/image2.png'
    },
    {
      id: 3,
      name: '필라 캔들 & 세라믹 트레이 세트',
      price: '₩58,000',
      image: '/images/image3.png'
    },
    {
      id: 4,
      name: '파인 세라믹 용기 세트',
      price: '₩42,000',
      image: '/images/image4.png'
    },
    {
      id: 5,
      name: '세라믹 아로마 디퓨저 & 오일',
      price: '₩45,000',
      image: '/images/image5.png'
    },
    {
      id: 6,
      name: '미니멀 홈 굿즈 세트',
      price: '₩78,000',
      image: '/images/image6.png'
    },
    {
      id: 7,
      name: '캔들 & 디퓨저 세트',
      price: '₩65,000',
      image: '/images/image7.png'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:text-gray-900"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              {/* 로고는 여기서 수정 가능 */}
              <h1 className="ml-2 lg:ml-0 text-xl font-light tracking-wider">POINTTWOFIVE · SECOND</h1>
              {/* 만약 문자상표가 아닌 경우에는 위의 h1을 주석처리하고 아래의 img를 주석 해제하여 사용 */}
              {/* <img src="/logo.png" alt="logo" className="ml-2 lg:ml-0 w-10 h-10" /> */}
            </div>
            <div className="flex items-center space-x-6">
              <button className="p-2 rounded-md text-gray-700 hover:text-gray-900">
                <Search size={20} />
              </button>
              <button className="p-2 rounded-md text-gray-700 hover:text-gray-900">
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 
          w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
          lg:block mt-16 lg:mt-0
        `}>
          <div className="p-6">
            <nav className="space-y-4">
              {menuItems.map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="block text-gray-700 hover:text-gray-900 py-2 text-sm"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              {/* 메인 타이틀은 여기서 수정 가능 */}
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
                새 컬렉션: 미니멀 홈 굿즈
              </h2>
              <p className="text-lg text-gray-600">
                차분한 색상과 미니멀한 디자인으로 공간을 채우는 홈 굿즈 컬렉션
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="bg-gray-100 aspect-square mb-4 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-in-out" style={{ display: product.image ? 'none' : 'flex' }}>
                      <span className="text-gray-500 text-sm">상품 이미지</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-light text-gray-900">{product.price}</span>
                    <button className="bg-white border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:shadow-sm">
                      장바구니 담기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-light tracking-wider mb-4">POINTTWOFIVE · SECOND</h3>
          </div>
          <div className="flex flex-wrap justify-center space-x-8 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">링크</a>
            <a href="#" className="hover:text-gray-900">문의처</a>
            <a href="#" className="hover:text-gray-900">개인정보처리방침</a>
            <a href="#" className="hover:text-gray-900">이용약관</a>
          </div>
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>&copy; 2024 POINTTWOFIVE · SECOND. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
