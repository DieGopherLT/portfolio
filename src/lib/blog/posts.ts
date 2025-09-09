import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface PostMetadata {
  id: string;
  slug: {
    en: string;
    es: string;
  };
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  readingTime: {
    en: number;
    es: number;
  };
}

export interface BlogPost {
  metadata: PostMetadata;
  content: string;
  locale: 'en' | 'es';
}

const BLOG_PATH = path.join(process.cwd(), 'content/blog');

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    if (!fs.existsSync(BLOG_PATH)) {
      return [];
    }

    const postDirs = fs.readdirSync(BLOG_PATH, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const posts: PostMetadata[] = [];

    for (const dir of postDirs) {
      const metadataPath = path.join(BLOG_PATH, dir, 'metadata.json');
      
      if (fs.existsSync(metadataPath)) {
        const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
        const metadata: PostMetadata = JSON.parse(metadataContent);
        
        // Calculate reading times if not present
        if (!metadata.readingTime) {
          const enPath = path.join(BLOG_PATH, dir, 'en.mdx');
          const esPath = path.join(BLOG_PATH, dir, 'es.mdx');
          
          metadata.readingTime = {
            en: fs.existsSync(enPath) ? readingTime(fs.readFileSync(enPath, 'utf-8')).minutes : 0,
            es: fs.existsSync(esPath) ? readingTime(fs.readFileSync(esPath, 'utf-8')).minutes : 0
          };
        }
        
        posts.push(metadata);
      }
    }

    // Sort by publishedAt date (newest first)
    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string, locale: 'en' | 'es'): Promise<BlogPost | null> {
  try {
    const posts = await getAllPosts();
    const postMeta = posts.find(post => post.slug[locale] === slug);
    
    if (!postMeta) {
      return null;
    }

    const filePath = path.join(BLOG_PATH, postMeta.id, `${locale}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { content } = matter(fileContent);

    return {
      metadata: postMeta,
      content,
      locale
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
}

export async function getRecentPosts(limit: number = 5): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
}

export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tagSet = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function formatDate(dateString: string, locale: 'en' | 'es'): string {
  const date = new Date(dateString);
  
  if (locale === 'es') {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
}