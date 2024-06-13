import { createPenpal } from '@/app/api/penpals';
import { useMutation, useQueryClient } from 'react-query';

interface SearchParams {
    memberId: number;
    userName: string;
}
interface MutationContext {
    searchParams?: SearchParams;
    setCreatingPenpalId?: (id: number | null) => void;
}

const useSendPenpalRequest = () => {
    const queryClient = useQueryClient();

    const { mutate: sendPenpalRequest, isLoading: isCreatingPenpal } =
        useMutation((payload: any) => createPenpal(payload), {
            onSuccess: (res, context: MutationContext | undefined) => {
                const { searchParams, setCreatingPenpalId } = context || {};

                if (searchParams) {
                    alert('searchParams')
                    console.log(searchParams, 'searchParamssearchParamssearchParams')
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
            },
            onError: (error) => {
                console.error('Error =====>', error);
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
