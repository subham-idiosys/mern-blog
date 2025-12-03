"use client";

import type React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { createAdminPost } from "@/services/api";
import type { AppDispatch, RootState } from "@/store";

export default function CreatePost() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.posts);
  const [form, setForm] = useState({ title: "", body: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.title.trim() && form.body.trim()) {
      try {
        await createAdminPost({ title: form.title, body: form.body }, dispatch);
        setForm({ title: "", body: "" });
      } catch (error) {
        console.error("Failed to create post:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Content</Label>
        <Textarea
          id="body"
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          placeholder="Enter post content"
          rows={6}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={loading || !form.title.trim() || !form.body.trim()}
        className="cursor-pointer"
        variant={"outline"}
      >
        <Plus className="mr-2 h-4 w-4" />
        {loading ? "Creating..." : "Create Post"}
      </Button>
    </form>
  );
}
