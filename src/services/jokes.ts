import { supabase } from '../lib/supabase';
import type { Joke, JokeVersion } from '../types/jokes';

export async function getJokes() {
  const { data: jokes, error } = await supabase
    .from('jokes')
    .select(`
      *,
      joke_versions(*)
    `)
    .eq('is_deleted', false)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return jokes as (Joke & { joke_versions: JokeVersion[] })[];
}

export async function getJoke(id: number) {
  const { data: joke, error } = await supabase
    .from('jokes')
    .select(`
      *,
      joke_versions(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return joke as Joke & { joke_versions: JokeVersion[] };
}

export async function createJoke(text: string) {
  const { data: joke, error: jokeError } = await supabase
    .from('jokes')
    .insert([
      { 
        original: text,
        status: 'active',
        is_deleted: false 
      }
    ])
    .select()
    .single();

  if (jokeError) throw jokeError;

  const { error: versionError } = await supabase
    .from('joke_versions')
    .insert([
      {
        joke_id: joke.id,
        text,
        type: 'original',
        timestamp: new Date().toISOString()
      }
    ]);

  if (versionError) throw versionError;

  return joke;
}

export async function createJokeVersion(jokeId: number, text: string) {
  const { error } = await supabase
    .from('joke_versions')
    .insert([
      {
        joke_id: jokeId,
        text,
        type: 'variation',
        timestamp: new Date().toISOString()
      }
    ]);

  if (error) throw error;
}

export async function updateJokeRating(jokeId: number, rating: number) {
  const { error } = await supabase
    .from('jokes')
    .update({ rating })
    .eq('id', jokeId);

  if (error) throw error;
}

export async function deleteJoke(jokeId: number) {
  const { error } = await supabase
    .from('jokes')
    .update({ is_deleted: true })
    .eq('id', jokeId);

  if (error) throw error;
} 