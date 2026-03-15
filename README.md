# 우선심사용 쇼핑몰 목업 수정 가이드

<div align="center">

![POINTTWOFIVE · SECOND](https://img.shields.io/badge/POINTTWOFIVE·SECOND-000000?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMNiA3TDYgMTdMMTIgMjJMMTggMTdMThMNzYgMTJMMiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K&logoColor=white)

### **GitHub에서 직접 수정하고 바로 적용되는 쇼핑몰**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pigking51/sampleShopping)
[![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/ko/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/ko/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/ko/docs/Web/JavaScript)

---

## 🚀 빠른 시작

<table>
<tr>
<td width="50" valign="top" align="center">🟢</td>
<td>

**1단계: GitHub 저장소 접속**
```
https://github.com/pigking51/sampleShopping
```

</td>
</tr>
<tr>
<td width="50" valign="top" align="center">🟡</td>
<td>

**2단계: 수정할 파일 선택**
아래 가이드를 참조하여 원하는 파일 수정

</td>
</tr>
<tr>
<td width="50" valign="top" align="center">🔵</td>
<td>

**3단계: 커밋 메시지 작성**
변경사항 저장하고 "Commit changes" 클릭

</td>
</tr>
<tr>
<td width="50" valign="top" align="center">✅</td>
<td>

**4단계: 자동 적용**
몇 분 후 웹사이트에 변경사항 반영

</td>
</tr>
</table>

---

## 🛍️ 상품 정보 수정

### 📁 파일 경로
```javascript
script.js
```

### ✏️ 수정 방법
<span class="highlight">`products` 배열</span>에서 원하는 상품 정보를 수정하세요:

```javascript
const products = [
  {
    id: 1,
    name: '상품명',
    price: '₩가격',
    image: 'src/images/이미지파일.png'
  }
];
```

### 📝 상품 추가 예시
```javascript
{
  id: 8,
  name: '새로운 상품',
  price: '₩50,000',
  image: 'src/images/new-product.png'
}
```

> 💡 **팁:** 상품 이미지는 `src/images/` 폴더에 업로드하고 경로를 맞춰주세요

---

## 📋 메뉴 수정

### 📁 파일 경로
```html
index.html
```

### 📍 수정 위치
좌측 메뉴는 `<aside>` 태그 안의 `<a>` 태그들을 수정:

```html
<aside id="sidebar">
  <nav class="space-y-4">
    <a href="#" class="block text-gray-700 hover:text-gray-900 py-2 text-sm">컬렉션</a>
    <a href="#" class="block text-gray-700 hover:text-gray-900 py-2 text-sm">홈</a>
    <!-- 여기에 메뉴 추가/수정 -->
  </nav>
</aside>
```

---

## 🎨 로고 수정

### 📁 파일 경로
```html
index.html
```

### 🔄 로고 변경 방법

#### 1. 이미지 로고로 변경:
```html
<!-- h1 태그 주석 처리 -->
<!-- <h1>POINTTWOFIVE · SECOND</h1> -->

<!-- img 태그 주석 해제 -->
<img src="src/images/logo.png" alt="logo" class="w-10 h-10" />
```

#### 2. 이미지 업로드:
로고 이미지를 `src/images/logo.png`로 업로드

---

## 📝 메인 타이틀 수정

### 📁 파일 경로
```html
index.html
```

### 📍 수정 위치
메인 콘텐츠 영역의 `<h2>`와 `<p>` 태그 수정:

```html
<h2 class="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
  새 컬렉션: 미니멀 홈 굿즈
</h2>
<p class="text-lg text-gray-600">
  차분한 색상과 미니멀한 디자인으로 공간을 채우는 홈 굿즈 컬렉션
</p>
```

---

## � 저작권 표시 수정

### 📁 파일 경로
```html
index.html
```

### 📍 수정 위치
Footer의 저작권 표시 부분 수정:

```html
<div class="text-center mt-8 text-sm text-gray-500">
  <p>&copy; 2024 POINTTWOFIVE · SECOND. All rights reserved.</p>
  <!-- 저작권 표시 - 필요시 연도나 브랜드명만 수정 가능 -->
</div>
```

> 💡 **팁:** 저작권 표시는 법적 중요성이 있으므로 연도나 브랜드명만 수정하세요

---

## �📁 이미지 관리

### 📂 이미지 폴더 구조
```
src/
├── images/
│   ├── image1.png
│   ├── image2.png
│   └── logo.png (추가 시)
```

### 📸 이미지 추가 방법
1. GitHub 저장소 접속
2. `src/images/` 폴더로 이동
3. "Add file" → "Upload files"
4. 이미지 파일 업로드
5. `script.js`에서 경로 수정

---

## ⚠️ 중요 주의사항

<table>
<tr>
<td>🔒</td>
<td>

**파일 구조 유지**
파일 수정 시 항상 원본 구조를 유지하세요

</td>
</tr>
<tr>
<td>📝</td>
<td>

**파일명 규칙**
이미지 파일명은 영문과 숫자만 사용하세요

</td>
</tr>
<tr>
<td>⏰</td>
<td>

**반영 시간**
수정 후 반영까지 3-5분 정도 소요될 수 있습니다

</td>
</tr>
<tr>
<td>🔄</td>
<td>

**되돌리기 가능**
문제 발생 시 변경사항을 되돌릴 수 있으니 안심하고 수정하세요

</td>
</tr>
</table>

---

## 🆘 도움이 필요하신가요?

수정 중 문제가 발생하면 언제든지 문의해주세요

<div align="center">

[![문의하기](https://img.shields.io/badge/문의하기-4285F4?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-email@example.com)
[![GitHub 저장소](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pigking51/sampleShopping)

</div>

---

<div align="center">

**© 2026 pigking51. All rights reserved.**

이 가이드는 언제든지 수정하여 사용할 수 있습니다

</div>

---

<style>
.highlight {
  background: linear-gradient(120deg, #ffd700 0%, #ffed4e 100%);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

table td {
  padding: 12px;
  border: 1px solid #e1e5e9;
  vertical-align: top;
}

table tr:nth-child(even) {
  background-color: #f8f9fa;
}

code {
  background: #f6f8fa;
  border: 1px solid #d1d9e0;
  border-radius: 6px;
  padding: 2px 6px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 85%;
}

pre {
  background: #f6f8fa;
  border: 1px solid #d1d9e0;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
}

pre code {
  background: none;
  border: none;
  padding: 0;
  font-size: 100%;
}

blockquote {
  border-left: 4px solid #d1d9e0;
  padding-left: 16px;
  margin: 20px 0;
  color: #656d76;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  background: #f1f3f4;
  color: #5f6368;
}
</style>
