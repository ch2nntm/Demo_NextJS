"use client";

import Link from "next/link";
import { Card } from "react-bootstrap";
import useSWR, { Fetcher } from "swr";
import { PageProps } from "next";

interface IBlog {
  id: string;
  title: string;
  author: string;
  content: string;
}

const ViewDetail = ({ params }: PageProps<{ id: string }>) => {
  const fetcher: Fetcher<IBlog, string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    `/api/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Something went wrong! Please try again later.</div>;
  }

  if (!data) {
    return <div>No blog details found!</div>;
  }

  return (
    <div>
      <Link href="/blogs">Go back</Link>
      <Card className="text-center">
        <Card.Header>Title: {data.title}</Card.Header>
        <Card.Body>
          <Card.Text>{data.content}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Author: {data.author}</Card.Footer>
      </Card>
    </div>
  );
};

export default ViewDetail;
