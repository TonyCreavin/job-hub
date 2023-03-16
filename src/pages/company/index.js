import React from 'react';

export default function SignUp() {
  const [formState, setFormState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    country: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const response = await fetch('/api/consultant/createConsultant', {
      method: 'POST',
      body: JSON.stringify(formState),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      SignUp
      <input
        type="text"
        value={formState.firstName}
        onChange={handleChange}
        placeholder="firstName"
        name="firstName"
      />
      <input
        type="text"
        value={formState.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        name="lastName"
      />
      <input
        type="text"
        value={formState.email}
        onChange={handleChange}
        placeholder="Email"
        name="email"
      />
      <input
        type="text"
        value={formState.city}
        onChange={handleChange}
        placeholder="city"
        name="city"
      />
      <input
        type="text"
        value={formState.country}
        onChange={handleChange}
        placeholder="country"
        name="country"
      />
      <input
        type="text"
        value={formState.password}
        onChange={handleChange}
        placeholder="password"
        name="password"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
// export async function getServerSideProps() {
//   const consultants = await prisma.consultant.findMany({
//     orderBy: {
//       createdAt: 'desc',
//     },
//   });
//   return {
//     props: {
//       consultants: JSON.parse(JSON.stringify(consultants)),
//     },
//   };
// }
