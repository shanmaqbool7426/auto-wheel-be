import React from "react";
import Vehicles from "@/modules/blogs/Vehicles";
import { Box } from "@mantine/core";
import { fetchTags } from "@/services/tags";
import { fetchBlogsPageData } from "@/services/blogs";
import PopularTags from "@/modules/blogs/PopularTags";
import FeatureGrid from "@/modules/blogs/FeatureGrid";
import FollowUs from "@/modules/blogs/FollowUs";
import PopularPosts from "@/modules/blogs/PopularPosts";
import Posts from "@/modules/blogs/Posts";
import TopCategory from "@/modules/blogs/TopCategory";
import CategoryPosts from "@/modules/blogs/CategoryPosts";

const BlogModule = async ({ params }) => {
  // Fetch data concurrently
  const [tags, blogsData] = await Promise.all([
    fetchTags(),
    fetchBlogsPageData(params)
  ]);

  const { data } = blogsData || {};
  const isBlogsPage = data?.type === 'blogs';
  const isSingleBlog = data?.type === 'blog';
  const filteredCategories = data?.categories?.filter(category => category.slug !== 'news') || [];

  return (
    <Box component="section" className="blog-page py-5">
      {/* Feature Grid Section */}
      {isBlogsPage && (
        <Box className="container">
          <FeatureGrid items={data?.featurePosts} />
        </Box>
      )}

      {/* Recent Posts Section */}
      <section className="recent-posts my-5 border-bottom pb-5 mb-5 border-box">
        <Box className="row container m-auto">
          <Box className="col-md-8">
            {!isSingleBlog && (
              <Posts
                title={isBlogsPage ? "Recent" : data?.category || data?.tag}
                description={data?.description || ''}
                posts={data?.blogs}
                count={data?.count}
              />
            )}
            {isBlogsPage && (
              <TopCategory category={data?.categories?.find(category => category.slug === 'news')} />
            )}
          </Box>

          {/* Sidebar Section */}
          <Box className="col-md-4">
            <FollowUs />
            <PopularPosts posts={data?.blogs} />
            <PopularTags tags={tags} />
          </Box>
        </Box>

        {/* Additional Categories Section */}
        {isBlogsPage && filteredCategories.map((category, index) => (
          <section className="category-section container mt-5" key={index}>
            <CategoryPosts category={category} />
          </section>
        ))}
      </section>

      {/* Vehicles Section */}
      {isBlogsPage && <Vehicles />}
    </Box>
  );
};

export default BlogModule;
