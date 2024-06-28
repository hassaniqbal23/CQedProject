import { createPenpal, deletePenpal } from '@/app/api/penpals';
import { useMutation, useQueryClient } from 'react-query';

interface SearchParams {
  memberId: number;
  userName: string;
}

interface MutationContext {
  searchParams?: SearchParams;
}

const useSendPenpalRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: sendPenpalRequest, isLoading: isCreatingPenpal } =
    useMutation((payload: any) => createPenpal(payload), {
      onSuccess: (res, context: MutationContext | undefined) => {
        const { searchParams } = context || {};
        if (searchParams) {
          queryClient.refetchQueries(['penpalSearchData', searchParams]);
        } else {
          queryClient.refetchQueries('penpalSuggestions');
          queryClient.refetchQueries('MyPenPals');
          queryClient.refetchQueries('getNotifications');
          queryClient.refetchQueries('getProfile');
        }
      },
      onError: (error) => {
        console.error('Error =====>', error);
      },
    });

  const { mutate: removePenpalRequest, isLoading: isDeletingPenpal } =
    useMutation((payload: any) => deletePenpal(Number(payload.user_id)), {
      onSuccess: (res, context: MutationContext | undefined) => {
        const { searchParams } = context || {};
        if (searchParams) {
          queryClient.refetchQueries(['penpalSearchData', searchParams]);
        }
        queryClient.refetchQueries('MyPenPals');
        queryClient.refetchQueries('getProfile');
      },
      onError: (error) => {
        console.log('Error deleting penpal', error);
      },
    });

  const sendRequest = (payload: any, options = {}) => {
    sendPenpalRequest(payload, options);
  };

  const deleteRequest = (payload: any, options = {}) => {
    removePenpalRequest(payload, options);
  };

  return {
    sendRequest,
    isCreatingPenpal,
    deleteRequest,
    isDeletingPenpal,
  };
};

export default useSendPenpalRequest;
