<template>
  <main class="container mx-auto min-h-screen max-w-3xl p-8">
    <h1 class="text-4xl font-bold mb-8">Posts</h1>
    <ul class="flex flex-col gap-y-4">
      <!-- <li v-for="post in posts" :key="post._id" class="hover:underline">
        <nuxt-link :to="`/${post.slug.current}`">
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p>{{ new Date(post.publishedAt).toLocaleDateString() }}</p>
        </nuxt-link>
      </li> -->
    </ul>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa quae ipsum
      eligendi libero illum? Et, ipsum! Saepe adipisci illo harum nisi
      perferendis nesciunt facilis odit veritatis atque, ex molestiae quos.
    </p>
  </main>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

// const POSTS_QUERY = groq`*[
//   _type == "post"
//   && defined(slug.current)
// ]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

// const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);

const query = groq`*[_type == "termsAndConditions"]`;

const sanity = useSanity();

// By default it returns a `Promise<unknown>`,
// but you can customise the type of the return.
// const { data } = await useAsyncData("privacyPolicy", () =>
//   sanity.fetch<{ privacyPolicy: any }>(query)
// );

// const query = groq`*[ _type == "post" && defined(slug.current) ] | order(_createdAt desc)`;
const { data, status, error } = await useSanityQuery<any>(query);

onMounted(() => {
  console.log("This is first Data ====>", data.value);
});
</script>

<style scoped>

li {
  margin-top: 30px;
}
</style>
