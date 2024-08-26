import BlogModule from "@/modules/blogs"; 


export default function Blog({params,searchParams}) {
  return (
    <>
      <BlogModule params={params} searchParams={searchParams}/>
    </>
  );
}
