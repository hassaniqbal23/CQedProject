import { createPenpal, getSuggestions } from '@/app/api/penpals';
import {
  PenpalshipCard,
  PenpalshipPublishStoryCard,
  PenpalshipStoriesCard,
} from '@/components/Penpalship';
import { Typography } from '@/components/common/Typography/Typography';
import { PublishStoryDialog } from '@/components/ui/PublishStoryDialog/PublishStoryDialog';
import Loading from '@/components/ui/button/loading';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const PenPalCommunity = () => {
  const queryCLient = useQueryClient();
  const [creatingPanpalId, setCreatingPanpalId] = React.useState<number | null>(
    null
  );

  const { mutate: sendPanpalRequest, isLoading: isCreatingPanpal } =
    useMutation((id) => createPenpal({ receiverId: id }), {
      onSuccess: (res) => {
        queryCLient.refetchQueries('penpalSuggestions');
        setCreatingPanpalId(null);
      },
      onError: (error) => {
        console.error(error, 'Error =====> log');
      },
    });

  const { data: suggestionsResponse, isLoading } = useQuery(
    ['penpalSuggestions'],
    () => getSuggestions(),
    {
      enabled: true,
      onSuccess: (res) => {},
      onError(err) {
        console.log(err);
      },
    }
  );

  const suggestions = React.useMemo(() => {
    if (suggestionsResponse) {
      return suggestionsResponse?.data?.data?.map((c: any) => {
        return {
          ...c,
          profile: c.profile[0],
        };
      });
    }
    return [];
  }, [suggestionsResponse]);

  return (
    <>
      <div className="mb-8">
        <Typography variant={'h3'} weight={'bold'} className="mb-4">
          Stories
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <PublishStoryDialog
            onPublish={(story) => {
              alert(story);
            }}
          >
            <div>
              <PenpalshipPublishStoryCard
                title={'Publish your story'}
                iconOnClick={() => {
                  console.log('upload your image');
                }}
              />
            </div>
          </PublishStoryDialog>
          {[1, 2, 3].map((item, index) => (
            <PenpalshipStoriesCard
              key={index}
              imgPath={'/Emily.png'}
              title={'Emily - 12 - UK'}
              link={'Read more'}
              description={
                'Hi I am Lily, an 8-year-old form United States with a passion for drawing and a heart full love'
              }
            />
          ))}
        </div>
      </div>
      <div>
        <Typography variant={'h3'} weight={'bold'} className="mb-4">
          Newly Joined
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {suggestions.map((item: any, index: number) => (
            <PenpalshipCard
              key={index}
              imgPath={item?.attachment?.file_path}
              title={item?.profile?.fullname || item.email}
              mutualFriends={'5 mutual friends'}
              buttonOnClick={() => {
                sendPanpalRequest(item.id);
                setCreatingPanpalId(item.id);
              }}
              buttonLoading={creatingPanpalId === item.id && isCreatingPanpal}
              buttonText="Connect"
              description={JSON.parse(item?.profile?.meta || '{}').bio}
              countryFlag={'/country-flags/svg/pk.svg'}
              countryName={'Pakistan'}
              studentAge={'8 years old'}
            />
          ))}
        </div>
        {suggestions.length === 0 && isLoading === false ? (
          <div> No suggestions found, Please come back later </div>
        ) : (
          <></>
        )}
        {isLoading ? <Loading></Loading> : <></>}
      </div>
    </>
  );
};
