<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import IconMore from './icons/IconMore.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>
    The official documentation for
    <a target="_blank" href="https://electronjs.org/">Electron</a>,
    <a target="_blank" href="https://cn.vitejs.dev/">Vite</a>,
    <a target="_blank" href="https://staging-cn.vuejs.org/">Vue 3</a> gives you all the information you need to get
    started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite</a>, using
    <a href="https://github.com/electron-userland/electron-builder" target="_black">electron-builder</a>
    to build desktop applications. The recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <IconMore />
    </template>
    <template #heading>More</template>

    If you need more resources, we recommend paying for access to
    <a target="_blank" href="https://github.com/vitejs/awesome-vite">Awesome Vite</a> or
    <a target="_blank" href="https://github.com/vuejs/awesome-vue">Awesome Vue</a>
    .
    <br />
    More instructions are available in <code>README.md</code>.
  </WelcomeItem>
</template>
