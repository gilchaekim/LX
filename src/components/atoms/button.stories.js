import { previewTemplate, DEFAULT_VANILLA_CODESANDBOX } from "storybook-addon-preview";
import { renderer } from 'storypug'
import button from './button.pug'


const { html, inject, render, wrap } = renderer();

export default {
  title: 'Atomic/button',
}

// default
const option1 = {
  label:'버튼',
  href:"dddd",
  size:'medium',
  isIcon:false,
  linkBtn:false,
}


export const Default = () => html(button, option1);
Default.parameters = {
  preview: [
    {
      tab: "pug",
      language: "jsx",
      copy: true,
      template: previewTemplate`
include ../components/atoms/index

+button({
  label:'${option1.label}',
  size:'${option1.size}'  /* small, medium, large */
})
      `
    },
  ],
};

// link type
const option2 = {
  label:'버튼',
  size:'medium',
  isIcon:false,
  linkBtn:true,
}
export const linkType = () => html(button, option2);
linkType.parameters = {
  preview: [
      {
          tab: "pug",
          language: "jsx",
          copy: true,

          
          template: previewTemplate`
include ../components/atoms/index

+button({
  label:'${option1.label}',
  size:'${option1.size}'  /* small, medium, large */
  linkBtn:${option1.linkBtn},
})
          `
      },
  ],
};