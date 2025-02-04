import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Register.css';

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    const errors = [];
    
    if (!nome.trim()) errors.push('nome');
    if (!email.trim()) errors.push('email');
    if (!senha.trim()) errors.push('senha');
    if (senha !== confirmSenha) errors.push('confirmação de senha');
    
    if (errors.length > 0) {
      toast.warning(`Por favor, preencha corretamente: ${errors.join(', ')}`);
      isValid = false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.warning('Digite um email válido');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome,
          email,
          password: senha,
          cellPhone: celular
        })
      });

      if (!response.ok) throw new Error('Erro no registro');
      
      toast.success('Registrado com sucesso!');
      navigate('/login');
    } catch (error) {
      toast.error(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          {/* Campos do formulário mantidos iguais */}
        </form>
      </div>
    </div>
  );
};

export default Register;