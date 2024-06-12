import { createPenpal } from '@/app/api/penpals';
import { useMutation, useQueryClient } from 'react-query';

interface MutationContext {
    searchParams?: {
        memberId: number;
        userName: string;
    };
    setCreatingPenpalId?: (id: number | null) => void;
    setCreatingPanpalId?: (id: number | null) => void;
}

const useSendPenpalRequest = () => {
    const queryClient = useQueryClient();

    const { mutate: sendPenpalRequest, isLoading: isCreatingPenpal } =
        useMutation((payload: any) => createPenpal(payload), {
            onSuccess: (res, variables, context: MutationContext | undefined) => {
                const { searchParams, setCreatingPenpalId, setCreatingPanpalId } = context || {};

                if (searchParams) {
                    queryClient.refetchQueries([
                        'penpalSearchData',
                        searchParams.memberId,
                        searchParams.userName,
                    ]);
                } else {
                    queryClient.refetchQueries('penpalSuggestions');
                    queryClient.refetchQueries('MyPenPals');
                }

                if (setCreatingPenpalId) {
                    setCreatingPenpalId(null);
                }

                if (setCreatingPanpalId) {
                    setCreatingPanpalId(null);
                }
            },
            onError: (error) => {
                console.error(error, 'Error =====> log');
            },
        });

    const sendRequest = (payload: any, options = {}) => {
        sendPenpalRequest(payload, options);
    };

    return {
        sendRequest,
        isCreatingPenpal,
    };
};

export default useSendPenpalRequest;
