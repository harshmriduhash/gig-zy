import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
}

export function useMediaLibrary() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadMedia = async (file: File): Promise<MediaFile> => {
    setIsUploading(true);
    setError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // Create media record
      const { data: mediaRecord, error: recordError } = await supabase
        .from('media_files')
        .insert({
          name: file.name,
          url: publicUrl,
          type: file.type,
          size: file.size
        })
        .select()
        .single();

      if (recordError) throw recordError;

      return mediaRecord;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to upload media');
      setError(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMedia = async (id: string) => {
    try {
      setError(null);

      // Get file path from media record
      const { data: mediaFile, error: fetchError } = await supabase
        .from('media_files')
        .select('url')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Extract file path from URL
      const filePath = mediaFile.url.split('/').pop();

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete record
      const { error: deleteError } = await supabase
        .from('media_files')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete media');
      setError(error);
      throw error;
    }
  };

  return {
    uploadMedia,
    deleteMedia,
    isUploading,
    error
  };
}