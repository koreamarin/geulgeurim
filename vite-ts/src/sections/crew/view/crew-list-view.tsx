import orderBy from 'lodash/orderBy';
import { useState, useCallback } from 'react';
import { useRouter } from 'src/routes/hooks';
import { Button, Stack, Typography, Container, Grid } from '@mui/material';
import { paths } from 'src/routes/paths';
import { useDebounce } from 'src/hooks/use-debounce';
import { POST_SORT_OPTIONS } from 'src/_mock';
import { useGetPosts, useSearchPosts } from 'src/api/blog';
import { useSettingsContext } from 'src/components/settings';
import { IPostItem } from 'src/types/blog';

// import PostList from 'src/sections/blog/post-list';
import PostSort from 'src/sections/blog/post-sort';
import PostSearch from 'src/sections/blog/post-search';
import CrewList from '../crew-list';

export default function CrewListView() {
  const settings = useSettingsContext();
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery);
  const { posts, postsLoading } = useGetPosts();
  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);
  const router = useRouter();

  const dataFiltered = applyFilter({
    inputData: posts,
    sortBy,
  });

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  const handleCreatePost = () => {
      router.push(paths.community.crew.write)
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography
        variant="h3"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        크루모집
      </Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >

        <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(title: string) => paths.post.details(title)}
        />

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ my: 3 }}

          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleCreatePost}
            >
              글쓰기
            </Button>
          </Stack>
        </Grid>
      </Grid>


      {/* 게시글들 */}
      <CrewList posts={dataFiltered} loading={postsLoading} />
      {/* <PostList posts={dataFiltered} loading={postsLoading} /> */}
    </Container>
  );
}

// -------------------------
const applyFilter = ({ inputData, sortBy }: { inputData: IPostItem[]; sortBy: string }) => {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(inputData, ['totalViews'], ['desc']);
  }

  return inputData;
};
