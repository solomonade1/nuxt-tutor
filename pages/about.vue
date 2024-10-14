<template>
  <div
    class="h-full w-full overflow-y-scroll dark:bg-circoDark lg:h-[calc(100vh-85px)]"
  >
    <div class="flex flex-col px-10 md:flex-row">
      <!-- Scroll Menu Component -->
      <div class="md:flex-[1]">
      Heleelel
      </div>

      <!-- Scroll Sections Component with Custom Content -->
      <div class="md:flex-[3]">
        <AboutScrollSection @sectionInView="setActiveSection">
          <div
            v-for="section in data"
            :key="section._id"
            :id="section._id"
            data-section
            class="my-5"
          >
            <h2 class="mb-4 text-2xl">{{ section.title }}</h2>
            <p>
              {{ section.description }}
            </p>

            <SanityContent
              :blocks="section.content"
              :serializers="serializers"
            />
            <!-- Custom content for each section -->
            <!-- <component :is="section.component" /> -->
          </div>
        </AboutScrollSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";


interface MenuItem {
  id: string;
  title: string;
  content: string;
}

const menuItems = reactive([
  { id: "section-1", title: "Introduction" },
  { id: "section-2", title: "Main Content" },
  { id: "section-3", title: "Conclusion" },
]);

const sections = reactive([
  {
    id: "section-1",
    title: "Introduction",
    content:
      "Etiam feugiat, tortor id feugiat venenatis, nisi augue eleifend ligula, sed hendrerit nisl metus sodales sapien. Etiam tempus elit urna, ac semper dolor tincidunt a. Aenean ligula diam, pharetra vitae vulputate dictum, mollis vitae metus. Nullam pellentesque vulputate mi, accumsan tristique felis posuere sed. Nam commodo finibus dui, quis iaculis eros aliquam id. Curabitur molestie molestie facilisis. Cras quis gravida quam, eu ullamcorper nibh. Proin sit amet mi tortor",
  },
  {
    id: "section-2",
    title: "Main Content",
    content:
      "Aenean dictum, felis ut viverra rhoncus, sapien turpis sodales tellus, in consectetur quam purus at purus. Ut consectetur orci quis dolor convallis commodo. Duis volutpat dolor ac lorem venenatis commodo. Donec non turpis tempus, auctor leo in, commodo leo. Quisque tortor ligula, aliquam ut vulputate vitae, pharetra nec ex. Aliquam vitae libero a ipsum sodales vehicula et tristique libero. Proin quis libero eu nisi egestas ultrices in et ex. Pellentesque facilisis lacus ",
  },
  {
    id: "section-3",
    title: "Conclusion",
    content:
      "Aenean dictum, felis ut viverra rhoncus, sapien turpis sodales tellus, in consectetur quam purus at purus. Ut consectetur orci quis dolor convallis commodo. Duis volutpat dolor ac lorem venenatis commodo. Donec non turpis tempus, auctor leo in, commodo leo. Quisque tortor ligula, aliquam ut vulputate vitae, pharetra nec ex. Aliquam vitae libero a ipsum sodales vehicula et tristique libero. Proin quis libero eu nisi egestas ultrices in et ex. Pellentesque facilisis lacus ",
  },
]);

const activeSection = ref<string | null>(null);


const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  activeSection.value = id;
};

const setActiveSection = (id: string) => {
  activeSection.value = id; // Set the active section based on which section is in view
};

const listComponents = {
  bullet: (props: any) => h('ul', { class: 'mt-xl' }, props.slots.default?.()),
  number: (props: any) => h('ol', { class: 'mt-lg' }, props.slots.default?.()),
  checkmarks: (props: any) =>
    h('ol', { class: 'm-auto text-lg' }, props.slots.default?.()),
};

const listItemComponents = {
  bullet: (props: any) => {
    console.log('Rendering list item: =======>>>', props?.children);
    return h(
      'li',
      { style: { listStyleType: 'disclosure-closed' } },
      props?.children
    );
  },
  checkmarks: (props: any) => {
    console.log('Rendering checkmarks:', props?.children);
    return h('li', ['✅', props?.children]);
  },
};

const serializers = {
  types: {
    list: listComponents,
    listItem: listItemComponents,
  },
  marks: {
    internalLink: 'a',
  },
};

const query = groq`*[_type == "termsAndConditions"]`;

// By default it returns a `Promise<unknown>`,
// but you can customise the type of the return.
const { data, status } = await useSanityQuery<any>(query);

onMounted(() => {
  console.log("This is first Data ====>", data.value);
  console.log("This is first STATUS Data ====>", status.value);
});
</script>

<style scoped>
.rich-text ul {
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
  border: 4px solid red;
}
</style>
