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
          queryClient.refetchQueries([
            'penpalSearchData',
            searchParams.memberId,
            searchParams.userName,
          ]);
        } else {
          queryClient.refetchQueries('penpalSuggestions');
          queryClient.refetchQueries('MyPenPals');
          queryClient.refetchQueries('getNotifications');
        }
      },
      onError: (error) => {
        console.error('Error =====>', error);
      },
    });

  const { mutate: removePenpalRequest, isLoading: isDeletingPenpal } =
    useMutation((id: number) => deletePenpal(id), {
      onSuccess: () => {
        queryClient.refetchQueries('MyPenPals');
      },
      onError: (error) => {
        console.log('Error deleting penpal', error);
      },
    });

  const sendRequest = (payload: any, options = {}) => {
    sendPenpalRequest(payload, options);
  };

  const deleteRequest = (id: number, options = {}) => {
    removePenpalRequest(id, options);
  };

  return {
    sendRequest,
    isCreatingPenpal,
    deleteRequest,
    isDeletingPenpal,
  };
};

export default useSendPenpalRequest;
