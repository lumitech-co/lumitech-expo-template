# Lumitech Expo Template

A modern React Native template built with Expo, designed for scalable mobile applications with best practices and powerful libraries.

## 🚀 Core Technologies

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tools
- **Expo Router** - File-based routing system
- **TypeScript** - Type safety and better development experience
- **React Native Unistyles** - Theming and styling system
- **React Query** - Data fetching and caching
- **Zustand** - Lightweight state management
- **React Native Reanimated** - Smooth animations
- **MMKV** - High-performance key-value storage
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **i18next** - Internationalization

## 📁 Project Structure

```
src/
├── app/                    # App router screens
│   ├── (auth)/            # Authentication screens
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx
│   │   ├── alerts.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 screen
├── modules/               # Feature modules
│   ├── Auth/
│   └── Common/
├── shared/                # Shared utilities and components
│   ├── api/               # API layer
│   │   ├── auth/          # Authentication API
│   │   │   ├── AuthService.ts
│   │   │   ├── models.ts
│   │   │   └── mutations/
│   │   ├── baseQuery.ts   # Axios configuration
│   │   ├── models/        # API models and query keys
│   │   └── queryClient.ts
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── modals/            # Modal configuration
│   ├── services/          # Business logic services
│   ├── stores/            # State management
│   │   ├── auth/          # Authentication store
│   │   │   ├── store.ts
│   │   │   ├── selectors.ts
│   │   │   └── types.ts
│   │   ├── lib.ts         # Store utilities
│   │   └── models.ts
│   ├── themes/            # Design system and themes
│   ├── translations/      # i18n translations
│   ├── types/             # TypeScript type definitions
│   └── ui/                # Reusable UI components
└── assets/                # Static assets
    ├── fonts/
    ├── images/
    └── bootsplash/
```

## 🔧 Key Features

### Navigation
- **Expo Router** - File-based routing with TypeScript support
- **Tab Navigation** - Bottom tab navigation for main screens
- **Authentication Flow** - Conditional rendering based on auth state
- **Deep Linking** - URL scheme support

### State Management
- **Zustand** - Lightweight state management with Immer integration
- **React Query** - Server state management and caching
- **MMKV** - Persistent storage with custom store utilities
- **Store Selectors** - Auto-generated selectors for optimized re-renders

### UI & Animations
- **React Native Unistyles** - Theming and responsive styles
- **React Native Reanimated** - Smooth 60fps animations
- **Gesture Handler** - Touch gesture support
- **Safe Area** - Proper safe area handling

### Development Experience
- **TypeScript** - Full type safety
- **ESLint** - Code quality enforcement
- **Prettier** - Code formatting
- **Path Aliases** - Clean import statements
- **Hot Reload** - Fast development workflow

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lumitech-co/lumitech-expo-template.git
   cd lumitech-expo-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

### Development

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Run on iOS**
   ```bash
   npm run ios
   ```

3. **Run on Android**
   ```bash
   npm run android
   ```

### Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typescript` - Run TypeScript compiler
- `npm run format` - Format code with Prettier
- `npm run android:clean` - Clean Android build
- `npm run android:apk` - Build Android APK
- `npm run android:bundle` - Build Android bundle

Access in your app:
```typescript
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.API_URL;
```

## 📱 Customization

### Updating App Icon and Splash Screen

1. Replace `assets/images/icon.png` with your app icon
2. Replace `assets/images/splash-icon.png` with your splash screen icon
3. Update `app.json` configuration as needed

### Modifying Theme

Edit theme configuration in `src/shared/themes/`:

```typescript
// src/shared/themes/Colors.ts
export const Colors = {
  primary: '#007AFF',
  secondary: '#5AC8FA',
  // ... your colors
};
```

### Adding New Screens

1. Create new file in `src/app/` directory
2. The file name becomes the route automatically
3. Use TypeScript for type safety

## 🔄 State Management & API Layer

### Store Architecture

The template uses a sophisticated store pattern with MMKV persistence and automatic selectors:

```typescript
// src/shared/stores/auth/store.ts
import { immer } from 'zustand/middleware/immer';
import { createStore } from '../lib';

export const useAuthStore = createStore<UserStore>(
  immer(set => ({
    authentication: { accessToken: '', refreshToken: '' },
    user: { email: null, id: 0 },
    setUser: (user: User) => set(state => { state.user = user; }),
    setTokens: (tokens: Authentication) => set(state => { 
      state.authentication = tokens; 
    }),
  })),
  'AUTH_STORAGE',
  persistStorage,
);
```

### Auto-Generated Selectors

```typescript
// src/shared/stores/auth/selectors.ts
export const useAuthStoreSelectors = createSelectors(useAuthStore);

export const useSelectUserId = () =>
  useAuthStoreSelectors(state => state.user.id);
```

### API Layer with Services

```typescript
// src/shared/api/auth/AuthService.ts
import { baseQuery } from '../baseQuery';

const login = (params: LoginRequest) => {
  return baseQuery.post<LoginResponse>('/auth/login', params);
};

export const AuthService = { login };
```

### React Query Mutations

```typescript
// src/shared/api/auth/mutations/useLogin.ts
export const useLogin = () => {
  const { setTokens, setUser } = useAuthStoreSelectors();

  const { isPending, mutateAsync: onLogin } = useMutation({
    mutationFn: async (params: LoginRequest) => {
      const response = await AuthService.login(params);
      return response?.data;
    },
    onSuccess: data => {
      setTokens(data.authentication);
      setUser(data.user);
    },
  });

  return { isPending, onLogin };
};
```

### Key Features

- **MMKV Persistence** - Automatic state persistence with encryption
- **Immer Integration** - Immutable state updates with mutable syntax
- **Auto Selectors** - Generated selectors for all store properties
- **Global Store Reset** - Reset all stores on logout/401 errors
- **Axios Interceptors** - Automatic token injection and 401 handling

## 📖 Additional Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Unistyles](https://reactnativeunistyles.vercel.app/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/lumitech-co/lumitech-expo-template/issues) page
2. Create a new issue if needed
3. Provide detailed information about your problem

---

Made with ❤️ by [Lumitech](https://github.com/lumitech-co)