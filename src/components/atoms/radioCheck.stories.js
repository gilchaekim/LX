import { previewTemplate, DEFAULT_VANILLA_CODESANDBOX } from "storybook-addon-preview";
import { renderer } from 'storypug'
import pugComponent from './radioCheck.pug'


const { html } = renderer();

export default {
  title: 'Atomic/radio-checkbox',
}

// default
const option1 = {
  type:"checkbox",
  lists: [
    {
      label:'체크박스'
    }
  ]
}

export const Checkbox = () => html(pugComponent, option1);
Checkbox.parameters = {
  preview: [
    {
      tab: "pug",
      language: "jsx",
      copy: true,

      
      template: previewTemplate`
include ../components/atoms/index

+radioCheck()
      `
    },
  ],
};

// Radio
const option2 = {
  type:"radio",
  lists:[
    {
      label:'라디오버튼'
    },
    {
      label:'라디오버튼'
    }
  ]
}
export const Radio = () => html(pugComponent, option2);
Radio.parameters = {
  preview: [
      {
          tab: "pug",
          language: "jsx",
          copy: true,

          
          template: previewTemplate`
include ../components/atoms/index

+radioCheck()
          `
      },
  ],
};