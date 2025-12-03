"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit, Save, X } from "lucide-react";
import type { AdminPost } from "@/lib/types";
import { deleteAdminPost, updateAdminPost } from "@/services/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { AppDispatch, RootState } from "@/store";

export default function AdminPostsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading } = useSelector((state: RootState) => state.posts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", body: "" });

  const handleEdit = (post: AdminPost) => {
    setEditingId(post._id);
    setEditForm({ title: post.title, body: post.body });
  };

  const handleSave = async () => {
    if (editingId && editForm.title.trim() && editForm.body.trim()) {
      try {
        await updateAdminPost(
          editingId,
          {
            title: editForm.title,
            body: editForm.body,
          },
          dispatch
        );
        setEditingId(null);
        setEditForm({ title: "", body: "" });
      } catch (error) {
        console.error("Failed to update post:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ title: "", body: "" });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAdminPost(id, dispatch);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (posts?.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No admin posts yet. Create your first post!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts?.map((post) => (
        <Card key={post._id}>
          <CardHeader>
            {editingId === post._id ? (
              <Input
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                placeholder="Post title"
                className="text-lg font-semibold"
              />
            ) : (
              <CardTitle>{post.title}</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            {editingId === post._id ? (
              <div className="space-y-4">
                <Textarea
                  value={editForm.body}
                  onChange={(e) =>
                    setEditForm({ ...editForm, body: e.target.value })
                  }
                  placeholder="Post content"
                  rows={4}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    size="sm"
                    disabled={loading}
                    className="cursor-pointer text-white/70 hover:text-white delay-105  transition-all"
                    variant="ghost"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="destructive"
                    size="sm"
                    // className="bg-white text-black cursor-pointer dark:text-white dark:opacity-85 dark:hover:opacity-100"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">{post.body}</p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(post)}
                    variant="outline"
                    size="sm"
                    className="text-white/70 hover:text-white delay-105  transition-all"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer"
                        disabled={loading}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your post and remove post data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(post._id)}
                          className="cursor-pointer"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
