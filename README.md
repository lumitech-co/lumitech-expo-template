<div align="center">
 <img width="500" src="https://github.com/user-attachments/assets/5083ad51-e604-4e2f-949a-e29a2be4bd73" />
</div>

# Lumitech Expo React Native Template 🌌

A modern React Native template built with Expo, implementing **MVVM (Model-View-ViewModel)** architecture for scalable mobile applications with best practices and powerful libraries.

## 🏗️ Architecture

This template implements a **MVVM (Model-View-ViewModel)** architecture pattern with Clean Architecture principles:

### MVVM Components

- **Model** (`src/model/`) - Data layer with business logic, API services, and state management
- **View** (`src/app/`) - UI layer with screens and components  
- **ViewModel** (`src/view-model/`) - Business logic layer that connects Views to Models
- **Services** (`src/services/`) - Shared services and utilities
- **Widgets** (`src/shared/widgets/`) - Reusable UI components for specific features

### MVVM Benefits

- **Separation of Concerns** - Clear boundaries between UI, business logic, and data
- **Testability** - Isolated business logic in ViewModels
- **Reusability** - ViewModels can be shared across multiple Views
- **Maintainability** - Changes in one layer don't affect others
- **Type Safety** - Full TypeScript support with proper interfaces

## 🚀 Core Technologies

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tools
- **Expo Router** - File-based routing system with protected routes
- **TypeScript** - Type safety and better development experience
- **React Native Unistyles** - Theming and styling system
- **TanStack Query** - Server state management and caching
- **Legend State** - High-performance reactive state management with MMKV persistence
- **React Native Reanimated** - Smooth animations
- **React Hook Form** - Form management with Zod validation
- **i18next** - Internationalization support
- **React Native Modalfy** - Global modal management
- **React Native SVG** - SVG icon support with react-native-svg-transformer

## 📁 Project Structure

```
src/
├── app/                    # Views Layer (MVVM)
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Tab navigation screens
│   ├── _layout.tsx        # Root layout
│   └── +not-found.tsx     # 404 screen
├── model/                 # Model Layer (MVVM)
│   ├── auth/              # Authentication domain
│   │   ├── api/           # API services
│   │   ├── store/         # State management
│   │   └── auth.types.ts  # Domain types
│   └── user/              # User domain
│       ├── api/
│       ├── store/
│       └── user.types.ts
├── view-model/            # ViewModel Layer (MVVM)
│   ├── auth/              # Authentication view-model
│   │   ├── login/         # Login business logic
│   │   └── register/      # Registration business logic
│   └── user/              # User view-model
├── services/              # Service Layer
│   ├── ApiService/        # API service layer
│   ├── ModalService/      # Modal management
│   ├── ToastService/      # Toast notifications
│   └── RouteService/      # Navigation utilities
├── shared/                # Shared Layer
│   ├── api/               # Shared API utilities
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── providers/         # React providers
│   ├── services/          # Shared services
│   ├── stores/            # Shared state management
│   ├── themes/            # Design system
│   ├── translations/      # i18n translations
│   ├── types/             # Global TypeScript types
│   ├── ui/                # Base UI components
│   └── widgets/           # Feature-specific components
│       └── modals/        # Global modals
└── assets/                # Static assets
```

## 🔧 MVVM Implementation

### Model Layer

The Model layer contains domain-specific business logic, data access, and state management:

```typescript
// src/model/auth/store/auth.store.ts
import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

export const authStore = observable<AuthState>(initialState);

syncObservable(authStore, {
  persist: { name: "AUTH", plugin: ObservablePersistMMKV },
});

export const useAuthStore = () => ({
  setToken: (token: Authentication) => authStore.authentication.set(token),
  setUser: (user: User) => authStore.user.set(user),
  resetUserStorePersist: () => authStore.set(initialState),
});

// src/model/auth/api/auth.mutations.ts
export const useSignInMutation = () => {
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: AuthApi.login,
  });
};
```

### ViewModel Layer

ViewModels contain presentation logic and connect Views to Models:

```typescript
// src/view-model/auth/login/useLoginModel.ts
export const useLoginModel = () => {
  const { setTokens } = useAuthStore();
  const loginMutation = useSignInMutationAuthService();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    const response = await loginMutation.mutateAsync(data);
    setTokens(response.authentication);
    return response;
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
```

### View Layer

Views are pure UI components that consume ViewModels:

```typescript
// src/app/(auth)/login.tsx
import { useLoginModel } from 'view-model/auth';

export default function LoginScreen() {
  const { form, onSubmit, isLoading, error } = useLoginModel();
  
  return (
    <View>
      <Controller
        control={form.control}
        name="email"
        render={({ field }) => (
          <TextInput {...field} placeholder="Email" />
        )}
      />
      <Button onPress={onSubmit} loading={isLoading}>
        Login
      </Button>
    </View>
  );
}
```

## 🎯 Path Aliases

The template includes comprehensive path aliases for clean imports:

```typescript
// Available aliases:
import { useAuthStore } from 'models/auth';           // src/model/*
import { useLoginModel } from 'view-model/auth';      // src/view-model/*
import { LoginModal } from 'widgets/modals';          // src/shared/widgets/*
import { baseQuery } from 'api';                      // src/shared/api/*
import { Button } from 'ui';                          // src/shared/ui/*
import { ToastService } from 'services';              // src/shared/services/*
```

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

## 🔐 Environment Configuration

Environment variables are handled using Expo's built-in environment variable system. Create a `.env` file in your project root:

```env
EXPO_PUBLIC_API_URL=https://api.example.com
```

Access environment variables anywhere in your app:
```typescript
import { Config } from 'lib';

const apiUrl = Config.API_URL;
```

## 🏗️ State Management Architecture

### Store Architecture

The template uses Legend State with MMKV persistence for high-performance reactive state:

```typescript
import { observable } from "@legendapp/state";
import { use$ } from "@legendapp/state/react";

// Create observable store
export const authStore = observable<AuthState>(initialState);

// Reactive selectors with automatic optimization
export const useSelectUser = () => use$(authStore.user);
export const useSelectToken = () => authStore.authentication.accessToken.get();
```

### Key Features

- **MMKV Persistence** - Automatic state persistence with encryption support
- **Fine-grained Reactivity** - Only re-renders components when accessed values change
- **Direct Mutations** - Update state directly without reducers or actions
- **Global Store Reset** - Reset all stores on logout/401 errors
- **Automatic Token Refresh** - Axios interceptors with token refresh on 401

## 🎨 UI & Theming

### Design System

```typescript
// src/shared/themes/Colors.ts
export const Colors = {
  primary: '#007AFF',
  secondary: '#5AC8FA',
  // ... your colors
};

// src/shared/themes/Fonts.ts
export const Fonts = {
  regular: 'Inter-Regular',
  medium: 'Inter-Medium',
  // ... your fonts
};
```

### Component Architecture

- **Base Components** (`src/shared/ui/`) - Primitive UI components
- **Widgets** (`src/shared/widgets/`) - Feature-specific composite components
- **Modals** (`src/shared/widgets/modals/`) - Global modal system
- **SVG Icons** (`src/shared/ui/icons/`) - SVG icons as React components

### SVG Icons

Icons are stored as SVG files and transformed into React components via `react-native-svg-transformer`:

```typescript
import { BellIcon, UserIcon } from "ui";

// Direct usage
<BellIcon width={24} height={24} color="#000" />

// With SvgIcon component (theme-aware)
import { SvgIcon, BellIcon } from "ui";
<SvgIcon icon={BellIcon} size={24} color="black_950" />
```

## 🔐 Protected Routes

The template uses Expo Router's `redirect` prop for authentication-based routing:

```typescript
// src/app/_layout.tsx
export default function RootLayout() {
  const token = useSelectToken();
  const isLoggedIn = !!token;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" redirect={isLoggedIn} />
      <Stack.Screen name="(tabs)" redirect={!isLoggedIn} />
    </Stack>
  );
}
```

For three-stack routing (auth + onboarding + tabs):

```typescript
const isLoggedIn = !!token;
const showOnboarding = isLoggedIn && !isOnboarded;
const showTabs = isLoggedIn && isOnboarded;

<Stack screenOptions={{ headerShown: false }}>
  <Stack.Screen name="(auth)" redirect={isLoggedIn} />
  <Stack.Screen name="(onboarding)" redirect={!showOnboarding} />
  <Stack.Screen name="(tabs)" redirect={!showTabs} />
</Stack>
```

**Important:** All screens must use `export default` for Expo Router to work correctly.

## 📱 Customization

### Adding New Features

1. **Create Model** - Add domain logic in `src/model/[domain]/`
2. **Create ViewModel** - Add presentation logic in `src/view-model/[domain]/`
3. **Create View** - Add UI in `src/app/[route].tsx`
4. **Update Types** - Add TypeScript interfaces

### Updating App Icon and Splash Screen

1. Replace `assets/images/icon.png` with your app icon
2. Replace `assets/images/splash-icon.png` with your splash screen icon
3. Update `app.json` configuration as needed

## 🔄 API Integration

### Service Layer

```typescript
// src/model/auth/api/auth.api.ts
export const AuthService = {
  login: async (params: LoginRequest) => {
    const response = await baseQuery.post<LoginResponse>('/auth/login', params);
    return response?.data;
  },
  register: async (params: RegisterRequest) => {
    const response = await baseQuery.post<RegisterResponse>('/auth/register', params);
    return response?.data;
  },
};
```

### Mutation Integration

```typescript
// src/model/auth/api/auth.mutations.ts
export const useSignInMutationAuthService = () => {
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: AuthService.login,
  });
};
```

## 📖 Additional Documentation

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Unistyles](https://reactnativeunistyles.vercel.app/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Legend State Documentation](https://legendapp.com/open-source/state/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following MVVM principles
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
