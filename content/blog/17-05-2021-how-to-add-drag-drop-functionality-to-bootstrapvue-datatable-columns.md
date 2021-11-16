---
title: How to add drag&drop functionality to BootstrapVue DataTable columns
date: 2021-05-17T16:54:00.000Z
description: "Here is a quick guide of how to add a drag&drop functionality to
  the columns\r of a vue.js bootstrapvue data table (<b-table>). I couldn't find
  any working\r example on the internet, so here it goes."
---
For the company web application i'm currently working on, we were asked to implement a drag&drop functionality on the columns of a data table, so that the final user can rearrange the column order (we're taling about 15/16 columns, so a pretty large table).

I've found several working examples, but none of them was using the bootstrapvue's complete data-table but only custom implementations of the simple data table.

Let's start right now. Set up a new bootstrapvue project: you can find instructions on how to do that directly on their docs.

Once we've done that, let's quickly remove everything from the HelloWorld.vue file that was auto-generated when starting the new project.

```javascript
<template>
</template>
<script>
export default {
}
</script>
```
Ok, now let's copy/paste the b-table example from bootstrapvue docs inside our template, and while we're at it, let's also add fields data, we'll need it later:
```javascript
<template>
  <div>
    <b-table striped hover :fields="fields" :items="items"></b-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fields: [
            'age', 'first_name', 'last_name'
        ],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>
```
We should now see something similar to this (remember to run `npm run serve` to launch the hot preview script and run the development in localhost:8080)
![image](https://user-images.githubusercontent.com/82278259/118468352-f5694080-b704-11eb-8733-71dbdfb93fd8.png)

Ok, so now comes the hard part..
Basically what we want is to be able to drag the header of a certain column and drop it somewhere else in order to change the columns order.
BootstrapVue offers a template to easily customize the headers of the table but if we were to use this approach we'll lose some functionality we may need (example: sorting) and we would need to write a lot of code.

What i came up with is to add a table row above the headers, put a "grip" icon inside of it so it can be clear that it will be used to drag the column and change the css a bit in order to make it like it's the same cell as the header.

Let's proceed.

First, drag functionality is very easy to implement thanks to the awesome library vue-draggable ([github](https://github.com/SortableJS/Vue.Draggable)).

Install the package with

`npm i -S vuedraggable`

Import it inside our component:
```javascript
<script>
import draggable from "vuedraggable";
  export default {
    components: {
      draggable
    },
    data() {
      return {
        fields: [
            'age', 'first_name', 'last_name'
        ],
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>
```
Now since we want to add a row above the headers, we'll use the `thead-top` template for that, as provided by bootstrapvue. Add these lines inside of the <b-table> element:
```javascript
<!--draggable columns-->
  <template #thead-top="">
    <draggable tag="b-tr" v-model="fields">
      <b-th v-for="(field, i) in fields" :key="i" class="draggable text-center">
        <b-icon-grip-horizontal font-scale="1.5"/>
      </b-th>
    </draggable>
  </template>
```

At this point, we should have it already working. Try dragging & dropping the grip icons to the left and right!

![ezgif com-gif-maker](https://user-images.githubusercontent.com/82278259/118471650-4595d200-b708-11eb-92e3-7d5404b68675.gif)

You can now customize this component by yourself, or if you're interested let's see how to "fake" the header cells to be the same!

```javascript
<style>
.table td, th {
  border-width: 1px;
  border-style: solid;
  border-top: none;
  border-bottom-width: 0;
}
.table thead th:not(.draggable) {
  padding-top: 0;
  border-top-width: 0;
}
.table thead th.draggable {
  padding-bottom: 0;
  padding-top: 0;
  border-bottom-width: 0;
}
th svg {
  color: grey;
  cursor: ew-resize;
}
</style>
```

Now the table should look like this

![image](https://user-images.githubusercontent.com/82278259/118473090-e6d15800-b709-11eb-8c56-9e7cd9859ab4.png)

---

You can find the github repository here: [here](https://github.com/davide-cattani/bootstrapvue-table-draggable-columns)