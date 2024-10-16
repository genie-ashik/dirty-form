import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from 'react-router-dom';
import Prompt from './Prompt';

const DirtyFormExample = () => {
  const [isDirty, setIsDirty] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Track form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setIsDirty(true); // Mark the form as dirty when changes are detected
  };

  // Simulate form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDirty(false); // Reset the dirty state after submission
    alert('Form submitted!');
  };

  return (
    <>
      <Link to="/">Home</Link> | <Link to="/form">Form</Link> | <Link to="/about">About</Link>

      <Prompt when={isDirty}
        message="Unsaved changes detected, continue?"
        beforeUnload={true}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><h2>Home Page</h2><Link to="/form">Go to Form</Link></div>,
  },
  {
    path: "/form",
    element: <DirtyFormExample />,
  },
  {
    path: "/about",
    element: <div><h2>About Page</h2><Link to="/form">Go to Form</Link></div>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
