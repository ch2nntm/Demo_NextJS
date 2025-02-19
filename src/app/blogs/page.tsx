"use client";
import useSWR from "swr";
import AppTable from "../component/app.table";

const BlogsPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR("/api/blogs", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) {
    return <div>loading....</div>;
  }

  return (
    <div className="mt-3">
      <AppTable
        blogs={data?.sort((a, b) => b.id - a.id) ?? []}
      ></AppTable>
    </div>
  );
};

export default BlogsPage;
