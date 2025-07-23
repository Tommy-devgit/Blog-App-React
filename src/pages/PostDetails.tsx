import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  return <h2>Post ID: {id}</h2>;
}
