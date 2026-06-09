import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'loclhcox',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_API_READ_TOKEN,
});

export function urlFor(source: any) {
  return `https://cdn.sanity.io/images/${import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'loclhcox'}/production/${source?.asset?._ref?.replace('image-', '')?.replace('-jpg', '.jpg')?.replace('-png', '.png')?.replace('-webp', '.webp')}`;
}

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getAllPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      coverImage,
      "categories": categories[]->{title, slug},
      "author": author->{name}
    }
  `);
}

export async function getPostBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      coverImage,
      body,
      seoTitle,
      seoDescription,
      "categories": categories[]->{title, slug},
      "author": author->{name, image, bio}
    }
  `, { slug });
}

export async function getPostsByCategory(categorySlug: string) {
  return sanityClient.fetch(`
    *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      coverImage,
      "categories": categories[]->{title, slug},
      "author": author->{name}
    }
  `, { categorySlug });
}
