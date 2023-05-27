import { MutableRefObject, useRef, useState } from 'react'
import './App.css'
import Form from './components/Form'
import FormBuilder from './components/FormBuilder'
import { FormPageData, FormType } from './types/FormField'

function App() {

  const formData: MutableRefObject<FormPageData[]> = useRef(
    [
      {
        title: "Welcome! To start, tell us your first name.",
        fields: [
          {
            name: 'firstName',
            label: 'First Name',
            required: true,
            type: FormType.text
          },
        ],
      },
      {
        title: "Awesome! Now, your last name, or family name.",
        fields: [
          {
            name: 'lastName',
            label: 'Last Name',
            required: true,
            type: FormType.text

          },
        ]
      },
      {
        title: "Great. Please tell us your age.",
        fields: [
          {
            name: 'age',
            label: 'Age',
            required: true,
            type: FormType.number
          },
        ]
      }
    ]
  )

  const finishFormBuilder = function (data) {
    if (data !== false)
      formData.current = data;
    setDataLoaded(true);
  };

  const [dataLoaded, setDataLoaded] = useState(false);

  return (
    <div className="App w-full h-full">
      {/* <div className="w-full h-full flex flex-col items-center justify-around"> */}
      {/* <div className="min-h-[24rem] min-w-[32rem]"> */}
      <div className="w-full h-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 desktop-xl:grid-cols-3 h-full">
          <div className="bg-green-400 hidden xl:block desktop-xl:col-span-1 z-[1000]">
            {/* <img src="palm.jpg" className="opacity-50"></img> */}
          </div>
          <div className="desktop-xl:col-span-2">
            {dataLoaded ?
              <Form forms={formData.current} onSubmit={console.log}></Form> :
              <FormBuilder onFinish={finishFormBuilder}></FormBuilder>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
