import HeroBanner from "@/components/HeroBanner";
import InfoPannel from "@/components/InfoPannel";
import PostList from "@/components/PostList";
import { getPosts } from "@/sanity/lib/posts/getPosts";


export default async function Home({searchParams}: {searchParams: Promise<{tier: string}>}) {

  const {tier} = await searchParams;

  const posts = await getPosts(tier)

  return (
    <div className=" ">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Info pannel */}
      <div className="-mt-30">
        <InfoPannel />
      </div>

      {/* line */}
      <hr />

      {/* Postss */}
      <PostList posts = {posts} />
    </div>
  );
}
