import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ServiceType } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export interface SubmitInquiryParams {
  name: string;
  phoneNumber: string;
  email: string;
  serviceType: ServiceType;
  message: string;
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SubmitInquiryParams) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitInquiry(
        params.name,
        params.phoneNumber,
        params.email,
        params.serviceType,
        params.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
