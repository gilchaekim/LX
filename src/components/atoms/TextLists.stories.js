import { previewTemplate, DEFAULT_VANILLA_CODESANDBOX } from "storybook-addon-preview";
import { renderer } from 'storypug'
import textLists from './textLists.pug'


const { html } = renderer();

export default {
  title: 'Atomic/textLists',
}

// default
const option1 =   {
  type:'dot',
  lists:[
    {
      className:'custom1',
      text:"가나다라마바사아자차카타파하"
    },
    {
      className:'custom1',
      text:"가나다라마바사아자차카타파하",
      subLists:{
        type:'dot',
        lists:[
          {
            className:'custom11',
            text:"가나다라마바사아자차카타파하-sub"
          },
          {
            className:'custom11',
            text:"가나다라마바사아자차카타파하-sub",
          },
          {
            className:'custom22',
            text:"가나다라마바사아자차카타파하-sub"
          },
        ]
      }
    },
    {
      className:'custom2',
      text:"가나다라마바사아자차카타파하",
      subLists:{
        type:'dot',
        lists:[
          {
            className:'custom11',
            text:"가나다라마바사아자차카타파하-sub"
          },
          {
            className:'custom11',
            text:"가나다라마바사아자차카타파하-sub",
            subLists:{
              type:'dot',
              lists:[
                {
                  className:'custom11',
                  text:"가나다라마바사아자차카타파하-sub"
                },
                {
                  className:'custom11',
                  text:"가나다라마바사아자차카타파하-sub",
                },
                {
                  className:'custom22',
                  text:"가나다라마바사아자차카타파하-sub"
                },
              ]
            }
          },
          {
            className:'custom22',
            text:"가나다라마바사아자차카타파하-sub"
          },
        ]
      }
    }
  ]
}
export const Default = () => html(textLists, option1);
Default.parameters = {
  preview: [
      {
          tab: "pug",
          language: "jsx",
          copy: true,

          
          template: previewTemplate`
include ../components/atoms/index

+textLists()
          `
      },
  ],
};
