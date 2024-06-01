import { createPenpal, getSuggestions } from '@/app/api/penpals';
import {
  PenpalshipCard,
  PenpalshipPublishStoryCard,
  PenpalshipStoriesCard,
} from '@/components/Penpalship';
import { PublishStoryViewDialog } from '@/components/common/PublishStoryViewDialog/PublishStoryViewDialog';
import { Typography } from '@/components/common/Typography/Typography';
import { PublishStoryDialog } from '@/components/ui/PublishStoryDialog/PublishStoryDialog';
import Loading from '@/components/ui/button/loading';
import React, { useState } from 'react';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useRouter } from 'next/navigation';
import {
  UserCreateStories,
  getAllUserStories,
  getUserStoriesById,
} from '@/app/api/users';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { settings } from '@/app/utils/sliderSettings';

export const PenPalCommunity = () => {
  const queryCLient = useQueryClient();
  const route = useRouter();
  const [viewUserStoryId, setViewUserStoryId] = useState<number | null>(null);
  const [creatingPanpalId, setCreatingPanpalId] = useState<number | null>(null);
  const [openStoryModal, setOpenStroyModal] = useState<boolean>(false);
  const [viewStoryModal, setViewStoryModal] = useState<boolean>(false);

  const { mutate: sendPanpalRequest, isLoading: isCreatingPanpal } =
    useMutation((id: number) => createPenpal({ receiverId: id }), {
      onSuccess: (res) => {
        queryCLient.refetchQueries('penpalSuggestions');
        queryCLient.refetchQueries('MyPenPals');
        setCreatingPanpalId(null);
        setViewStoryModal(false);
        setViewUserStoryId(null);
      },
      onError: (error) => {
        console.error(error, 'Error =====> log');
      },
    });

  const { mutate: createUserStories, isLoading: isCreatingStories } =
    useMutation((story: string) => UserCreateStories({ story: story }), {
      onSuccess: (res) => {
        queryCLient.refetchQueries('getAllUserStories');
        setOpenStroyModal(false);
      },
      onError: (error) => {
        console.error(error, 'Error =====> log');
      },
    });

  const { data: getUserStory, isLoading: isGetingUserStory } = useQuery(
    ['getUserStoriesById', viewUserStoryId],
    (viewUserStoryId: any) =>
      getUserStoriesById(Number(viewUserStoryId.queryKey[1])).then((res) => {
        return res.data.data;
      }),
    {
      enabled: typeof viewUserStoryId === 'number' ? true : false,
      onSuccess: (res) => {},
      onError(err) {
        console.log(err);
      },
    }
  );

  const { data: AllUserStories, isLoading: isGetingUserStories } = useQuery(
    ['getAllUserStories'],
    () =>
      getAllUserStories().then((res) => {
        return res.data.data;
      }),
    {
      enabled: true,
      onSuccess: (res) => {},
      onError(err) {
        console.log(err);
      },
    }
  );

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
        <Typography variant={'h3'} weight={'semibold'} className="mb-4">
          Stories
        </Typography>
        <div>
          <PublishStoryDialog
            loading={isCreatingStories}
            open={openStoryModal}
            onClose={() => {
              setOpenStroyModal(false);
            }}
            onOpenChange={() => {
              setOpenStroyModal(false);
            }}
            onPublish={(story) => {
              createUserStories(story);
            }}
          />

          <PublishStoryViewDialog
            initialValue={getUserStory?.story}
            open={viewStoryModal}
            loading={isCreatingPanpal}
            onClose={() => {
              setViewUserStoryId(null);
              setViewStoryModal(false);
            }}
            onReply={() => {
              setViewUserStoryId(null);
              route.push('/students/chats');
            }}
            onAddFriend={() => {
              if (typeof viewUserStoryId === 'number') {
                sendPanpalRequest(viewUserStoryId);
              }
            }}
            userInfo={{
              username: getUserStory?.User?.name,
              userId: getUserStory?.userId,
              location: {
                name: 'Pakistan',
                flag: '/assets/flags/pakistanFlagLogo.svg',
              },
              imageUrl: getUserStory?.User?.attachment?.file_path,
            }}
          />
          {AllUserStories?.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 min-h-96">
              <PenpalshipPublishStoryCard
                title={'Publish your story'}
                iconOnClick={() => {
                  setOpenStroyModal(!openStoryModal);
                }}
              />
            </div>
          ) : (
            <Slider {...settings}>
              <div className="pr-0 md:pr-6">
                <PenpalshipPublishStoryCard
                  title={'Publish your story'}
                  iconOnClick={() => {
                    setOpenStroyModal(!openStoryModal);
                  }}
                />
              </div>
              {AllUserStories?.map((item: any, index: number) => (
                <div key={index} className="px-3">
                  <PenpalshipStoriesCard
                    imgPath={item?.User?.attachment?.file_path}
                    title={item?.User?.profile[0]?.fullname}
                    link={'Read more'}
                    onClickReadMore={() => {
                      setViewUserStoryId(item?.id);
                      setViewStoryModal(!viewStoryModal);
                    }}
                    description={item.story}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <div>
        <Typography variant={'h3'} weight={'semibold'} className="mb-4">
          Newly Joined
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {suggestions?.map((item: any, index: number) => (
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
