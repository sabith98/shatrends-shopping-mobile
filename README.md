# 🛍️ ShaTrends - React Native E-Commerce App

A modern e-commerce mobile application built with React Native and TypeScript, implementing scalable architecture and industry best practices. The app features a robust authentication system, state management, and responsive design.

![React Native](https://img.shields.io/badge/React%20Native-v0.74.5-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.3.3-blue.svg)
![Expo](https://img.shields.io/badge/Expo-v51.0-black.svg)

## 🚀 Key Features

- **Modern Architecture**
  - Clean, modular project structure
  - Type-safe development with TypeScript
  - Scalable state management using Redux Toolkit and RTK Query
  - Custom hooks for business logic abstraction

- **Authentication System**
  - Secure token-based authentication
  - Persistent storage using AsyncStorage
  - Protected routes and authorization
  - Efficient token refresh mechanism

- **UI Implementation**
  - Responsive design across devices
  - Consistent theme configuration with React Native Paper
  - Reusable component architecture
  - Clean and intuitive user interface

## 🛠️ Technical Stack

- **Core**
  - React Native with Expo
  - TypeScript
  - Redux Toolkit & RTK Query
  - React Navigation 6

- **UI & Styling**
  - React Native Paper
  - Custom theming system

- **Development Tools**
  - ESLint
  - Prettier
  - Git version control

## 📁 Project Architecture
```
├── assets/
├── src/
│   ├── api/                    # API configurations and endpoints
│       ├── authApi.ts         # Authentication endpoints
│       ├── baseApi.ts         # Base API setup
│   ├── components/
│       ├── auth/              # Authentication components
│       ├── shared/            # Reusable components
│   ├── constants/             # App constants
│   ├── hooks/                 # Custom hooks
│   ├── navigation/            # Navigation setup
│   ├── screens/               # UI screens
│   ├── services/              # Storage services
│   ├── store/                # Redux store config
│   ├── theme/                # Theme configurations
│   ├── types/                # TypeScript definitions
│   └── utils/                # Utility functions
├── .env                      # Environment variables
└── tsconfig.json            # TypeScript configuration
```

## 🔧 Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/sabith98/shatrends-shopping-mobile.git
cd shatrends-shopping-mobile
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
Create a `.env` file in the root directory:
```
API_BASE_URL=http://your-api-url/api
```

4. **Start the app**
```bash
npx expo start
```

## 🌟 Technical Implementation Details

### State Management
- Centralized store using Redux Toolkit
- Efficient API caching with RTK Query
- Type safe actions and reducers
- Optimized data flow patterns

### Authentication Architecture
- JWT token management
- Secure token storage
- Automatic token refresh mechanism (In progress)
- Protected route implementation

### UI/UX Architecture
- Modular component design
- Consistent theming system
- Responsive layouts
- Performance-optimized rendering

## 📈 Development Approach

- **Code Quality**
  - Strong typing with TypeScript
  - Consistent code style with ESLint/Prettier
  - Modular and reusable component design
  - Clean code principles

- **Best Practices**
  - Clean Architecture principles
  - React Native performance optimization
  - Secure authentication implementation
  - DRY (Don't Repeat Yourself) principle
  - SOLID principles application

## 🤝 Contact

Feel free to reach out for any questions or collaboration opportunities!

Mohamed Sabith - mohamedsabith2@gmail.com

## 📄 License

This project is licensed under the MIT License.