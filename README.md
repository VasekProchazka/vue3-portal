# vue3-portal

Inspired by [portal-vue](https://github.com/LinusBorg/portal-vue)

Not compatible with Vue 2

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

#### **Using NPM**

```sh
npm install vue3-portal
```

## Usage

### 1.) Add plugin to Vue

You can define your custom breakpoints:

```js
import { createApp } from 'vue';
import Portal from 'vue3-portal';

const app = createApp({});

app.use(Portal);

app.mount('#app');
```

### 2.) Usage


```html
<portal to="des">
  <!-- Use whatever you want to teleport inside portal-target -->
</portal>

<portal-target name="des" />
```
