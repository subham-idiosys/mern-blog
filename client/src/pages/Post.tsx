import type { RootState } from '@/store';
import { ArrowLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NotFound = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The post you&apos;re looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button
              variant="outline"
              className="bg-white text-black cursor-pointer dark:text-white dark:opacity-85 dark:hover:opacity-100"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </Button>
          </Link>
        </div>
      </div>
    );
  }

const Post = () => {
    const { id } = useParams();
  const { posts } = useSelector((state: RootState) => state.posts);
  const post = posts.filter((post) => post._id === id);

  if (post.length === 0) {
    return <NotFound />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/">
          <Button
            variant="outline"
            className="mb-6 bg-white text-black cursor-pointer dark:text-white dark:opacity-85 dark:hover:opacity-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{post[0].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed">{post[0].body}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Post