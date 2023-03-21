import React from 'react';

export default function SignUp() {
  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    city: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const response = await fetch('/api/user', {
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
        value={formState.name}
        onChange={handleChange}
        placeholder="name"
        name="name"
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
