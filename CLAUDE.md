# Lumitech Expo Template - Development Guidelines

## Architecture: MVVM with Clean Architecture

### Layer Structure
- **Model** (`src/model/`) - Domain logic, API, state
- **ViewModel** (`src/view-model/`) - Presentation logic hooks
- **View** (`src/app/`) - UI screens (Expo Router)
- **Shared** (`src/shared/`) - Cross-cutting concerns

### Import Rules (STRICTLY ENFORCED)
- Views → view-model, widgets, ui, shared
- ViewModels → models, shared (NOT other view-models)
- Models → shared, api (NOT presentation layers)
- Widgets → ui, shared (NOT business logic)
- UI → shared only

### Path Aliases (REQUIRED - no relative imports)
- `model/*` for src/model/*
- `view-model/*` for src/view-model/*
- `api` for src/shared/api
- `ui` for src/shared/ui
- `widgets` for src/shared/widgets
- `services` for src/shared/services
- `hooks` for src/shared/hooks
- `lib` for src/shared/lib
- `themes` for src/shared/themes

## File Structure Patterns

### New Feature Structure
```
src/model/[domain]/
├── api/
│   ├── [domain].api.ts      # Axios calls
│   ├── [domain].queries.ts  # useQuery hooks
│   ├── [domain].mutations.ts # useMutation hooks
│   ├── queryKeys.ts         # Query key constants
│   └── index.ts
├── store/
│   ├── [domain].store.ts    # Legend State observable
│   ├── [domain].selectors.ts # Selector hooks
│   └── index.ts
├── [domain].types.ts        # Domain interfaces
└── index.ts

src/view-model/[domain]/
├── [feature]/
│   ├── use[Feature]Model.ts # ViewModel hook
│   └── index.ts
└── index.ts
```

### Component Structure
```
src/shared/ui/[Component]/
├── [Component].tsx
└── index.ts

src/shared/widgets/[feature]/
├── [Widget].tsx
└── index.ts
```

## Code Patterns

### Model Layer - Store (Legend State)
```typescript
import { observable } from "@legendapp/state";
import { syncObservable } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

const initialState: AuthState = {
  authentication: { accessToken: "", refreshToken: "" },
  user: { email: "", id: "", firstName: "" }
};

export const authStore = observable(initialState);

syncObservable(authStore, {
  persist: { name: "AUTH", plugin: ObservablePersistMMKV }
});

export const useAuthStore = () => ({
  setToken: (token: Authentication) => authStore.authentication.set(token),
  setUser: (user: User) => authStore.user.set(user),
  resetUserStorePersist: () => authStore.set(initialState)
});
```

### Model Layer - Selectors
```typescript
import { use$ } from "@legendapp/state/react";

export const useSelectToken = () => authStore.authentication.accessToken.get();
export const useSelectUser = () => use$(authStore.user);
```

### Model Layer - API
```typescript
import { baseQuery } from "api";

export const AuthApi = {
  login: async (params: LoginRequest) => {
    const response = await baseQuery.post<LoginResponse>("/auth/login", params);
    return response?.data;
  }
};
```

### Model Layer - Mutations/Queries
```typescript
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSignInMutation = () =>
  useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: AuthApi.login
  });

export const useHealthCheck = () =>
  useQuery<LoginResponse, AxiosError>({
    queryFn: AuthApi.ping,
    queryKey: QUERY_KEYS.HEALTHCHECK
  });
```

### ViewModel Layer
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type LoginForm = z.infer<typeof loginSchema>;

export const useLoginModel = () => {
  const { setToken } = useAuthStore();
  const loginMutation = useSignInMutation();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data: LoginForm) => {
    const response = await loginMutation.mutateAsync(data);
    setToken(response.authentication);
    return response;
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess
  };
};
```

### View Layer
```typescript
import { useLoginModel } from "view-model/auth";
import { Box, Text } from "ui";

export default function LoginScreen() {
  const { form, onSubmit, isLoading } = useLoginModel();

  return (
    <Box flex={1} paddingHorizontal={16}>
      {/* UI using form methods */}
    </Box>
  );
}
```

## UI Components

### Box Component (Layout)
```typescript
<Box
  flex={1}
  flexDirection="row"
  justifyContent="center"
  alignItems="center"
  paddingHorizontal={16}
  backgroundColor="white"
/>
```

### Text Component (Typography)
```typescript
<Text
  fontSize="xl"
  fontFamily="Bold"
  color="black_950"
>
  Content
</Text>
```

### Theme Values
Check `src/shared/themes/` for available colors, font sizes, and fonts.

## Services

### ToastService
```typescript
import { ToastService } from "services";

ToastService.onSuccess({ title: "Success!", description: "Optional" });
ToastService.onDanger({ title: "Error occurred" });
ToastService.onWarning({ title: "Warning" });
ToastService.onHide();
```

### ModalService
```typescript
import { ModalService } from "services";

ModalService.open("UPDATE_MODAL", { title: "Title", message: "Message" });
ModalService.close("UPDATE_MODAL");
ModalService.closeAllModals();
```

### RouteService (Navigation)
```typescript
import { RouteService } from "services";

RouteService.navigate("ROUTE_NAME");
RouteService.replace("ROUTE_NAME");
RouteService.goBack();
RouteService.reset("ROUTE_NAME");
```

Check `src/shared/services/RouteService/models/Routes.ts` for available routes.

### Usage in Components
```typescript
import { useTranslation } from "react-i18next";

const { t } = useTranslation();
<Text>{t("screens.alerts")}</Text>
```

### Translation File Location
`src/shared/translations/en.json`

## SVG Icons

### Icon Location
SVG icons are stored in `src/shared/ui/icons/` and exported from `ui`.

### Using Icons Directly
```typescript
import { BellIcon, UserIcon } from "ui";

<BellIcon width={24} height={24} color="#000" />
```

### Using SvgIcon Component (with theme colors)
```typescript
import { SvgIcon, BellIcon } from "ui";

<SvgIcon icon={BellIcon} size={24} color="black_950" />
```

### Adding New Icons
1. Add SVG file to `src/shared/ui/icons/`
2. Export from `src/shared/ui/icons/index.ts`

## Routing & Authentication

### Protected Routes with Redirect
Use the `redirect` prop on `Stack.Screen` to handle auth-based routing:

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

### Three-Stack Example (auth + onboarding + tabs)
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

### Screen Export Rule
All screens in `src/app/` MUST use `export default`. Named exports will not work with Expo Router.

## Naming Conventions

- Components: PascalCase (AuthHeader, LoginScreen)
- Hooks: camelCase with "use" prefix (useLoginModel, useSelectToken)
- Files: Descriptive names matching export (.tsx for components, .ts for logic)
- Domains: lowercase (auth, user)
- Constants: UPPER_SNAKE_CASE (QUERY_KEYS, MODAL_NAMES)
- Types/Interfaces: PascalCase (LoginRequest, AuthState)

## ESLint Rules to Follow

- Always use curly braces for conditionals
- Use function expressions (const fn = () => {})
- Avoid short variable names (e, cb, i, err, el are forbidden)
- Async functions must use await
- Add blank lines between code blocks
- No console.log in production code
- Prefer positive conditions (avoid negated conditions)

## Git Commits

Use Conventional Commits format:
- feat: new feature
- fix: bug fix
- chore: maintenance
- docs: documentation
- refactor: code refactoring
- style: formatting
- test: adding tests

## Pre-commit Checks
- ESLint (`npm run lint`)
- TypeScript (`npm run typescript`)

## Commands
- `npm start` - Start Expo dev server
- `npm run ios` - Run on iOS
- `npm run android` - Run on Android
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typescript` - Type check
- `npm run format` - Format with Prettier
