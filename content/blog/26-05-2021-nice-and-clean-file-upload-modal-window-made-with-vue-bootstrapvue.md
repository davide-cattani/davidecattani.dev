---
title: Nice and clean file upload modal window made with vue + bootstrapvue
date: 2021-05-25T17:04:00.000Z
description: A simple file upload modal window i built using Vue.js and
  bootstrapvue for styling. Features multiple file upload and file rename
  functionalities.
---
#### Straight to the full code!

The code is fairly simple and commented, no need for how to guide.

The modal consists of a drag&drop area where the user can drop files or click to choose from computer and a list of the files selected.
The files are saved in an array together with a custom filename property the user can edit in order to rename the selected files before uploading them.
Every time new files are dropped/selected, the previously added files are not lost. This way the user can add files separately.

```html
<template>
  <!--v-model: to show/hide the modal-->
  <!--size: when one or more files are selected (filelist.length) expand the modal horizontally-->
  <b-modal
      v-model="showModal"
      id="add-attachments-modal"
      centered
      hide-footer
      title="File(s) Upload"
      :size="filelist.length ? 'lg' : ''">
    <b-form @submit="onSubmit">
      <b-row class="mt-2 px-3">

        <!--the file list column has different width based on boreakpoint-->
        <!--and is shown only if one or more files are selected-->
        <b-col sm="12" xl="8" v-if="this.filelist.length" v-cloak>

          <!--show a list of the selected files, with an input to (optionally) rename the file before upload-->
          <b-list-group>
            <b-list-group-item class="d-inline-flex p-2" v-for="(file, i) in filelist" :key="i">

              <!--file name input to rename the file before upload-->
              <b-form-input
                  placeholder="File name..."
                  v-model="filelist[i].fileName"
                  required
              />

              <!--file extension-->
              <span class="d-inline-flex align-items-center text-muted ml-1 mr-3">.{{ filelist[i].extension }}</span>

              <!--remove file from list (and from upload)-->
              <b-button variant="outline-danger" size="sm" @click="remove(filelist.indexOf(file))">
                <b-icon-trash></b-icon-trash>
              </b-button>

            </b-list-group-item>
          </b-list-group>

        </b-col>

        <!--this column contains the file drop area-->
        <!--its width is automatically set based on existance of the file list column and breakpoint-->
        <b-col class="file-drop-column my-4 my-xl-0 p-0">
          <div class="file-drop-area bg-light" @dragover="dragover" @drop="drop">

            <!--we need an actual file input in order to have the drag&drop functionality-->
            <!--and the File object(s) containing the files dropped-->
            <!--We keep it invisible because we want to display something different than a file input-->
            <input type="file" multiple name="file-input" id="file-input"
                   class="file-input invisible" @change="onChange"/>

            <!--clicking on this label will trigger the clicked event on the file input-->
            <!--this will cause the 'choose file' system dialog-->
            <label for="file-input" class="w-100 text-center cursor-pointer text-muted m-0 px-3 py-5">
              <p>
                <b-icon-cloud-upload-fill font-scale="3"></b-icon-cloud-upload-fill>
              </p>
              <div>
                <p class=mb-0>Drop your file(s) here</p>
                <p class=mb-0>or <span class=text-info>choose from computer</span></p>
              </div>
            </label>
          </div>
        </b-col>
      </b-row>

      <!--this div contains the two action buttons cancel and upload-->
      <!--It is totally possible to use the bootstrapvue footer buttons instead-->
      <div class="float-right mt-4">
        <b-button variant="secondary" @click="$bvModal.hide('add-attachments-modal')" class="mr-3">
          Cancel
        </b-button>
        <b-button type="submit" variant="success">
          Upload file(s)
        </b-button>
      </div>
    </b-form>
  </b-modal>

</template>

<script>
export default {
  name: "FileUpload",
  data() {
    return {
      showModal: true,
      filelist: [],     //we use a custom array to store the files because we want the user to rename the file before upload
    }
  },
  methods: {
    /*triggered when form is submitted (upload button clicked)*/
    onSubmit() {
      event.preventDefault();
      console.log('Perfect! Now implement some way to upload these files: ');
      console.log(this.filelist);
    },
    /*Every time a new file is selected (both by dropping or choosing from computer)
    * we push them inside our array. This way we keep the previously uploaded files
    * inside. A user can drop a file, then drop another one without losing the first one*/
    onChange(event) {
      const fileArray = [...event.target.files];  //put the files in a temporary array
      fileArray.forEach((file) => {
        const fileName = file.name.replace(/\.[^/.]+$/, "");  //extract filename (no extension) from the file full name
        const extension = file.name.split('.').pop();         //extract extensionfrom the file fullname
        this.filelist.push({fileName, extension, file});      //store selected files and additional data in our array
      })
    },
    /*Remove the file from the list. It will not be uploaded*/
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
    },
    drop(event) {
      event.preventDefault();
      this.onChange();
    }
  }
}
</script>

<style lang="scss">
div#add-attachments-modal {
  div.modal-dialog {
    transition: max-width 0.3s ease-out, transform 0.3s ease-out;
  }
  .col.file-drop-column {
    flex-shrink: 1;
  }
  div.file-drop-area {
    border: 2px dashed rgba(0, 0, 0, 0.25);
    input.file-input {
      position: absolute;
      height: 0;
    }
  }
}
</style>
```

Here is a quick video demonstrating functionality:
<div style="padding:50.51% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/554704744?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;" title="vue-file-upload"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
