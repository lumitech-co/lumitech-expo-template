import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  LoginRequest,
  useAuthStore,
  useSignInMutationAuthService,
} from "model";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export const useLoginModel = () => {
  const { setTokens } = useAuthStore();
  const loginMutation = useSignInMutationAuthService();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const loginRequest: LoginRequest = {
        email: data.email,
        password: data.password,
      };

      const response = await loginMutation.mutateAsync(loginRequest);

      setTokens(response.authentication);

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
  };
};
