import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Registro = () => {
  const [formData, setFormData] = useState({});
  const { register, authError } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) alert('Registro exitoso 🚀');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
      <input name="usuario" placeholder="Usuario" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
      <input name="ciudad" placeholder="Ciudad" onChange={handleChange} required />
      <input name="region" placeholder="Región" onChange={handleChange} required />
      <button type="submit">Registrarme</button>
      {authError && <p>{authError}</p>}
    </form>
  );
};

export default Registro;
