import { previewTemplate, DEFAULT_VANILLA_CODESANDBOX } from "storybook-addon-preview";
import { renderer } from 'storypug'
import pugComponent from './input.pug'


const { html } = renderer();

export default {
  title: 'Atomic/input',
}

// default
const option1 = {
}
export const Default = () => html(pugComponent, option1);
Default.parameters = {
  preview: [
    {
      tab: "pug",
      language: "jsx",
      copy: true,      
      template: previewTemplate`
include ../components/atoms/index

+input()
      `
    },
  ],
};
