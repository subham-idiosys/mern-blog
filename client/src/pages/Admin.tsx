import { useEffect } from 'react'
import { fetchAdminPosts } from '@/services/api';
import type { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreatePost from '@/components/core/admin/CreatePost';
import AdminPostsList from '@/components/core/admin/AdminPostsList';

const Admin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, loading, error } = useSelector(
      (state: RootState) => state.posts
    );
  
    useEffect(() => {
      fetchAdminPosts(dispatch).catch(console.error);
    }, [dispatch]);
  
    if (error) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-red-200">
              <CardContent className="pt-6">
                <p className="text-red-600">Error: {error}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>
  
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts">Manage Posts</TabsTrigger>
              <TabsTrigger value="create">Create Post</TabsTrigger>
            </TabsList>
  
            <TabsContent value="posts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Admin Posts ({posts?.length ?? 0})</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {!posts ? (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">
                            No posts available at the moment.
                          </p>
                        </div>
                      ) : (
                        <AdminPostsList />
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
  
            <TabsContent value="create" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <CreatePost />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
}

export default Admin