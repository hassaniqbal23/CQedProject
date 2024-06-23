import React, { useState, useMemo } from 'react';
import { createPenpal, getSuggestions } from '@/app/api/penpals';
import {
  PenpalshipCard,
  PenpalshipPublishStoryCard,
  PenpalshipStoriesCard,
} from '@/components/Penpalship';
import { PublishStoryViewDialog } from '@/components/common/PublishStoryViewDialog/PublishStoryViewDialog';
import { Typography } from '@/components/common/Typography/Typography';
import { PublishStoryDialog } from '@/components/ui/PublishStoryDialog/PublishStoryDialog';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
import Pagination from '@/components/common/pagination/pagination';
import SkeletonCard from '@/components/common/SkeletonCard/SkeletonCard';
import { useGlobalState } from '@/app/globalContext/globalContext';

export const PenPalCommunity = () => {
  const queryCLient = useQueryClient();
  const { myPenpals, userInformation } = useGlobalState();
  const route = useRouter();
  const [viewUserStoryId, setViewUserStoryId] = useState<number | null>(null);
  const [creatingPanpalId, setCreatingPanpalId] = useState<number | null>(null);
  const [openStoryModal, setOpenStroyModal] = useState<boolean>(false);
  const [viewStoryModal, setViewStoryModal] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [paginationPenpals, setPaginationPenpals] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 12,
  });

  const { page, limit } = paginationPenpals;

  const { mutate: sendPanpalRequest, isLoading: isCreatingPanpal } =
    useMutation((id: number) => createPenpal({ receiverId: id }), {
      onSuccess: (res) => {
        queryCLient.refetchQueries('penpalSuggestions');
        queryCLient.refetchQueries('MyPenPals');
        setCreatingPanpalId(null);
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

  const IsStoryUserMyFriend = useMemo(() => {
    const getUserStoryUserId = getUserStory?.userId;
    const MyId = userInformation.id;

    if (getUserStoryUserId && MyId) {
      const getPenpal = myPenpals.find((c) => {
        return (
          (c.senderId == MyId && c.receiverId == getUserStoryUserId) ||
          (c.senderId == getUserStoryUserId && c.receiverId == MyId)
        );
      });

      if (getPenpal) return true;
    }
    return false;
  }, [getUserStory, myPenpals]);

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
    ['penpalSuggestions', page, limit],
    () => getSuggestions(page, limit),
    {
      enabled: true,
      onSuccess: (res) => {
        setTotalCount(res?.data?.total_count);
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  const suggestions = useMemo(() => {
    if (suggestionsResponse) {
      return suggestionsResponse?.data?.data?.map((c: any) => {
        return {
          ...c,
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
            isFriend={IsStoryUserMyFriend}
            open={viewStoryModal}
            loading={{ isCreatingPanpal, isGetingUserStory }}
            onClose={() => {
              setViewUserStoryId(null);
              setViewStoryModal(false);
            }}
            onAddFriend={() => {
              if (getUserStory && typeof getUserStory?.userId === 'number') {
                sendPanpalRequest(getUserStory?.userId);
              }
            }}
            userInfo={{
              username: getUserStory?.User?.name,
              userId: getUserStory?.userId,
              location: getUserStory?.User?.profile?.country,
              imageUrl: getUserStory?.User?.attachment?.file_path,
            }}
          />
          {AllUserStories?.length === 0 && !isGetingUserStories ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 min-h-96">
              <PenpalshipPublishStoryCard
                title={'Publish your story'}
                iconOnClick={() => {
                  setOpenStroyModal(!openStoryModal);
                }}
              />
            </div>
          ) : isGetingUserStories ? (
            <div className="flex min-h-96">
              <div className="w-96">
                <PenpalshipPublishStoryCard
                  title={'Publish your story'}
                  iconOnClick={() => {
                    setOpenStroyModal(!openStoryModal);
                  }}
                />
              </div>
              <div className="hidden lg:block ml-6 w-full">
                <SkeletonCard noOfCards={3} />
              </div>
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
              id={item?.id}
              imgPath={item?.attachment?.file_path}
              title={item?.profile?.full_name || item.email}
              mutualFriends={'5 mutual friends'}
              buttonOnClick={() => {
                sendPanpalRequest(item.id);
                setCreatingPanpalId(item.id);
              }}
              buttonLoading={creatingPanpalId === item.id && isCreatingPanpal}
              buttonText="Connect"
              description={item?.profile?.bio}
              countryName={item?.profile?.country}
              studentAge={item?.profile?.age}
              showIcons={false}
            />
          ))}
        </div>
        {suggestions?.length > 0 && !isLoading && (
          <div className="flex justify-end py-5">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(totalCount / limit)}
              pageSize={limit}
              onPageChange={(value: number) => {
                setPaginationPenpals((prev) => ({
                  ...prev,
                  page: value,
                }));
              }}
              totalCount={totalCount}
              setPageSize={(pageSize) => console.log(pageSize, 'pagesize')}
            />
          </div>
        )}
        {suggestions?.length === 0 && isLoading === false ? (
          <div> No suggestions found, Please come back later </div>
        ) : (
          <></>
        )}
        {isLoading ? <SkeletonCard /> : <></>}
      </div>
    </>
  );
};
