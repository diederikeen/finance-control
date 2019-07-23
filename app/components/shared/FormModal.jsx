// import React, { useState } from 'react';
// import Styled from 'styled-components';
// import { rgba } from 'polished';
// import axios from 'axios';

// const Modal = Styled.section`
//   position: fixed;
//   z-index: 9;
//   width: 90%;
//   left: 50%;
//   top: 50%;
//   transform: ${props => (props.visible ? 'translate(-50%, -40%)' : 'translate(-50%, -35%)')};
//   max-width: 640px;
//   opacity: ${props => (props.visible ? '1' : '0')};
//   background-color: white;
//   border-radius: 6px;
//   padding: 32px;
//   box-shadow: 0 16px 40px ${rgba(0, 0, 0, 0.16)};
//   transition: all 250ms ease;
//   pointer-events: ${props => (props.visible ? 'auto' : 'none')};

//   h3 {
//     margin: 0 0 18px;
//   }

//   input,
//   select {
//     height: 45px;
//     border: 1px solid #e8e8e8;
//     border-radius: 3px;
//     display: block;
//     margin: 0 0 8px;
//     padding: 0 12px;
//     width: 100%;
//   }

//   button {
//     font-size: 18px;
//     font-family: 'Rubik';
//     height: 46px;
//     border: none;
//     background-color: #005eff;
//     color: white;
//     border-radius: 50px;
//     box-shadow: 0 1px 4px ${rgba(0, 0, 0, 0.2)};
//     display: inline-block;
//     padding: 0 40px;
//     margin: 18px 0 0;
//   }
// `;


// async function handleSubmit(event, action, cb) {
//   event.preventDefault();
//   const { target } = event;
//   const fields = target.querySelectorAll('[name]');
//   const data = {};

//   fields.forEach((field) => {
//     const { name, value } = field;
//     data[name] = value;
//   });

//   axios.post(action, data)
//     .then(() => {
//       cb(false);
//     })
//     .catch(error => console.error(error));
// }

// function renderFormField({ type, placeholder, name, options, defaultValue }) {
//   if (type === 'select') {
//     return (
//       <select
//         name={name}
//         key={name}
//         defaultValue={options[0].id}
//       >
//         {options.map(option => (
//             <option
//               key={option.id}
//               value={option.id}
//             >
//             {option.label}
//           </option>
//         ))}
//       </select>
//     );
//   }

//   if (type !== 'select') {
//     return (
//       <input
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         key={name}
//         defaultValue={defaultValue || ''}
//       />
//     );
//   }
// }

// const FormModal = ({data, visible}) => {
//   const [isModalVisible, setIsModalVisible] = useState(visible);

//   return (
//     <Modal visible={isModalVisible}>
//       <h3>{data.label}</h3>
//       <form onSubmit={event => handleSubmit(event, data.action, setIsModalVisible)}>
//         {data.inputs.map(input => (
//           renderFormField(input)
//         ))}
//         <button type="submit">Submit</button>
//       </form>
//     </Modal>
//   );
// };

// export default FormModal;
