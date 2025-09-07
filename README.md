# Harisenin Course Platform

Platform pembelajaran online yang dibangun menggunakan React + TypeScript + Vite dengan fitur lengkap untuk manajemen kursus dan pembelajaran.

## 🚀 Tech Stack

- **Frontend Framework**: React 18 dengan TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React useState & useContext
- **Component Architecture**: Atomic Design Pattern

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/          # Komponen dasar (Button, Input, Icon, dll)
│   ├── molecules/      # Kombinasi atoms (Card, FilterMenu, SearchBar)
│   │   ├── FilterMenu.tsx     # ✅ useState untuk filter state
│   │   ├── SearchBar.tsx      # ✅ useState untuk search query
│   │   ├── CategoryTabs.tsx   # ✅ useState untuk active category
│   │   └── CourseCard.tsx     # Props dari parent component
│   ├── organisms/      # Komponen kompleks (Header, Footer, CourseGrid)
│   └── templates/      # Layout templates
├── pages/              # Halaman aplikasi
│   ├── Dashboard.tsx          # ✅ useState & useMemo untuk courses, filters, search
│   ├── OrderHistoryNew.tsx    # ✅ Array operations untuk order management
│   ├── DetailProduct/         # Detail kursus
│   ├── Checkout/              # Proses checkout
│   ├── Payment/               # Halaman pembayaran
│   └── Profile/               # Profil pengguna
├── hooks/              # Custom React hooks
│   └── useCart.ts             # ✅ useState untuk cart management
├── context/            # Context API untuk global state
│   └── AppContext.tsx         # ✅ useReducer & useContext implementation
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
│   └── course.ts              # ✅ Interface untuk Course, FilterState, CartItem
└── data/               # Data mock dan constants
    └── coursesData.ts         # ✅ Array object data untuk courses
```

## ✨ Features

### 🎯 Core Features
- **Dashboard Kursus**: Tampilan grid kursus dengan filter dan pencarian
- **Pencarian & Filter**: Filter berdasarkan kategori, harga, dan durasi
- **Detail Kursus**: Informasi lengkap kursus dengan video preview
- **Sistem Checkout**: Proses pembelian kursus yang aman
- **Payment Gateway**: Integrasi pembayaran dengan berbagai metode
- **Profile Management**: Manajemen profil dan riwayat pembelian
- **Responsive Design**: Optimized untuk semua device

### 🛠 Technical Features
- **useState Implementation**: ✅ State management untuk komponen interaktif
  - FilterMenu: useState untuk filter state dengan controlled inputs
  - SearchBar: useState untuk search query dengan real-time filtering
  - Dashboard: useState untuk courses, selectedCategory, filters, sortBy
  - OrderHistory: useState untuk orders array dengan CRUD operations
- **Array Object Operations**: ✅ CRUD operations untuk data management
  - coursesData: Array object dengan Course interfaces
  - Filter operations: filter(), map(), some() untuk pencarian dan filtering
  - Sort operations: sort() dengan multiple criteria
  - Reduce operations: untuk statistik dan aggregations
- **Parent-Child Communication**: ✅ Props passing dan callback functions
  - FilterMenu menerima filters state dan onFilterChange callback
  - SearchBar menerima onSearch callback untuk komunikasi ke parent
  - CategoryTabs menerima activeCategory dan onCategoryChange
- **Type Safety**: ✅ Full TypeScript support dengan interface definitions
- **Component Reusability**: ✅ Modular component architecture dengan Atomic Design

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Git

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd mission-intermediate-fe-2A
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. **Build untuk production**
   ```bash
   npm run build
   # atau
   yarn build
   ```

### Available Scripts

- `npm run dev` - Start development server dengan hot reload
- `npm run build` - Build aplikasi untuk production
- `npm run lint` - Run ESLint untuk code quality check
- `npm run preview` - Preview production build locally

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#FF5722)
- **Secondary**: Dark Blue (#1E293B)
- **Success**: Green (#22C55E)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font Family**: Inter
- **Headings**: font-semibold, font-bold
- **Body**: font-normal, font-medium

### Spacing & Layout
- **Container**: max-width dengan padding responsive
- **Grid**: CSS Grid dan Flexbox untuk layout
- **Breakpoints**: Tailwind default breakpoints (sm, md, lg, xl, 2xl)

## 📱 Responsive Design

Aplikasi fully responsive dengan breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🔧 Development Guidelines

### useState Implementation
- Identifikasi komponen yang memerlukan state (mutable components)
- Gunakan useState untuk local component state
- Lift state up ke parent component jika diperlukan oleh multiple children

### Array Object Operations
- Gunakan array methods (map, filter, reduce) untuk data manipulation
- Implement CRUD operations untuk course management
- Maintain immutability saat updating state arrays

### Component Architecture
- Follow Atomic Design Pattern
- Maintain single responsibility principle
- Use TypeScript interfaces untuk prop definitions

## 🚀 Deployment

### Build Production
```bash
npm run build
```

### Deploy ke Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy ke Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build dan deploy
npm run build
netlify deploy --prod --dir=dist
```

## 📝 ESLint Configuration

Untuk production application, update ESLint configuration:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

**Harisenin Bootcamp - Intermediate Frontend 2A**

---

**Happy Coding! 🚀**